import { AestheticRank } from "@/schemas/openai-vision";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBgGradient = (rank: AestheticRank) => {
  switch (rank) {
    case AestheticRank.Supreme:
      return "bg-gradient-to-r from-[#ecfdf5] via-[#a7f3d0] to-[#ecfdf5]";
    case AestheticRank.Legendary:
      return "bg-gradient-to-r from-[#E6E6FA] via-[#D8BFD8] to-[#E6E6FA]";
    case AestheticRank.Elite:
      return "bg-gradient-to-r from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]";
    case AestheticRank.Intermediate:
      return "bg-gradient-to-r from-[#F0E68C] via-[#EEE8AA] to-[#F0E68C]";
    case AestheticRank.Developing:
      return "bg-gradient-to-r from-[#B8B8B8] via-[#D3D3D3] to-[#B8B8B8]";
    case AestheticRank.Beginner:
      return "bg-gradient-to-r from-[#D2B48C] via-[#DEB887] to-[#D2B48C]";
    case AestheticRank.Starting:
      return "bg-gradient-to-r from-[#C0C0C0] via-[#DCDCDC] to-[#C0C0C0]";
    default:
      return "bg-gradient-to-r from-[#C0C0C0] via-[#DCDCDC] to-[#C0C0C0]";
  }
};
