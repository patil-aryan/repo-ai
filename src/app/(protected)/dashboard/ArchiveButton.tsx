// 'use client'

// import { Button } from '@/components/ui/button'
// import useProject from '@/hooks/use-project'
// import { api } from '@/trpc/react'
// import React from 'react'
// import { toast } from 'sonner'

// const ArchiveButton = () => {

//     const archiveProject = api.project.archiveProject.useMutation()
//     const {projectId} = useProject()
    
//     const handleClick = () => {
        
//     }

//   return (
//     <div>
//         <Button onClick={handleClick} >

//             Archive

//         </Button>
//     </div>
//   )
// }

// export default ArchiveButton

'use client'

import { Button } from '@/components/ui/button'
import useProject from '@/hooks/use-project'
import useRefetch from '@/hooks/use-refetch'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const ArchiveButton = () => {
  const archiveProject = api.project.archiveProject.useMutation()
  const { projectId } = useProject()
  const refetch = useRefetch()
  const router = useRouter()

  const handleClick = () => {
    // Display a custom toast with "Yes" and "No" options
    toast.custom((t) => (
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg">
        <p className="text-sm text-gray-700">Are you sure you want to delete this project?</p>
        <div className="flex gap-2">
          <Button
            disabled={archiveProject.isPending}
            // variant="destructive"
            onClick={() => {
              archiveProject.mutate(
                { projectId },
                {
                  onSuccess: () => {
                    toast.success('Project deleted successfully!')
                    refetch()
                    router.push(`/dashboard`)
                  },
                  onError: () => {
                    toast.error('Failed to delete project. Please try again.')
                  },
                }
              )
              toast.dismiss(t) // Dismiss the toast after action
            }}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toast.dismiss(t) // Dismiss the toast
              toast.info('Operation canceled.')
            }}
          >
            No
          </Button>
        </div>
      </div>
    ))
  }

  return (
    <div>
      <Button onClick={handleClick}>Delete Project</Button>
    </div>
  )
}

export default ArchiveButton