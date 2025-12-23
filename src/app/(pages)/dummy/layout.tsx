"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, PanelRightClose, PanelRightOpen } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { useSession, SessionProvider } from "next-auth/react";

// Define the props interface
interface PageProps {
  children: ReactNode; // To accept children elements
}

function LayoutContent({ children }: PageProps) {
  const segments = useSelectedLayoutSegments();
  const [open, setOpen] = useState(true);
  const { data: session } = useSession();
  const [image, setImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (session?.user) {
      setImage(session.user.image || null);
      setFirstName(session?.user.name?.split(" ")[0][0] || "");
    }
  }, [session]);

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = /iPhone|iPad|iPod|Android|Tablet/i.test(
        navigator.userAgent
      );
      setOpen(!isMobile);
    };

    checkDevice();

    const handleResize = () => {
      setOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SidebarProvider>
      <Separator />
      <AppSidebar className={open ? "w-60" : "w-0"} />
      <main className="flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-6">
          <div className="flex items-center gap-2">
            <span onClick={() => setOpen(!open)}>
              {open ? <PanelRightOpen /> : <PanelRightClose />}
            </span>
            <span className="font-semibold">Examprep</span>
            <ul className="flex items-center">
              {segments.map((segment, index) => (
                <div className="flex flex-row items-center gap-2" key={index}>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </span>
                </div>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={image || undefined} />
              <AvatarFallback>{firstName}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="h-full w-full min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 dark:from-indigo-950 dark:to-purple-900">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
}