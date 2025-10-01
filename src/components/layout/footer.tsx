import Link from "next/link";
import { siteConfig, navItems } from "@/config/site";
import { Github, Twitter, Linkedin, Code } from "lucide-react";

export default function Footer() {
  const legalLinks = [
    { title: "Impressum", href: "/recht/impressum" },
    { title: "Datenschutz", href: "/recht/datenschutz" },
  ];

  const socialLinks = [
    { name: "GitHub", href: siteConfig.social.github, icon: Github },
    { name: "Twitter", href: siteConfig.social.twitter, icon: Twitter },
    { name: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
  ];

  return (
    <footer className="border-t">
      <div className="container px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
                <Code className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">{siteConfig.name}</span>
            </Link>
            <p className="text-muted-foreground text-sm">
            Innovative digitale Lösungen, die begeistern.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 col-span-3 gap-8">
            <div>
                <h4 className="font-semibold mb-3">Navigation</h4>
                <ul className="space-y-2">
                    {navItems.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {item.title}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3">Rechtliches</h4>
                <ul className="space-y-2">
                    {legalLinks.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {item.title}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3">Social Media</h4>
                <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                        <Link key={social.name} href={social.href} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <social.icon className="w-5 h-5" />
                            <span className="sr-only">{social.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container px-4 md:px-6 py-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
