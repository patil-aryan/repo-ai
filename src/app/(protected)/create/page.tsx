'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRefetch from '@/hooks/use-refetch'
import { api } from '@/trpc/react'
import { Info } from 'lucide-react'
import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormInput = {
    repoUrl: string,
    projectName: string,
    githubToken?: string
}

const CreatePage = () => {
    const {register, handleSubmit, reset} = useForm<FormInput>()
    const checkCredits = api.project.checkCredits.useMutation()
    const createProject = api.project.createProject.useMutation()
    const refetch = useRefetch()

    function onSubmit(data: FormInput) {

        if (!!checkCredits.data) {
            createProject.mutate({
                name: data.projectName,
                githubUrl: data.repoUrl,
                githubToken: ""    //    githubToken: data.githubToken || ""  
         }, {
              onSuccess: () => {
                  toast.success('Project created successfully')
                  refetch()
                  reset()
              },
  
              onError: () => {
                  toast.error("Failed to create Project")
              }
  
  
         })
        } else {
            checkCredits.mutate({
                githubUrl: data.repoUrl,
                githubToken: data.githubToken
            })
        }

    }

    const hasEnoughCredits = checkCredits.data?.userCredits ? checkCredits.data?.fileCount <= checkCredits.data?.userCredits : true


  return (
    <>
    <div className='p-4 font-mono text-center text-xl'>
        <p>Create a new project by linking your github repository.</p>
    </div>
    <div className='flex items-center justify-center gap-2 py-24'> {/* h-full */}
        {/* <img className='h-72 w-auto' src="/images/github-overview.webp" alt="github" /> */}
        <img className='h-72 w-auto mt-12' src="https://raw.githubusercontent.com/patil-aryan/repo-ai/refs/heads/main/public/images/github-overview.webp" alt="github" />
        
        {/* <img className='h-56 w-auto' src="https://www.reshot.com/preview-assets/icons/NY46M9DGFU/github-NY46M9DGFU.svg" alt="github" /> */}
        <div className='pr-20'>
            <div>
                <h1 className='font-semibold text-2xl'>
                    Link your Github repository
                </h1>
                <p className='text-sm text-muted-foreground py-2'>
                    Connect your Github repository to start querying your codebase
                </p>
            </div>
            <div className='h-4'></div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register('projectName', {required: true})} placeholder='Project Name'/>
                    <div className='py-2'></div>
                    <Input {...register('repoUrl', {required: true})} type='url' placeholder='Github Repository' />
                    <div className='py-2'></div>
                    <Input {...register('githubToken', {required: false})} placeholder='Github Access Token (Optional)' />

                    {!!checkCredits.data && (
                        <>
                        <div className='mt-4 px-4 py-2 rounded-md border'>
                            <div className='flex items-center gap-2'>
                                <Info className='size-4'/>
                                <p className='text-sm'>You will be charged <strong>{checkCredits.data?.fileCount}</strong>
                                {" "}credits for this repository</p>
                            </div>
                            <p className='text-sm ml-6'>You currently have <strong>{checkCredits.data?.userCredits}
                                {" "}credits remaining</strong></p>
                        </div>
                        </>
                    )}
                    <div className='py-2'></div>
                    <Button type='submit' disabled={createProject.isPending || checkCredits.isPending || !hasEnoughCredits} className='w-full'>
                        {!!checkCredits.data ? 'Create Project' : 'Check Credits'}
                    </Button>
                </form>

            </div>

        </div>
        
    </div>
    </> )
}

export default CreatePage