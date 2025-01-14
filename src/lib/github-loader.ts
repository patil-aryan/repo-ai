import { GithubRepoLoader } from '@langchain/community/document_loaders/web/github'
import { Document } from '@langchain/core/documents'
import { summariseCode,  generateEmbedding } from './gemini'
import { generate } from 'node_modules/@langchain/core/dist/utils/fast-json-patch'
import { db } from '@/server/db'
import { Octokit } from 'octokit'
import pLimit from 'p-limit'

// const getFileCount = async (path: string, ocktokit: Octokit, githubOwner: string, githubRepo: string, acc: number = 0) => {

//     const {data} = await ocktokit.rest.repos.getContent({
//         owner: githubOwner,
//         repo: githubRepo,
//         path
//     })
//     if (!Array.isArray(data) && data.type === 'file') {
//         return acc + 1
//     }

//     if (Array.isArray(data)) {
//         let fileCount = 0
//         const directories: string[] = []
//         for (const item of data) {
//             if (item.type === 'dir') {
//                 directories.push(item.path)
//             } else {
//                 fileCount++
                
//             }
//         }

//         if (directories.length > 0) {
            
//             const directoryCounts = await Promise.all(
//                 directories.map(directory => getFileCount(directory, ocktokit, githubOwner, githubRepo, 0)
            
//             ))
//             fileCount += directoryCounts.reduce((acc, count) => acc + count, 0)
//     }

//     return acc + fileCount
// }

const getFileCount = async (path: string, octokit: Octokit, githubOwner: string, githubRepo: string, acc: number = 0) => {
    const { data } = await octokit.rest.repos.getContent({
        owner: githubOwner,
        repo: githubRepo,
        path: path
    })

    if (!Array.isArray(data) && data.type === 'file') {
        return acc + 1
    }

    if (Array.isArray(data)) {
        let fileCount = 0
        const directories: string[] = []

        // Count files and collect directories in current level
        for (const item of data) {
            if (item.type === 'dir') {
                directories.push(item.path)
            } else {
                fileCount += 1
            }
        }

        // Process all directories at this level in parallel
        if (directories.length > 0) {
            const directoryCounts = await Promise.all(
                directories.map(dirPath =>
                    getFileCount(dirPath, octokit, githubOwner, githubRepo, 0)
                )
            )
            fileCount += directoryCounts.reduce((sum, count) => sum + count, 0)
        }

        return acc + fileCount
    }

    return acc
}

export const checkCredits = async (githubUrl: string, githubToken?: string) => {
    const octokit = new Octokit({
        auth: githubToken || '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',
    });
    const githubOwner = githubUrl.split('/')[3]
    const githubRepo = githubUrl.split('/')[4]
    if (!githubOwner || !githubRepo) return 0
    const fileCount = await getFileCount('', octokit, githubOwner, githubRepo, 0)
    return fileCount
}
export const loadGitHubRepo = async (githubUrl: string, githubToken?: string) => {

    const loader = new GithubRepoLoader(githubUrl, {accessToken:githubToken || "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",
        branch: 'main',
        ignoreFiles: ['package-lock.json', 'yarn.lock', 'pnpm-lock-yaml', 'bun.lockb'],
        recursive: true,
        unknown: 'warn',
        maxConcurrency: 5
    } )

    const docs = await loader.load()
    return docs
}

// console.log( await loadGitHubRepo('https://github.com/patil-aryan/fullstack-linkedin'))


// export const indexGithubRepo = async (projectId:string, githubUrl: string, githubToken?: string) => {

//     const docs = await loadGitHubRepo(githubUrl, githubToken)
//     const allEmbeddings = await generateEmbeddings(docs)
//     await Promise.all(allEmbeddings.map(async (embedding,index) => {
//         if (!embedding) {
//             return
//         }

//         const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({

//             data: {
//                 summary: embedding.summary,
//                 sourceCode: embedding.sourceCode,
//                 fileName: embedding.fileName,
//                 projectId,
//             }

//         })

//         // const embeddingVector = `{${embedding.embedding.join(',')}}`

//         await db.$executeRaw `
//         UPDATE "SourceCodeEmbedding" 
//         SET "summaryEmbedding" = ${embedding.embedding}::vector 
//         WHERE "id" = ${sourceCodeEmbedding.id}
//         `
        
//     })

    
// )}

export const loadGithubRepo = async (githubUrl: string, githubToken?: string) => {
    const loader = new GithubRepoLoader(
        githubUrl,
        {
            branch: "main",
            ignoreFiles: ['package-lock.json', 'bun.lockb'],
            recursive: true,
            // recursive: false,
            accessToken: githubToken || "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",
            unknown: "warn",
            maxConcurrency: 5, // Defaults to 2
        }
    );
    const docs = await loader.load();
    return docs
};

export const indexGithubRepo = async (projectId: string, githubUrl: string, githubToken?: string) => {
    const docs = await loadGithubRepo(githubUrl, githubToken);
    const allEmbeddings = await generateEmbeddings(docs)
    const limit = pLimit(10);
    await Promise.allSettled(
        allEmbeddings.map((embedding, index) =>
            limit(async () => {
                console.log(`processing ${index} of ${allEmbeddings.length}`);
                if (!embedding) throw new Error("embedding is null");

                // First, upsert the basic data
                const sourceCodeEmbedding = await db.sourceCodeEmbedding.upsert({
                    where: {
                        projectId_fileName: {
                            projectId,
                            fileName: embedding.fileName
                        }
                    },
                    update: {
                        summary: embedding.summary,
                        sourceCode: embedding.sourceCode,
                    },
                    create: {
                        summary: embedding.summary,
                        sourceCode: embedding.sourceCode,
                        fileName: embedding.fileName,
                        projectId,
                    }
                });

                // Then, update the summaryEmbedding using raw SQL
                await db.$executeRaw`
                UPDATE "SourceCodeEmbedding"
                SET "summaryEmbedding" = ${embedding.embeddings}::vector
                WHERE id = ${sourceCodeEmbedding.id}
            `;
            })
        )
    )
}


export const generateEmbeddings = async (docs: Document[]) => {
    return Promise.all(docs.map(async (doc: any) => {
        const summary = await summariseCode(doc)
        const embedding = await generateEmbedding(summary)
        return {
            summary,
            embedding,
            sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
            fileName: doc.metadata.source

        }
    }))
   }