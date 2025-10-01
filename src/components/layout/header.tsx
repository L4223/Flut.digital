
"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { siteConfig, navItems } from "@/config/site";
import CtaButton from "@/components/cta-button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import WaveLogo from "../icons/wave-logo";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = (
        <>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                    {item.title}
                </Link>
            ))}
        </>
    );

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300",
            isScrolled ? "border-b glass" : "border-b border-transparent"
        )}>
            <div className="container flex h-16 items-center px-4 md:px-6">
                <Link href="/" className="mr-6 flex items-center gap-2">
                    <WaveLogo className="h-6 w-6 text-primary" />
                    <span className="font-bold">{siteConfig.name}</span>
                </Link>

                <nav className="hidden md:flex flex-1 items-center gap-6">
                    {navLinks}
                </nav>

                <div className="flex items-center justify-end gap-4 ml-auto">
                    <CtaButton asChild size="sm" className="hidden md:flex">
                        <Link href="/kontakt">Kontakt</Link>
                    </CtaButton>
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="p-2">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Menü öffnen</span>
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] bg-background">
                                <div className="p-6">
                                    <Link href="/" className="mb-8 flex items-center gap-2">
                                        <WaveLogo className="h-6 w-6 text-primary" />
                                        <span className="font-bold">{siteConfig.name}</span>
                                    </Link>
                                    <nav className="flex flex-col gap-6 mb-8">
                                        {navItems.map((item) => (
                                            <SheetClose asChild key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className="text-lg font-medium hover:text-primary transition-colors"
                                                >
                                                    {item.title}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </nav>
                                    <CtaButton asChild className="w-full">
                                        <Link href="/kontakt">Kontakt</Link>
                                    </CtaButton>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
