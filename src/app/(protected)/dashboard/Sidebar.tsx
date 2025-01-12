"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Plus,
  Presentation,
} from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import useProject from "@/hooks/use-project";
import SyncUser from "@/app/sync-user/page";


const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Query your repo",
    url: "/query",
    icon: Bot,
  },

  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation,
  },

  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];


const AppSidebar = () => {
  // const { pathname } = useRouter()
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSidebar();
  
  const { projects, projectId, setProjectId } = useProject()
  return (
    <>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <Link href="/dashboard">
            <div className="flex items-center gap-4">
              <Image
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvbWJpbmUiPjxwYXRoIGQ9Ik0xMCAxOEg1YTMgMyAwIDAgMS0zLTN2LTEiLz48cGF0aCBkPSJNMTQgMmEyIDIgMCAwIDEgMiAydjRhMiAyIDAgMCAxLTIgMiIvPjxwYXRoIGQ9Ik0yMCAyYTIgMiAwIDAgMSAyIDJ2NGEyIDIgMCAwIDEtMiAyIi8+PHBhdGggZD0ibTcgMjEgMy0zLTMtMyIvPjxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgcng9IjIiLz48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiByeD0iMiIvPjwvc3ZnPg=="
                alt="logo"
                width={40}
                height={40}
              />
              {open && (
                <h1 className="cursor-pointer px-3 text-[1.5rem] font-bold text-primary">
                  Repo AI
                </h1>
              )}
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {/* <Link
                        href={item.url}
                        className="{cn({'!bg-primary !text-white' : pathname === item.url}, 'list-none')}"
                      > */}
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 ${
                          pathname === item.url
                            ? "bg-black text-white" // Active tab styling
                            : "text-gray-800 hover:bg-gray-200" // Default styling
                        }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* <div>
                {projects?.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <div>
                        <div className="flex size-6 items-center justify-center rounded-sm border">
                          {project.name[0]}
                        </div>
                        <span>{project.name}</span>
                        {/* <div className={cn('rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary '), {
                                'bg-primary text-white': true
                            }}>
                            
                          
                        </div> */}
                      {/* </div> */}
                    {/* </SidebarMenuButton> */}
                  {/* </SidebarMenuItem> */}
                {/* ))} */}
                {/* </div> */} 
                {projects?.map((project) => (
                                <SidebarMenuItem key={project.id}>
                                    <SidebarMenuButton asChild>
                                        <div onClick={() => {
                                            setProjectId(project.id)
                                            router.push(`/dashboard`)
                                        }} className={cn({
                                            'cursor-pointer': true,
                                        })}>
                                            <div className="">
                                                <div className={cn("rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary", {
                                                    'bg-primary text-white': projectId === project.id,
                                                })}>
                                                    {project.name[0]}
                                                </div>
                                            </div>
                                            <span>{project.name}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                <div className="h-2"></div>

                {open && (
                  <SidebarMenuItem>
                    <Link href="/create">
                      <Button size={"sm"} variant={"outline"} className="w-fit">
                        <Plus />
                        Create Project
                      </Button>
                    </Link>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
