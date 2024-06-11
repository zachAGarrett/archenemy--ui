/**
 * Splits an array into chunks of the specified size.
 *
 * @param array - The array to chunk.
 * @param size - The size of each chunk.
 * @returns An array of chunks.
 */
export default function chunkArray<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Size must be a positive number.");
  }

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}
