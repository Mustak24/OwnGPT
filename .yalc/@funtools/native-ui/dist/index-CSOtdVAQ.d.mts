type Theme = 'light' | 'dark';
type ColorState = 'text' | 'text-secondary' | 'bg' | 'bg-secondary' | 'border' | 'primary' | 'error' | 'info' | 'warning' | 'success';
declare const useStore: <T>(selector: (state: {
    theme: Theme;
    colors: Record<ColorState, string>;
    palettes: Record<Theme, Record<ColorState, string>>;
}) => T) => T;

export { type ColorState as C, type Theme as T, useStore as u };
