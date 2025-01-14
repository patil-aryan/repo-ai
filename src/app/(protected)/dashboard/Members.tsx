'use client'

import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React from 'react'

const Members = () => {
    const {projectId} = useProject()
    const { data: members } = api.project.getTeamMembers.useQuery({ projectId })
  return (
    <div>
        <div className='flex items-center gap-2'>
            {members?.map(member => (
                <img className='rounded-full' key={member.id} src={member.user.imageUrl || " "} alt={member.user.firstName || " "} height={40} width={40} />

            ))}

        </div>
    </div>
  )
}

export default Members