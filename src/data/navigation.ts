export interface NavItem {
  name: string;
  href: string;
  number: string;
  isExternal?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Selected Work", href: "/#work", number: "01" },
  { name: "Playground", href: "/#playground", number: "02" },
  { name: "Expertise", href: "/#expertise", number: "03" },
  { name: "Journey", href: "/#journey", number: "04" },
  { name: "About", href: "/#about", number: "05" },
  { name: "Blog", href: "/blog", number: "06" },
  { name: "Contact", href: "/#contact", number: "07" },
];
