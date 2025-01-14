// import { checkCredits, loadGitHubRepo } from "./github-loader";

import { api } from "@/trpc/react";


// const githubUrl = "https://github.com/patil-aryan/IS_517_Student_Dropout_Predction";

// // Without token
// const fileCount = await checkCredits(githubUrl);
// console.log("File count:", fileCount);

// const docs = await loadGitHubRepo(githubUrl);
// console.log("Loaded documents:", docs);




// github-Loader.ts

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

// Client-side usage
try {
    const project = await api.project.createProject.mutate({
      name: "Project Name",
      githubUrl: "https://github.com/patil-aryan/IS_517_Student_Dropout_Predction",
      githubToken: "your-token-here" // Optional
    });
    console.log("Project created:", project);
  } catch (error) {
    console.error("Failed to create project:", error.message);
    // Show error message to user
  }