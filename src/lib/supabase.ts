import { createClient } from '@supabase/supabase-js';

import 'dotenv/config';
// Initialize Supabase client
// const supabaseUrl = "https://yrtrjimiagtejiwxyqya.supabase.co"; // Replace with your Supabase project URL
// const supabaseKey = process.env.SUPABASE_KEY; // Replace with your Supabase API key
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Function to upload a file to Supabase Storage
// export async function uploadFile(file: File, setProgress?: (progress: number) => void): Promise<string> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const bucketName = 'audio_files'; // Replace with your bucket name
//       const filePath = `audios/${file.name}`; // Path to store the file in the bucket

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

const supabaseUrl = 'https://yrtrjimiagtejiwxyqya.supabase.co'; 
// const supabaseKey = ; 
const supabaseKey = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlydHJqaW1pYWd0ZWppd3h5cXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3ODgwMDksImV4cCI6MjA1MjM2NDAwOX0.V5cwK6MRqoGux1lR-i1CtnnjaxQbN2tuTb7qFVPW4i0" ; 
const supabase = createClient(supabaseUrl, supabaseKey);
if (!supabaseKey) {
  throw new Error('Supabase API key must be provided');
}


// Function to upload a file to Supabase Storage
export async function uploadFile(file: File, setProgress?: (progress: number) => void): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const bucketName = 'repoAI'; 
      const filePath = `repoAI/${file.name}`; 

      // Upload the file
      const { data, error } = await supabase
        .storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600', 
          upsert: false, 
        });

      if (error) {
        console.error('Error uploading file:', error);
        reject(error);
        return;
      }

      console.log('File uploaded successfully:', data);

     
      const { data: publicUrlData } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(filePath);

      const downloadURL = publicUrlData.publicUrl;
      console.log('Public URL:', downloadURL);

      resolve(downloadURL as string);
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
}

