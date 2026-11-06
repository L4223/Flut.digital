
"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { siteConfig, navItems } from "@/config/site";
import CtaButton from "@/components/cta-button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import WaveLogo from "../icons/wave-logo";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = (
        <>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
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
            <div className="w-full flex h-16 items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center gap-2 mr-6">
                    <WaveLogo className="h-6 w-6 text-primary" />
                    <span className="font-bold">{siteConfig.name}</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-14">
                    <nav aria-label="Hauptnavigation" className="flex gap-6 items-center">
                        {navLinks}
                    </nav>
                    <CtaButton asChild size="sm">
                        <Link href="/kontakt">Kontakt</Link>
                    </CtaButton>
                </div>


                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="p-2.5 -mr-2.5" aria-label="Menü öffnen">
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] bg-background" aria-describedby={undefined}>
                            <SheetTitle className="sr-only">Navigation</SheetTitle>
                            <div className="p-6">
                                <Link href="/" className="mb-8 flex items-center gap-2">
                                    <WaveLogo className="h-6 w-6 text-primary" />
                                    <span className="font-bold">{siteConfig.name}</span>
                                </Link>
                                <nav aria-label="Mobile Navigation" className="flex flex-col gap-2 mb-8">
                                    {navItems.map((item) => (
                                        <SheetClose asChild key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="py-2 text-lg font-medium hover:text-primary transition-colors"
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
        </header>
    );
}
