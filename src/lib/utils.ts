import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitial(name: string): string {
  return name
    .split(" ") // Split the name by spaces into an array
    .map((word) => word.charAt(0).toUpperCase()) // Get the first character of each word and convert to uppercase
    .join("");
}
