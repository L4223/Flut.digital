import type { NavItem } from '@/types/nav';

export const siteConfig = {
  name: "Flut.digital",
  description: "Innovative digitale Lösungen, die begeistern. Von Web bis AI.",
  url: "https://flut.digital",
  social: {
    github: "https://github.com/example",
    twitter: "https://twitter.com/example",
    linkedin: "https://linkedin.com/in/example",
  }
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
