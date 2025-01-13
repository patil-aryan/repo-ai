import React from 'react'
import Issues from './issues'

type Props = {
    params: Promise<{ meetingId: string }>
}


const MeetingDetails = async ({params} : Props) => {

    const {meetingId} = await params

  return (
    <div><Issues meetingId={meetingId} /></div>
  )
}

export default MeetingDetails