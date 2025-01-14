// 'use client'

// import { Button } from '@/components/ui/button'
// import { Slider } from '@/components/ui/slider'
// import { createCheckoutSession } from '@/lib/stripe'
// import { api } from '@/trpc/react'
// import { create } from 'domain'
// import { Info } from 'lucide-react'
// import React from 'react'

// const BillingPage = () => {

//     const {data: user} = api.project.getMyCredits.useQuery()
//     const [creditsToBuy, setCreditsToBuy] = React.useState<number[]>([100])
//     const creditsToBuyAmount = creditsToBuy[0]!
//     const price = (creditsToBuyAmount / 50).toFixed(2)


//   return (
//     <div>
//         <h1 className='text-xl font-semibold'>
//             Billing
//         </h1>
//         <div className='h-2' ></div>
//         <p className='text-md text-gray-500'>
//             You currently have {user?.credits} credits.
//         </p>
//         <div className="h-2"></div>
//         <div className='bg-white px-4 py-2 rounded-md border border-black text-black'>
//             <div className='flex items-center gap-2'>
//                 <Info className='size-6' />
//                 {/* <div> */}
//                 <p className='text-sm'> Each credit allows you to index 1 file in a repository. For example, if you have 100 credits, you can index 100 files in a repository.</p>
                
//             {/* </div> */}
//             </div>
            
//         </div>
//         <div className='h-4'></div>

//         <div className='text-md mb-3 font-semibold'>
//             Buy Credits below
//         </div>

//         <Slider defaultValue={[100]} max={1000} min={10} step={10} onValueChange={value => setCreditsToBuy(value)} value={creditsToBuy}  />

//         <div className='h-4'></div>
        

//         <Button onClick={() => {
//             createCheckoutSession(creditsToBuyAmount)
//         }}>
//             Buy {creditsToBuyAmount} credits for ${price}
//         </Button>

//     </div>
//   )
// }

// export default BillingPage

// 'use client'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { createCheckoutSession } from '@/lib/stripe'
// import { api } from '@/trpc/react'
// import { Info } from 'lucide-react'
// import React from 'react'

// const BillingPage = () => {
//   const { data: user } = api.project.getMyCredits.useQuery()
//   const [creditsToBuy, setCreditsToBuy] = React.useState(100) // Single value instead of an array
//   const price = (creditsToBuy / 50).toFixed(2) // Example pricing: $0.02 per credit

//   // Function to handle increment
//   const handleIncrement = () => {
//     setCreditsToBuy((prev) => Math.min(prev + 10, 1000)) // Increase by 10, max 1000
//   }

//   // Function to handle decrement
//   const handleDecrement = () => {
//     setCreditsToBuy((prev) => Math.max(prev - 10, 10)) // Decrease by 10, min 10
//   }

//   return (
//     <div>
//       <h1 className="text-xl font-semibold">Billing</h1>
//       <div className="h-2"></div>
//       <p className="text-md text-gray-500">You currently have {user?.credits} RepoAI credits.</p>
//       <div className="h-2"></div>
//       <div className="bg-white px-4 py-2 rounded-md border border-black text-black">
//         <div className="flex items-center gap-2">
//           <Info className="size-6" />
//           <p className="text-sm">
//             Each credit allows you to index 1 file in a repository. For example, if you have 100 credits, you can index
//             100 files in a repository.
//           </p>
//         </div>
//       </div>
//       <div className="h-4"></div>

//       <div className="text-md mb-3 font-semibold">Buy Credits below</div>

//       {/* Numeric Input with Up/Down Buttons */}
//       <div className="flex items-center gap-2">
//         <Button variant="outline" size="icon" onClick={handleDecrement}>
//           -
//         </Button>
//         <Input
//           type="number"
//           min={10}
//           max={1000}
//           step={10}
//           value={creditsToBuy}
//           onChange={(e) => setCreditsToBuy(Number(e.target.value))}
//           className="w-24 text-center"
//         />
//         <Button variant="outline" size="icon" onClick={handleIncrement}>
//           +
//         </Button>
//       </div>

//       <div className="h-4"></div>

//       <Button
//         onClick={() => {
//           createCheckoutSession(creditsToBuy)
//         }}
//       >
//         Buy {creditsToBuy} RepoAI credits for ${price}
//       </Button>
//     </div>
//   )
// }

// export default BillingPage 

'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createCheckoutSession } from '@/lib/stripe'
import { api } from '@/trpc/react'
import { Info, HelpCircle } from 'lucide-react'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const BillingPage = () => {
  const { data: user } = api.project.getMyCredits.useQuery()
  const [creditsToBuy, setCreditsToBuy] = React.useState(100) 
  const price = (creditsToBuy / 50).toFixed(2) 


  const handleIncrement = () => {
    setCreditsToBuy((prev) => Math.min(prev + 10, 1000)) 
  }

  const handleDecrement = () => {
    setCreditsToBuy((prev) => Math.max(prev - 10, 10)) 
  }

  // Example credit packages
  const creditPackages = [
    { credits: 100, price: 2.0 },
    { credits: 200, price: 4 },
    { credits: 500, price: 10 },
    { credits: 1000, price: 20 },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Billing</h1>

      {/* Current Credits Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Credits</CardTitle>
          <CardDescription>
            You currently have <span className="font-semibold">{user?.credits} credits</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(user?.credits || 0) / 10} className="h-2" /> 
          <p className="text-sm text-gray-500 mt-2">
            Credits are used to index files in your repositories. Each credit allows you to index 1 file.
          </p>
        </CardContent>
      </Card>

   
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Credit Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {creditPackages.map((pkg) => (
            <Card key={pkg.credits}>
              <CardHeader>
                <CardTitle>{pkg.credits} Credits</CardTitle>
                <CardDescription>${pkg.price.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => {
                    setCreditsToBuy(pkg.credits)
                    
                  }}
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

  
      <Card>
        <CardHeader className="flex items-center justify-center">
          <CardTitle className='mb-2'>Buy Custom Credits</CardTitle>
          <CardDescription>
            Choose the number of credits you want to purchase.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="outline" size="icon" onClick={handleDecrement}>
              -
            </Button>
            <Input
              type="number"
              min={10}
              max={1000}
              step={10}
              value={creditsToBuy}
              onChange={(e) => setCreditsToBuy(Number(e.target.value))}
              className="w-24 text-center"
            />
            <Button variant="outline" size="icon" onClick={handleIncrement}>
              +
            </Button>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="size-4 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    Each credit allows you to index 1 file in a repository.
                    For example, if you have 100 credits, you can index 100 files in a repository. Credits are
                  non-refundable.
                  </p>
                </div>
              </TooltipTrigger>
              
            </Tooltip>
          </TooltipProvider>

          <Button
            className="w-half"
            onClick={() => {
              createCheckoutSession(creditsToBuy)
            }}
          >
            Buy {creditsToBuy} credits for ${price}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default BillingPage