// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { error } from "console";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8CDbXeJ797-UJaDK0hDawfL5S81NZQBM",
  authDomain: "repoai-3568d.firebaseapp.com",
  projectId: "repoai-3568d",
  storageBucket: "repoai-3568d.firebasestorage.app",
  messagingSenderId: "403384001762",
  appId: "1:403384001762:web:5a85926a154d7bde4a6abb",
  measurementId: "G-W5S3R6VCP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export async function uploadFile(file: File, setProgress?: (progress: number) => void) {
  return new Promise((resolve, reject) => {
    try {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef,file);
    
        uploadTask.on('state_changed', snapshot => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          if (setProgress) setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, error => {
            console.error(error);
            reject(error);
        },
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
        });
    });
    } catch (error) {
        
        console.error(error)
        reject(error)
    }

  }
)
}