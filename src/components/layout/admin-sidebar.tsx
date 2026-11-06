
"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { BookText, Home, LogOut, MessageSquare, Briefcase } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import WaveLogo from "../icons/wave-logo";

const adminNavItems = [
    { href: "/admin", title: "Dashboard", icon: Home },
    { href: "/admin/blog", title: "Blog", icon: BookText },
    { href: "/admin/referenzen", title: "Referenzen", icon: Briefcase },
    { href: "/admin/kontakt", title: "Kontaktanfragen", icon: MessageSquare },
]

export default function AdminSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user] = useAuthState(auth!);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut(auth!);
    toast({ title: "Abgemeldet", description: "Sie wurden erfolgreich abgemeldet." });
    router.push('/login');
  };

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'A';
    return email.charAt(0).toUpperCase();
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <WaveLogo className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">{siteConfig.name}</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                        <Link href={item.href}>
                            <item.icon/>
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} tooltip="Abmelden">
                        <LogOut />
                        <span>Abmelden</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profil">
                        <Link href="#">
                            <Avatar className="size-6">
                                <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
                            </Avatar>
                            <span>{user?.email ?? 'Admin'}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger/>
        </header>
        <main className="p-4 md:p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
