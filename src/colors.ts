import { Config } from "./customElement/config";
import tinyColor from "tinycolor2";

export const serializeColor = (originalColor: tinyColor.Instance, config: Config): string => {
  const format = `${config?.colorFormat ?? "hex"};${config?.useAlpha ?? false}` as const;
  const color = tinyColor(originalColor.toRgb());
  if (config?.useAlpha !== true) {
    color.setAlpha(1);
  }

  switch (format) {
    case "hex;false":
      return color.toHexString();
    case "hex;true":
      return color.toHex8String();
    case "rgb;false": {
      const rgb = color.toRgb();
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    case "rgb;true": {
      const rgb = color.toRgb();
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${+color.getAlpha().toFixed(2)})`;
    }
    case "hsl;false": {
      const hsl = color.toHsl();
      return `hsl(${hsl.h.toFixed()}, ${(hsl.s * 100).toFixed()}%, ${(hsl.l * 100).toFixed()}%)`;
    }
    case "hsl;true": {
      const hsl = color.toHsl();
      return `hsla(${hsl.h.toFixed()}, ${(hsl.s * 100).toFixed()}%, ${(hsl.l * 100).toFixed()}%, ${+color.getAlpha().toFixed(2)})`;
    }
    case "hsv;false": {
      const hsv = color.toHsv();
      return `hsv(${hsv.h.toFixed()}, ${(hsv.s * 100).toFixed()}%, ${(hsv.v * 100).toFixed()}%)`;
    }
    case "hsv;true": {
      const hsv = color.toHsv();
      return `hsva(${hsv.h.toFixed()}, ${(hsv.s * 100).toFixed()}%, ${(hsv.v * 100).toFixed()}%, ${+color.getAlpha().toFixed(2)})`;
    }
  }
};
