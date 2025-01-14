
// import {AssemblyAI} from 'assemblyai';

// const client = new AssemblyAI({apiKey: process.env.ASSEMBLYAI_API_KEY});

import { AssemblyAI } from 'assemblyai';
import { start } from 'repl';

const client = new AssemblyAI({ apiKey: process.env.ASSEMBLY_API_KEY || 'd8864e7b1ddc430f9815b23dc99f6e02' });

function msToTime(ms: number) {
    const seconds = ms / 1000;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2,'0')}:${remainingSeconds.toString().padStart(2,'0')}`;
}

export const processMeeting = async (meetingUrl: string) => {
    const transcript = await client.transcripts.transcribe(
        {
            audio: meetingUrl,
            auto_chapters: true,
           
        }
    );

    const summaries = transcript.chapters?.map(chapter => ({
        start: msToTime(chapter.start),
        end: msToTime(chapter.end),
        gist: chapter.gist,
        headline: chapter.headline,
        summary: chapter.summary,

    })) || [];

    if (!transcript.text) throw new Error('No transcript found');

    return {
      summaries
    }
}   


// const FILE = 'https://storage.googleapis.com/aai-docs-samples/sports_injuries.mp3'
// const FILE = 'https://yrtrjimiagtejiwxyqya.supabase.co/storage/v1/object/public/repoAI/repoAI/%20Electric%20Love.mp3'

// const response = await processMeeting(FILE);
// console.log(response)