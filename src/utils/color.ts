const hex2frac = (hexString: string) => parseInt(hexString, 16) / 255;

export const luminance = (color: string) => {
  const [_, r, g, b] = color.match(/#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/)!;

  return 0.2126 * hex2frac(r) + 0.7152 * hex2frac(g) + 0.0722 * hex2frac(b);
};
