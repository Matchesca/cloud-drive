import { StorageItem } from "@/modules/dashboard/Dashboard";
import axios from "axios";
import { User } from "better-auth/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    // If the date is invalid, return the original string
    return isoString;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

/**
 * Extracts and decodes the file name from a given URL.
 * @param url - The URL containing the encoded file name.
 * @returns The decoded file name.
 */
export function getDecodedFileName(url: string): string {
  return decodeURIComponent(url);
}

/**
 * Converts bytes to a human-readable string.
 * @param bytes - The file size in bytes.
 * @param decimals - Number of decimals in the result (default is 2).
 * @returns A human-readable string (e.g., "465.00 KB").
 */
export function formatBytes(bytes: number, decimals = 0): string {
  if (bytes === 0) return "--";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${value} ${sizes[i]}`;
}

/**
 * Calculates the size of all items in the current active folder.
 * @param filteredRows: StorageItem[] - the content of the drive.
 * @returns Size of the folder added up (e.g., "2134").
 */
export function getSizeOfFolder(filteredRows: StorageItem[]) {
  let size = 0;
  filteredRows.forEach((item) => {
    if (item.size) {
      size += item.size;
    }
  });

  return size;
}

/**
 * Calculates the new url/path from the old url to the new url based on a new name.
 * @param oldUrl: string - the current url.
 * @param newName: string - the new name of the file
 * @returns The new constructed url preserving the ext
 */
export function computeNewUrl(oldUrl: string, newName: string): string {
  // Find the folder part (everything up to the last slash)
  const lastSlashIndex = oldUrl.lastIndexOf("/");
  const folder = oldUrl.substring(0, lastSlashIndex);

  // Extract the current file name and its extension.
  const oldFileName = oldUrl.substring(lastSlashIndex + 1);
  const dotIndex = oldFileName.lastIndexOf(".");
  let extension = "";
  if (dotIndex !== -1) {
    extension = oldFileName.substring(dotIndex); // includes the dot
  }

  // If newName already contains an extension, leave it as is;
  // otherwise, append the original extension.
  const finalName = newName.includes(".") ? newName : newName + extension;

  // Encode the final name to handle spaces and special characters.
  return folder + "/" + encodeURIComponent(finalName);
}

/**
 * Returns the file name without its extension.
 *
 * @param fileName - The full file name (e.g. "document.pdf" or "archive.tar.gz")
 * @returns The file name without the last extension (e.g. "document" or "archive.tar")
 */
export function getNameWithoutExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) return fileName; // no extension found
  return fileName.substring(0, lastDotIndex);
}

/**
 * Return the resource from resourceId.
 *
 * @param resources - StorageItem[] - List of all the resources.
 * @returns The resource item or undefined.
 */
export function findResourceById(
  resources: StorageItem[],
  resourceId: string | undefined,
): StorageItem | undefined {
  if (!resourceId) {
    return;
  }
  const resource = resources.find(
    (resource) => resource.id === parseInt(resourceId),
  );
  return resource;
}

export async function downloadFileAsBlob(
  user: User,
  resource: StorageItem,
): Promise<Blob> {
  const fileUrl = `${process.env.NEXT_PUBLIC_WEBDAV_CLIENT}/${user.id}${resource.url}`;

  // Make the GET request with responseType set to 'blob'
  const response = await axios.get(fileUrl, {
    method: "GET",
    responseType: "blob",
    withCredentials: true,
  });
  return response.data as Blob;
}

export function triggerDownload(blob: Blob, filename: string) {
  // Create a temporary object URL for the Blob
  const url = window.URL.createObjectURL(blob);
  // Create a temporary link element
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
