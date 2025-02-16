import { HardDrive, LucideIcon, Share2, Star, Trash } from "lucide-react";

export type Navitem = {
  label: string;
  link: string;
  Icon: LucideIcon;
};

export const navitems: Navitem[] = [
  {
    label: "My Drive",
    link: "/dashboard",
    Icon: HardDrive,
  },
  {
    label: "Starred",
    link: "/dashboard/starred",
    Icon: Star,
  },
  {
    label: "Shared",
    link: "/dashboard/shared",
    Icon: Share2,
  },
  {
    label: "Trash",
    link: "/dashboard/trash",
    Icon: Trash,
  },
];
