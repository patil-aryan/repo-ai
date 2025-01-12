import { api } from '@/trpc/react'

import {useLocalStorage} from 'usehooks-ts'

const useProject = () => {
    const {data: projects } = api.project.getProjects.useQuery()
    const [projectId, setProjectId] = useLocalStorage('project', projects?.[0]?.id || '')
    const project = projects?.find((project) => project.id === projectId)
  return {
    projects,
    project,
    projectId,
    setProjectId
  }
}

export default useProject

// import { api } from '@/trpc/react'
// import { useLocalStorage } from 'usehooks-ts'
// import React from 'react'
// import { useRouter } from 'next/navigation'

// const useProject = () => {
//     const { data: projects, isLoading } = api.project.getAll.useQuery()
//     const [projectId, setProjectId] = useLocalStorage('d-projectId', '')
//     const project = projects?.find(project => project.id === projectId)
//     const router = useRouter()

//     React.useEffect(() => {
//         if (project) return
//         const timeout = setTimeout(() => {
//             router.push(`/create`)
//         }, 1000)
//         return () => clearTimeout(timeout)
//     }, [project])


//     return {
//         projects,
//         projectId,
//         isLoading,
//         setProjectId,
//         project,
//     }
// }

// export default useProject