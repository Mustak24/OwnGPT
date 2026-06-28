import { T as Theme, C as ColorState } from '../index-CSOtdVAQ.js';
export { u as useThemeStore } from '../index-CSOtdVAQ.js';

declare const _colors: Record<Theme, Record<ColorState, string>>;

declare const toggleTheme: (theme?: Theme | undefined) => void;
declare const updateColors: (args_0: {
    theme: Theme;
    colors: Partial<typeof _colors[Theme]>;
}) => void;

export { toggleTheme, updateColors };
