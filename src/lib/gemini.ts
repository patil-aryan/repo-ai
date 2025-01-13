import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
import { Document } from '@langchain/core/documents'
import { toast } from 'sonner';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


const model = genAI.getGenerativeModel(
    {
        model: 'gemini-1.5-flash'
    }
)

export const aiSummarizeCommit = async (diff: string) => {

    const response = await model.generateContent([
        `You are an expert programmer, and you are trying to summarize a git diff.
Reminders about the git diff format:
For every file, there are a few metadata lines, like (for example):
\`\`\`
diff --git a/lib/index.js b/lib/index.js
index aadf691..bfef603 100644
--- a/lib/index.js
+++ b/lib/index.js  
\`\`\`
This means that \`lib/index.js\` was modified in this commit. Note that this is only an example.
Then there is a specifier of the lines that were modified.
A line starting with \`+\` means it was added.
A line that starting with \`-\` means that line was deleted.
A line that starts with neither \`+\` nor \`-\` is code given for context and better understanding.
It is not part of the diff.
[...]
EXAMPLE SUMMARY COMMENTS:
\`\`\`
* Raised the amount of returned recordings from \`10\` to \`100\` [packages/server/recordings_api.ts], [packages/server/constants.ts]
* Fixed a typo in the github action name [.github/workflows/gpt-commit-summarizer.yml]
* Moved the \`octokit\` initialization to a separate file [src/octokit.ts], [src/index.ts]
* Added an OpenAI API for completions [packages/utils/apis/openai.ts]
* Lowered numeric tolerance for test files
\`\`\`
Most commits will have less comments than this examples list.
The last comment does not include the file names,
because there were more than two relevant files in the hypothetical commit.
Do not include parts of the example in your summary.
It is given only as an example of appropriate comments.`,
        `Please summarise the following diff file: \n\n${diff}`
    ])
    return response.response.text();

}

// console.log( await aiSummarizeCommit(`https://github.com/patil-aryan/fullstack-linkedin/commit/705d9629e07ad5f178e6850160a52d5406e64fa8.diff`))

export async function summariseCode(doc: Document) {
    console.log("Getting summary for the files", doc.metadata.source)
    try {
        const code = doc.pageContent.slice(0,10000)
    const response = await model.generateContent([
        `You are an expert and intelligent senior principal software engineer and programmer, 
        who is an expert in explaining any code to junior software engineers who are onboarding. You are 
        onboarding a junior software engineer and explaining them the purpose of the ${doc.metadata.source} file.

        Here is the code:
        ---
         ${code}
        ---
        
    Give a detailed and expert summary of the code in 200 words or less.`    
    ])

    return response.response.text();
    } catch (error) {
        toast.error("Error summarising code")
    }
    

}


// export async function generateEmbedding(summary: string): Promise<number[]> {
//     const model = genAI.getGenerativeModel({
//         model: 'text-embedding-004'
//     })
//     const response = await model.embedContent([
//         summary
//     ])

//     const embedding = response.embedding
//     return embedding
// }
export async function generateEmbedding(summary: string): Promise<number[]> {
    const model = genAI.getGenerativeModel({
        model: 'text-embedding-004'
    });

    const response = await model.embedContent([summary]);

    // Ensure the response contains the embedding
    if (!response.embedding) {
        throw new Error('Failed to generate embedding: No embedding found in response');
    }

    // Convert the embedding to a number array if necessary
    const embedding = response.embedding as unknown as number[];

    // Return the embedding array
    return embedding;
}

export const getEmbeddings = async (text: string) => {
    // For embeddings, use the Text Embeddings model
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    const result = await model.embedContent(text);
    const embedding = result.embedding;
    return embedding.values as number[];
}
