'use strict';

// src/shared/utils/theme.ts
function parseRgbChannels(color) {
  return color.trim().replace("rgba", "").replace("rgb", "").replace("(", "").replace(")", "").split(",").map(Number).slice(0, 3);
}
function toRgba(color, alpha = 100) {
  color = color.trim();
  if (color.startsWith("rgb")) {
    const [r, g, b] = parseRgbChannels(color);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
  }
  if (color.startsWith("#")) return hexToRgba(color, alpha);
  throw new Error("Invalid color format");
}
function rgbaToHex(rgba, alpha = 100) {
  const [r, g, b] = parseRgbChannels(rgba);
  return [
    "#",
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1),
    alpha < 100 ? Math.round(alpha / 100 * 255).toString(16).padStart(2, "0") : ""
  ].join("");
}
function hexToRgba(hex, alpha = 100) {
  if (hex[0] !== "#") throw new Error("Invalid hex color");
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = bigint >> 16 & 255;
  const g = bigint >> 8 & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
}
function toHex(color, alpha = 100) {
  const rgba = toRgba(color, alpha);
  return rgbaToHex(rgba, alpha);
}
function colorMix(color1, blend = 100, color2 = "rgba(255, 255, 255)") {
  const [r1, g1, b1] = parseRgbChannels(toRgba(color1));
  const [r2, g2, b2] = parseRgbChannels(toRgba(color2));
  const mix = (c1, c2) => c1 + (c2 - c1) * (blend / 100);
  return `rgb(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)})`;
}

// src/shared/utils/common.ts
function randomUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
function syncTry(fn) {
  try {
    const result = fn();
    return [result, null];
  } catch (error) {
    return [null, Error(error instanceof Error ? error.message : String(error))];
  }
}
async function asyncTry(fn) {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    return [null, Error(error instanceof Error ? error.message : String(error))];
  }
}

exports.asyncTry = asyncTry;
exports.colorMix = colorMix;
exports.hexToRgba = hexToRgba;
exports.randomUUID = randomUUID;
exports.rgbaToHex = rgbaToHex;
exports.syncTry = syncTry;
exports.toHex = toHex;
exports.toRgba = toRgba;
//# sourceMappingURL=chunk-EFPA3LTE.js.map
//# sourceMappingURL=chunk-EFPA3LTE.js.map