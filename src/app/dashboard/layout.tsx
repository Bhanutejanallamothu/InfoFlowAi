"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <SidebarProvider>
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
        <DashboardSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-white z-10">
            <SidebarTrigger className="-ml-1 text-primary" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-primary font-headline">Enterprise Dashboard</h1>
            </div>
            {currentDate && (
              <div className="text-xs text-muted-foreground hidden sm:block">
                Last updated: {currentDate}
              </div>
            )}
          </header>
          <main className="p-6 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
