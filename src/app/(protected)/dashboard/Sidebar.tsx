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
} from "@/components/ui/sidebar";

import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { usePathname } from "next/navigation";


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

const projects = [
  {
    title: "Project 1",
    url: "/projects/1",
  },

  {
    title: "Project 2",
    url: "/projects/2",
  },

  {
    title: "Project 3",
    url: "/projects/3",
  },
];



const AppSidebar = () => {

// const { pathname } = useRouter()
    const pathname = usePathname(); 
  return (
    <>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>Repo AI</SidebarHeader>
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
                          : "hover:bg-gray-200 text-gray-800" // Default styling
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
                {projects.map((project) => (
                  <SidebarMenuItem key={project.title}>
                    <SidebarMenuButton asChild>
                      <div>
                        <div className="flex size-6 items-center justify-center rounded-sm border">
                          {" "}
                          {project.title[0]}
                        </div>
                        <span>{project.title}</span>
                        {/* <div className={cn('rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary '), {
                                'bg-primary text-white': true
                            }}>
                            
                          
                        </div> */}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                <div className="h-2"></div>

                <SidebarMenuItem>
                    <Link href="/create">
                  <Button size={"sm"} variant={"outline"} className="w-fit">
                    <Plus />
                    Create Project
    
                  </Button>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
