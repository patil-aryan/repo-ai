'use-client'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import React from 'react'
import { Prism } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

type Props = {
    fileReferences: {fileName: string, sourceCode: string, summary: string}[]
}

const CodeReferences = ({fileReferences}: Props) => {

    // const [tab, setTab] = React.useState(fileReferences[0]?.fileName)
    const [tab, setTab] = React.useState(fileReferences?.[0]?.fileName ?? '');

    // if (fileReferences.length === 0) return null
    if (!fileReferences || fileReferences.length === 0) return null;



  return (
    <>
    <div className='max-w-[60vw]'>
        <Tabs value={tab} onValueChange={setTab}>
            <div className='overflow-scroll flex gap-2 bg-gray-200 p-1 rounded-md '>
                {fileReferences.map((file) => {
                    return <button key={file.fileName} className={cn('px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-muted-foreground hover:bg-muted',
                        {
                            'bg-primary text-white': tab === file.fileName,
                            'hover:bg-gray-300': tab !== file.fileName
                        }
                    )}>
                        {file.fileName}
                    </button>
                })}
            </div>
            {fileReferences.map(file => (
                <TabsContent key={file.fileName} value={file.fileName} className='max-h-[40vh] overflow-scroll max-w-7xl rounded-md'>
                    <Prism language='typescript' style={atomDark} showLineNumbers={true}>
                        {file.sourceCode}
                    </Prism>
                </TabsContent>
            ))} 
        </Tabs>
    </div>
    </>
  )
}

export default CodeReferences