/**
 * Utility functions for the application
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently
 * Uses clsx for conditional class names and tailwind-merge for deduplication
 * 
 * @param {...ClassValue} inputs - Class names to be combined
 * @returns {string} Merged class string
 * 
 * @example
 * cn("px-2 py-1", "bg-red-500", { "text-white": true })
 * // => "px-2 py-1 bg-red-500 text-white"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a File or Blob to a base64 data URL
 * Used for image preview and upload functionality
 * 
 * @param {File | Blob} file - The file to convert
 * @returns {Promise<string>} Promise resolving to the data URL
 * 
 * @example
 * const imageUrl = await readFileAsDataUrl(imageFile);
 * // => "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
 */
export const readFileAsDataUrl = (file: File | Blob): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      if (typeof fileReader.result === 'string') return resolve(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  })
}