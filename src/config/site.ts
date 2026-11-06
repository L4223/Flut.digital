import type { NavItem } from '@/types/nav';

export const siteConfig = {
  name: "Flut.digital",
  description:
    "Webdesign, KI-Integrationen und 3D/AR-Erlebnisse aus Schwedeneck bei Kiel – für Unternehmen, die digital mehr wollen.",
  url: "https://flut.digital",
  contact: {
    owner: "Lasse Knodt",
    email: "kontakt@flut.digital",
    phone: "+49 (0) 151 59849866",
    address: {
      street: "Kieler Str. 9 b",
      postalCode: "24229",
      city: "Schwedeneck",
      country: "Deutschland",
    },
    region: "Schwedeneck bei Kiel, Schleswig-Holstein",
    hours: "Montag – Freitag, 09:00 – 18:00 Uhr",
  },
  // Only profiles with a real URL are rendered in the footer.
  // Add e.g. { name: "LinkedIn", href: "https://www.linkedin.com/in/…" }.
  social: [] as { name: "GitHub" | "LinkedIn" | "Instagram"; href: string }[],
};

export const navItems: NavItem[] = [
  {
    title: "Leistungen",
    href: "/leistungen",
  },
  {
    title: "Referenzen",
    href: "/referenzen",
  },
  {
    title: "Über uns",
    href: "/ueber",
  },
  {
    title: "Tech",
    href: "/tech",
  },
  {
    title: "Blog",
    href: "/blog",
  },
];
