'use client'

import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { api, RouterOutputs } from '@/trpc/react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ref } from 'firebase/storage'
import { VideoIcon } from 'lucide-react'
import React from 'react'

type Props = {
    meetingId: string
}

const Issues = ({meetingId} : Props) => {

    const {data: meeting, isLoading} = api.project.getMeetingById.useQuery({meetingId}, {
        refetchInterval: 4000
    })

    if (isLoading || !meeting) {
        return <div>Loading...</div>
    }


  return (
    <>
        <div className='p-8'>
            <div className='mx-auto flex max-w-2xl items-center justify-between gap-x-8 border-b pb-6 lg:max-0 lg:max-w-none'>
                <div className='flex items-center gap-x-6'>
                    <div className='rounded-full border bg-white p-3'>
                        <VideoIcon className='h-6 w-6' />

                    </div>
                    <h1>
                        <div className='text-sm leading-6 text-gray-600'>
                            Meeting on {""} {meeting.createdAt.toLocaleDateString()}
                        </div>
                        <div className='mt-1 text-base font-semibold leading-6 text-gray-900'>
                            {meeting.name}

                        </div>
                    </h1>
                    
                </div>

            </div>

            <div className='h-4'></div>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                {meeting.issues.map(issue => (
                    <IssueCard issue={issue} key={issue.id} />
                ))}
                

            </div>

   

        </div>
    </>
  )
}


function IssueCard({issue} : {issue: NonNullable<RouterOutputs['project']['getMeetingById']>['issues'][number]}) {

    const [open, setOpen] = React.useState(false)


    return (
       <>

       <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='text-xl underline underline-offset-4'>
                    {issue.gist}
                </DialogTitle>
                <DialogDescription>
                    {issue.createdAt.toLocaleDateString()}
                </DialogDescription>
                <p className='mb-4 text-md'>
                    Overview: {issue.headline}
                </p>
                {/* <blockquote className='mt-2 border-l-4 border-gray-300 bg-gray-50 p-4'> */}
               
                     <span className='text-gray-500 text-sm'>
                        Timestaps: {issue.start} - {issue.end}

                     </span>
                     {/* </blockquote> */}

                     <div>
                     Summary:
                     </div>
                    <blockquote className='mt-2 border-l-4 border-gray-300 bg-gray-50 p-4'>
                     <p className='font-medium text-xl leading-relaxed'>
                            {issue.summary}
                     </p>
                     </blockquote>

            </DialogHeader>
        </DialogContent>
       </Dialog>




       <Card className='relative'>
        <CardHeader>
            <CardTitle className='text-xl'>
                {issue.gist}
            </CardTitle>
            <div className='border-b'></div>
            <CardDescription>
                {issue.headline}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={() => setOpen(true)}>
                Details
            </Button>

        </CardContent>

       </Card>
       </>
    )
}

export default Issues