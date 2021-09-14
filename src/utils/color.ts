const hex2frac = (hexString: string) => parseInt(hexString, 16) / 255;

export const luminance = (color: string) => {
  const [_, red, green, blue] = color.match(/#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/)!;

  const [RsRGB, GsRGB, BsRGB] = [red, green, blue].map(hex2frac);

  const [R, G, B] = [RsRGB, GsRGB, BsRGB].map((c) => (c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};
