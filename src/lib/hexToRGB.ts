export default function hexToRgb(hex: string): [number, number, number] | null {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // If the hex value is in the short form (3 characters), convert it to the long form (6 characters)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Ensure the hex string is now exactly 6 characters
  if (hex.length !== 6) {
    return null;
  }

  // Parse the r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return the result as an array
  return [r, g, b];
}
