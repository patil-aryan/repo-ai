import { GithubRepoLoader } from '@langchain/community/document_loaders/web/github'
import { Document } from '@langchain/core/documents'
import { summariseCode,  generateEmbedding } from './gemini'
import { generate } from 'node_modules/@langchain/core/dist/utils/fast-json-patch'
import { db } from '@/server/db'

export const loadGitHubRepo = async (githubUrl: string, githubToken?: string) => {

    const loader = new GithubRepoLoader(githubUrl, {accessToken:githubToken || "",
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


export const indexGithubRepo = async (projectId:string, githubUrl: string, githubToken?: string) => {

    const docs = await loadGitHubRepo(githubUrl, githubToken)
    const allEmbeddings = await generateEmbeddings(docs)
    await Promise.all(allEmbeddings.map(async (embedding,index) => {
        if (!embedding) {
            return
        }

        const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({

            data: {
                summary: embedding.summary,
                sourceCode: embedding.sourceCode,
                fileName: embedding.fileName,
                projectId,
            }

        })

        await db.$executeRaw `
        UPDATE "SourceCodeEmbedding" 
        SET "summaryEmbedding" = ${embedding.embedding}::vector 
        WHERE "id" = ${sourceCodeEmbedding.id}
        `
        
    })

    
)}

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
