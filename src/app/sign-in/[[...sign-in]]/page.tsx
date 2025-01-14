import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
  <div className='flex justify-center items-center h-screen'>
    <SignIn />
  </div>)
}

// import { SignIn } from '@clerk/nextjs';
// import { GitBranch } from 'lucide-react';

// export default function Page() {
//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-50">
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
//         {/* Left Side: RepoAI Branding and Features */}
//         <div className="bg-black p-8 text-white md:w-1/2">
//           <h1 className="text-4xl font-bold text-center mb-8">
//           <GitBranch values='RepoAI' />RepoAI
//             </h1>
//           <p className="text-lg mb-8">
//             RepoAI: AI-Driven Insights for Better Code Collaboration.
//           </p>
//           <ul className="space-y-4">
//             <li className="flex items-center">
//               <CheckIcon className="w-6 h-6 mr-2" />
//               <span>AI-driven commit insights</span>
//             </li>
//             <li className="flex items-center">
//               <CheckIcon className="w-6 h-6 mr-2" />
//               <span>Get meeting transcripts by uploading files</span>
//             </li>
//             <li className="flex items-center">
//               <CheckIcon className="w-6 h-6 mr-2" />
//               <span>Query your repository using RepoAI</span>
//             </li>
//             <li className="flex items-center">
//               <CheckIcon className="w-6 h-6 mr-2" />
//               <span>Real-time collaboration and feedback</span>
//             </li>
//           </ul>
//         </div>

//         {/* Right Side: Sign-In Form */}
//         <div className="p-8 md:w-1/2 flex justify-center items-center">
//           <SignIn />
//         </div>
//       </div>
//     </div>
//   );
// }

// // CheckIcon component for the feature list
// const CheckIcon = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M4.5 12.75l6 6 9-13.5"
//     />
//   </svg>
// );