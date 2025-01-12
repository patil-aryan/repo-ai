// import { db } from "@/server/db";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { get } from "http";
import { Octokit } from "octokit";
import axios from "axios";
import { aiSummarizeCommit } from "./gemini";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

console.log(process.env.GITHUB_TOKEN)

const githubUrl = "https://github.com/patil-aryan/fullstack-linkedin";

type Response = {
    commitHash: string;
    commitMessage: string;
    commitDate: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;


}

export const getCommitHashes = async (githubUrl: string) : Promise<Response[]> => {

    // https://github.com/patil-aryan/fullstack-linkedin/

    const [owner, repo] = githubUrl.split("/").slice(-2)

    if (!owner || !repo) {
        throw new Error('Invalid Github URL')
    }

    const {data} = await octokit.rest.repos.listCommits({
        owner,
        repo
    })

    const sortedCommits = data.sort((a: any, b: any) => new Date(b.commit.author.data).getTime() - new Date(a.commit.author.date).getTime()) as any[]

    return sortedCommits.slice(0,15).map((commit:any) => ({
        commitHash: commit.sha as string,
        commitMessage: commit.commit.message ?? "",
        commitDate: commit.commit?.author.date ?? "",
        commitAuthorName: commit.commit?.author?.name ?? "",
        commitAuthorAvatar: commit.author?.avatar_url ?? "",
    })


)}

export const pollCommits = async (projectId: string) => {
    const {project, githubUrl} = await fetchProjectGithubUrl(projectId)
    const commitHashes = await getCommitHashes(githubUrl)
    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes)
    const summaryReponse = await Promise.allSettled(unprocessedCommits.map(async (commit) => {
        return summarizeCommits(githubUrl, commit.commitHash)
    }))
    const summaries = summaryReponse.map((response) => {
        if (response.status === 'fulfilled') {
            return response.value as string
        }
        return " "
    })

    const commits = await db.commit.createMany({

        data: summaries.map((summary, index) => {
            console.log(`processing commit ${index}`)
            return {
                projectId,
                commitHash: unprocessedCommits[index]!.commitHash,
                commitMessage: unprocessedCommits[index]!.commitMessage,
                commitDate: unprocessedCommits[index]!.commitDate,
                commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
                commitAuthorAvatar: unprocessedCommits[index]!.commitAuthorAvatar,
                summary
            }
        })
    }) 

    return commits

}

async function summarizeCommits(githubUrl: string, commitHash: string) {

    const {data} = await axios.get(`${githubUrl}/commit/${commitHash}.diff` , {
        headers: {
            Accept: 'application/vnd.github.v3.diff'
        }
    })

    return await aiSummarizeCommit(data) || "No summary available"



}

async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            githubUrl: true
        }
    })

    if (!project?.githubUrl) {
        throw new Error('Project has no Github url')
    }

    return {project, githubUrl: project?.githubUrl}
}

async function filterUnprocessedCommits(projectId: string, commitHashes: Response[]) {
    const processedCommits = await db.commit.findMany({
        where: {
            projectId: projectId
        }
    })

    // const processedHashes = processedCommits.map(commit => commit.commitHash)

    const unprocessedCommits = commitHashes.filter((commit) => !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash))

    return unprocessedCommits
}