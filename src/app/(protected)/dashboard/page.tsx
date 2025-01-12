"use client";
import useProject from "@/hooks/use-project";

import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
  const { project } = useProject();

  return (
    <>
      <div className="gap y-4 flex flex-wrap items-center justify-between">
        <div className="w-fit rounded-md bg-primary px-4 py-3">
          <div className="flex items-center gap-2">
            <Github className="size-5 text-white" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This project is linked to{" "}
                <Link
                  href={project?.githubUrl ?? ""}
                  target="_blank"
                  className="inline-flex items-center hover:underline"
                >
                  {project?.githubUrl ?? "Github"}
                  <ExternalLink className="ml-2 size-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="h-4">
          <div className="flex items-center gap-4">
            Team Members Invite Button Archive Button
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          Ask Questions
          Meetings
        </div>
      </div>

      <div className="mt-8">
        Commit Log
      </div>


    </>
  );
};

export default DashboardPage;
