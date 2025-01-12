

import { db } from "@/server/db"
// import { auth, clerkClient } from "@clerk/nextjs/server"import { db } from "@/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

const SyncUser = async () => {
  // Get the userId from Clerk's auth()
  const { userId } = await auth();

  // Log the userId for debugging
  console.log('userId from Clerk:', userId);

  if (!userId) {
    throw new Error('User not found');
  }

  // Fetch the user details from Clerk
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  // Log the user details for debugging
  console.log('User details from Clerk:', user);

  if (!user.emailAddresses[0]?.emailAddress) {
    return notFound();
  }

  // Log the email address for debugging
  console.log('Email address from Clerk:', user.emailAddresses[0]?.emailAddress);

  // Upsert the user into the database
  const result = await db.user.upsert({
    where: { emailAddress: user.emailAddresses[0]?.emailAddress ?? '' },
    update: {
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    create: {
      id: userId, // Ensure the id from Clerk is used
      emailAddress: user.emailAddresses[0]?.emailAddress ?? '',
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  // Log the result of the upsert operation for debugging
  console.log('Upsert result:', result);

  // Redirect to the dashboard
  return redirect('/dashboard');
};

export default SyncUser;


// import { notFound, redirect } from "next/navigation"



// const SyncUser = async () => {
//     const { userId } = await auth()
//     if (!userId) {
//       throw new Error('User not found')
//     }

//     const client = await clerkClient()
//     const user = await client.users.getUser(userId)
//     if (!user.emailAddresses[0]?.emailAddress) {
//       return notFound() 
//     }

//     await db.user.upsert({
//         where : { emailAddress : user.emailAddresses[0]?.emailAddress ?? ''},

//         update : {
//             imageUrl : user.imageUrl,
//             firstName : user.firstName,
//             lastName : user.lastName,
//         },

//         create : {
//             id : userId,
//             emailAddress : user.emailAddresses[0]?.emailAddress ?? '',
//             imageUrl : user.imageUrl,
//             firstName : user.firstName,
//             lastName : user.lastName,
//         }

//     })
//   return redirect('/dashboard')
// }

// export default SyncUser


// import { db } from "@/server/db"
// import { auth, clerkClient } from "@clerk/nextjs/server"
// import { notFound, redirect } from "next/navigation"

// const SyncUser = async () => {
//     const { userId } = await auth()
//     if (!userId) {
//       throw new Error('User not found')
//     }

//     const client = await clerkClient()
//     const user = await client.users.getUser(userId)
//     if (!user.emailAddresses[0]?.emailAddress) {
//       return notFound() 
//     }

//     await db.user.upsert({
//         where : { emailAddress : user.emailAddresses[0]?.emailAddress ?? ''},
//         update : {
//             imageUrl : user.imageUrl,
//             firstName : user.firstName,
//             lastName : user.lastName,
//         },
//         create : {
//             id : userId, // Ensure the id from Clerk is used
//             emailAddress : user.emailAddresses[0]?.emailAddress ?? '',
//             imageUrl : user.imageUrl,
//             firstName : user.firstName,
//             lastName : user.lastName,
//         }
//     })

//     return redirect('/dashboard')
// }

// export default SyncUser

