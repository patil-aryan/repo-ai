import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import AppSidebar from "../(protected)/dashboard/Sidebar";
type Props = {
  children: React.ReactNode;
};

const SideBarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-2 w-full">
        <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar p-2 px-4 shadow">
          {/* <SearchBar/> */}
          <div className="ml-auto"></div>
          <UserButton />
        </div>
        <div className="h-4"></div>
        <div className="border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll p-4 h-[calc(100vh-6rem)]">
            {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SideBarLayout;
