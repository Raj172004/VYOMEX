export interface NavLink {
  label: string;
  href: string;
}

export interface NavItemProps {
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}