'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import useProject from '@/hooks/use-project'
import { Copy } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const InviteButton = () => {

    const {projectId} = useProject()
    const [open, setOpen] = useState(false)
    const [origin, setOrigin] = useState('')

    useEffect(() => {
        setOrigin(window.location.origin)
      }, [])


  return (
    <>

    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Invite Team Members
                </DialogTitle>
            </DialogHeader>

            <p className='text-sm text-gray-500'>
                Invite team members to this project by sharing the project link.
            </p>
            <div className='flex items-center gap-2'>
            <Input className='mt-2' readOnly 
            // onClick={
            //     () => {
            //         navigator.clipboard.writeText(`${window.location.origin}/join/${projectId}`)
            //         toast.success('Link copied to clipboard')
                    
            //     }
            // } 
            value={`${origin}/join/${projectId}`} />
            <div className='cursor-pointer mt-2'>
                <Copy onClick={ () => { 
                    // navigator.clipboard.writeText(`${window.location.origin}/join/${projectId}`)
                    navigator.clipboard.writeText(`${origin}/join/${projectId}`)
                    toast.success('Link copied to clipboard')}} />
            </div>
            </div>
        </DialogContent>

    </Dialog>
    <Button onClick={() => setOpen(true)}>
        Invite Members 
    </Button>
        
    </>
  )
}

export default InviteButton