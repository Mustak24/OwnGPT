declare function toRgba(color: string, alpha?: number): string;
declare function rgbaToHex(rgba: string, alpha?: number): string;
declare function hexToRgba(hex: string, alpha?: number): string;
declare function toHex(color: string, alpha?: number): string;
declare function colorMix(color1: string, blend?: number, color2?: string): string;

declare function syncTry<T>(fn: () => T): [T | null, Error | null];
declare function asyncTry<T>(fn: () => Promise<T>): Promise<[T | null, Error | null]>;

export { asyncTry, colorMix, hexToRgba, rgbaToHex, syncTry, toHex, toRgba };
