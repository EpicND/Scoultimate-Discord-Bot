/**
 * Converts HSL (Hue, Saturation, Lightness) color values to RGB (Red, Green, Blue) color values.
 * @param h - The hue value (0-360).
 * @param s - The saturation value (0-100).
 * @param l - The lightness value (0-100).
 * @returns An array containing the RGB color values [r, g, b].
 *
 * Found on Stack Overflow and slightly modified for Scoultimate
 *
 * Couldn't find the link to the StackOverflow answer, but found an Apple Open Source archive
 * with this:
 * https://opensource.apple.com/source/WebInspectorUI/WebInspectorUI-7608.3.10.1.4/UserInterface/Models/Color.js.auto.html#:~:text=static%20hsl2rgb(h%2C%20s%2C%20l)
 */
export function HSLToRGB(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}
