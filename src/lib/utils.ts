import { clsx, type ClassValue } from "clsx";
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

export function formatCurrency(val: number) {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(val);
  return formatted;
}

type DateFormat = "DDMMYY" | "DATE" | "TIME" | "FULL";
export function beautifyDate(val: string | number, format: DateFormat): string {
  const date = new Date(val);

  switch (format) {
    case "DDMMYY":
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    case "DATE":
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    case "TIME":
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
        timeZoneName: "short",
        hour12: false, // Format 24 jam
      });
    case "FULL":
      return date.toLocaleString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
        timeZoneName: "short",
        hour12: false,
      });
    default:
      return date.toLocaleString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
        timeZoneName: "short",
        hour12: false,
      });
  }
}

export function getUniqueProperties<T extends Record<string, any>>(
  a: T,
  b: Partial<T>
): Partial<T> {
  return Object.keys(a).reduce((result, key) => {
    const aValue = a[key];
    const bValue = b[key];

    // Jika `b` tidak punya property ini, atau nilainya berbeda
    if (!(key in b)) {
      return { ...result, [key]: aValue };
    }

    // Jika nilai adalah object, lakukan deep comparison secara rekursif
    if (
      typeof aValue === "object" &&
      aValue !== null &&
      typeof bValue === "object" &&
      bValue !== null
    ) {
      const nestedDiff = getUniqueProperties(aValue, bValue);
      if (Object.keys(nestedDiff).length > 0) {
        return { ...result, [key]: nestedDiff };
      }
      return result;
    }

    // Jika nilai bukan object dan berbeda
    if (aValue !== bValue) {
      return { ...result, [key]: aValue };
    }

    return result;
  }, {} as Partial<T>);
}

export function createFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      // If the value is an array, append each item individually
      value.forEach((item) => formData.append(`${key}[]`, item));
    } else if (value instanceof File) {
      // If the value is a File, append it directly
      formData.append(key, value);
    } else if (value && typeof value === "object") {
      // If the value is an object, stringify it before appending
      formData.append(key, JSON.stringify(value));
    } else {
      // For other types (string, number, etc.), append as-is
      formData.append(key, value);
    }
  });

  return formData;
}
