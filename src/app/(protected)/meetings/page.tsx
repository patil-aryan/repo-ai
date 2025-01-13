"use client";

import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React from "react";
import MeetingCard from "../dashboard/MeetingCard";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MeetingsPage = () => {
  const { projectId } = useProject();
  const { data: meetings, isLoading } = api.project.getMeetings.useQuery(
    { projectId },
    {
      refetchInterval: 4000,
    },
  );

  return (
    <>
      <MeetingCard />
      <div className="h-6"></div>
      <h1 className="text-xl font-semibold">Meetings</h1>
      {meetings && meetings.length === 0 && <div>No meetings found.</div>}
      {isLoading && <div>Loading...</div>}
      <ul className="divide-y divide-gray-200">
        {meetings?.map((meeting) => (
          <li
            key={meeting.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                    <Link href={`meetings/${meeting.id}`} className="text-lg font-semibold">
                    {meeting.name}</Link>
                    
                </div>
              </div>
             
                <div className="flex items-center text-sm text-gray-500 gap-x-2 pt-1 ml-2">
                    <p className="whitesapce-nowrap">
                        {meeting.createdAt.toLocaleDateString()}
                    </p>
                    {/* <span className="text-gray-900 text-xl">|</span> */}
                    <span className="h-6 border-l-[2px] border-black mx-1"></span>
                    <p className="truncate text-md">[{meeting.issues?.length} issues]</p>
                </div>
                {meeting.status === "PROCESSING" && (
                        <Badge className="text-white mx-4 px-3 py-2">
                            Processing

                        </Badge>
                    )}
              
            </div>
            <div className="flex items-center flex-none gap-x-4">
                <Link href={`meetings/${meeting.id}`} className="text-md font-semibold">
                <Button  className="bg-black text-white">
                    View Meeting
                </Button>
                </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MeetingsPage;
