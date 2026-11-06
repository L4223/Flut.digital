
import Link from "next/link";
import { siteConfig, navItems } from "@/config/site";
import { Github, Linkedin, Instagram } from "lucide-react";
import WaveLogo from "../icons/wave-logo";

export default function Footer() {
  const legalLinks = [
    { title: "Impressum", href: "/recht/impressum" },
    { title: "Datenschutz", href: "/recht/datenschutz" },
  ];

  const icons = { GitHub: Github, LinkedIn: Linkedin, Instagram: Instagram };
  const socialLinks = siteConfig.social.map((s) => ({ ...s, icon: icons[s.name] }));
  const { email, region } = siteConfig.contact;

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
                <WaveLogo className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">{siteConfig.name}</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              {region}
            </p>
            <a href={`mailto:${email}`} className="inline-block py-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              {email}
            </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 col-span-3 gap-8">
            <div>
                <h2 className="font-semibold mb-3">Navigation</h2>
                <ul className="space-y-1">
                    {navItems.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className="inline-block py-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
                        {item.title}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="font-semibold mb-3">Rechtliches</h2>
                <ul className="space-y-1">
                    {legalLinks.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className="inline-block py-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
                        {item.title}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
            {socialLinks.length > 0 && (
              <div>
                <h2 className="font-semibold mb-3">Social Media</h2>
                <div className="flex gap-2">
                    {socialLinks.map((social) => (
                        <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2 -ml-2 text-muted-foreground hover:text-primary transition-colors">
                            <social.icon className="w-5 h-5" aria-hidden="true" />
                            <span className="sr-only">{social.name}</span>
                        </a>
                    ))}
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 md:px-6 py-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
