// "use client"

// import { Card } from '@/components/ui/card';
// import { useDropzone } from 'react-dropzone'
// import React from 'react'
// import { uploadFile } from '@/lib/firebase';
// import { Presentation, Upload } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { CircularProgressbar } from 'react-circular-progressbar';

// const MeetingCard = () => {
//     const [progress, setProgress] = React.useState<number>(0);
//     const [isUploading, setIsUploading] = React.useState<boolean>(false);
//     const { getRootProps, getInputProps } = useDropzone({
//       accept: {
//         'audio/*': ['.mp3', '.wav', '.m4a'],
//       },
//       multiple: false,
//       maxSize: 50_000_000,
//       onDrop: async (acceptedFiles) => {
//         setIsUploading(true);
//         console.log(acceptedFiles);
//         const file = acceptedFiles[0];
//         const downloadURL = await uploadFile(file as File, setProgress);
//         setIsUploading(false);
//       }
//     });
//   return (
    
//       <Card className='col-span-2 flex flex-col items-center justify-center' {...getRootProps()}>
//         {!isUploading && (
//           <>
//           <Presentation className='h-10 w-10 animate-bounce' />
//           <h1 className='mt-2 text-l font-semibold text-gray-950'>
//             Create a new meeting
//           </h1>
//           <p className='mt-1 text-sm text-center text-gray-500'>
//             Analyze your meetings with RepoAI <br/>
            
//           </p>
//           <div className='mt-6'>
//             <Button disabled ={isUploading}>
//               <Upload className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
//               Upload audio file of your Meeting
//               <input className='hidden' {...getInputProps()} />

              

//             </Button>

//           </div>
//           </>
//         )}

//         {
//           isUploading && (
//             <div className='flex items-center justify-center'>
//               <CircularProgressbar className='size-20' value={progress} text={`${progress}%`} />
//               <p className='text-sm text-gray text-center'>
//                 Uploading your meeting...
//               </p>
             
//             </div>
//           )
//         }

//       </Card>
    
//   )
// }

// export default MeetingCard

"use client";

import { Card } from '@/components/ui/card';
import { useDropzone } from 'react-dropzone';
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowUpToLine, Presentation, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import dotenv from 'dotenv';
import { uploadFile } from '@/lib/supabase';
import build from 'next/dist/build';
import { toast } from 'sonner';
import { api } from '@/trpc/react';
import useProject from '@/hooks/use-project';
import { useRouter } from 'next/navigation';
// import { uploadFile } from '@/lib/firebase';
dotenv.config();

// Initialize Supabase client
// const supabaseUrl = ''; // Replace with your Supabase project URL
// const supabaseKey = ""; // Replace with your Supabase API key
// const supabase = createClient(supabaseUrl, supabaseKey);
// if (!supabaseKey) {
//   throw new Error('Supabase API key must be provided');
// }


// // Function to upload a file to Supabase Storage
// async function uploadFile(file: File, setProgress?: (progress: number) => void): Promise<string> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const bucketName = 'repoAI'; // Replace with your bucket name
//       const filePath = `repoAI/${file.name}`; // Path to store the file in the bucket

//       // Upload the file
//       const { data, error } = await supabase
//         .storage
//         .from(bucketName)
//         .upload(filePath, file, {
//           cacheControl: '3600', // Optional: Set cache control
//           upsert: false, // Optional: Prevent overwriting existing files
//         });

//       if (error) {
//         console.error('Error uploading file:', error);
//         reject(error);
//         return;
//       }

//       console.log('File uploaded successfully:', data);

//       // Get the public URL of the uploaded file
//       const { data: publicUrlData } = supabase
//         .storage
//         .from(bucketName)
//         .getPublicUrl(filePath);

//       const downloadURL = publicUrlData.publicUrl;
//       console.log('Public URL:', downloadURL);

//       resolve(downloadURL);
//     } catch (error) {
//       console.error('Error:', error);
//       reject(error);
//     }
//   });
// }

const MeetingCard = () => {
  const [progress, setProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const uploadMeeting = api.project.uploadMeeting.useMutation();
  const { project } = useProject();
  const router = useRouter();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a'],
    },
    multiple: false,
    maxSize: 50_000_000, // 50MB file size limit
    onDrop: async (acceptedFiles) => {
      if (!project ) return;
      setIsUploading(true);
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      try {
        if (!file) return;
        const downloadURL = await uploadFile(file as File, setProgress) as string;
        uploadMeeting.mutate({ 
          projectId: project.id, 
          meetingUrl: downloadURL,
          name: file.name },{
          onSuccess: () => {
            toast.success('Meeting uploaded successfully');
            router.push('/dashboard');
          },
          onError: (error) => {
            toast.error('Failed to upload meeting');
            console.error('Error uploading meeting:', error);
          } });
        // console.log('File uploaded successfully. Download URL:', downloadURL);
        
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setIsUploading(false);
      }
    },
  });

  return (
    <Card className='col-span-2 flex flex-col items-center justify-center rounded-lg border bg-white p-10' {...getRootProps()}>
      {!isUploading && (
        <>
          <Presentation className='h-10 w-10 animate-bounce' />
          <h1 className='mt-2 text-l font-semibold text-gray-950'>
            Create a new meeting
          </h1>
          <p className='mt-1 text-sm text-center text-gray-500'>
            Analyze your meetings with RepoAI <br />
          </p>
          <div className='mt-6'>
            <Button disabled={isUploading}>
              <Upload className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
              Upload audio file of your Meeting
              <input className='hidden' {...getInputProps()} />
            </Button>
          </div>
        </>
      )}

      {isUploading && (
        <div className=''>
          {/* <CircularProgressbar className='size-20 text-center' value={progress} text={`${progress}%`} styles={
            buildStyles({
              pathColor: '#2563EB',
              textColor: '#2563EB',

            })
          } /> */}
          
          <div className='flex items-center justify-center pb-2'>
          <ArrowUpToLine size={40} className='animate-pulse ' />
          </div>
          <p className='text-md text-gray text-center'>
            Uploading your meeting...
          </p>
        </div>
      )}
    </Card>
  );
};

export default MeetingCard;