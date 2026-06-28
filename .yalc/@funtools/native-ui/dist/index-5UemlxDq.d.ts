import { Animated, ViewProps, View, PressableProps, ViewStyle, EasingFunction, GestureResponderEvent } from 'react-native';
import * as react from 'react';
import { ReactNode } from 'react';
import { C as ColorState } from './index-CSOtdVAQ.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as icons from 'lucide-react-native';
import { LucideProps } from 'lucide-react-native';

type IconName = keyof typeof icons;
type IconProps = LucideProps & {
    name: IconName;
    size?: number;
    color?: ColorState;
    alpha?: number;
    customColor?: string;
};
declare function Icon({ name, size, color, alpha, customColor, ...props }: IconProps): react_jsx_runtime.JSX.Element;

declare const interpol: <OutputT extends number | string>(config: Animated.InterpolationConfigType) => Animated.AnimatedInterpolation<OutputT>;
type AnimatedInterpolValue = ReturnType<typeof interpol>;

type ThemeViewProps = ViewProps & {
    alpha?: number;
    color?: ColorState;
    backgroundColor?: string | AnimatedInterpolValue;
};
declare const ThemeView: react.ForwardRefExoticComponent<ViewProps & {
    alpha?: number;
    color?: ColorState;
    backgroundColor?: string | AnimatedInterpolValue;
} & react.RefAttributes<View>>;

type RippleContainerProps = Omit<PressableProps, "style" | "children"> & {
    children?: ReactNode;
    color?: ColorState;
    style?: ViewStyle;
    rippleOpacity?: number;
    rippleColor?: string;
    rippleScale?: number;
    rippleCount?: number;
    duration?: number;
};
declare function RippleContainer({ children, style, onPress, color, rippleColor, rippleOpacity, rippleScale, duration, rippleCount, ...props }: RippleContainerProps): react_jsx_runtime.JSX.Element;

type AnimationType = 'fade';
type AnimationStyleValue = ([
    number,
    number,
    number
] | [number, number] | [
    string,
    string,
    string
] | [string, string]);
type AnimationStyleProperties = {
    width?: AnimationStyleValue;
    height?: AnimationStyleValue;
    top?: AnimationStyleValue;
    bottom?: AnimationStyleValue;
    left?: AnimationStyleValue;
    right?: AnimationStyleValue;
    margin?: AnimationStyleValue;
    marginTop?: AnimationStyleValue;
    marginBottom?: AnimationStyleValue;
    marginLeft?: AnimationStyleValue;
    marginRight?: AnimationStyleValue;
    padding?: AnimationStyleValue;
    paddingTop?: AnimationStyleValue;
    paddingBottom?: AnimationStyleValue;
    paddingLeft?: AnimationStyleValue;
    paddingRight?: AnimationStyleValue;
    opacity?: AnimationStyleValue;
    scale?: AnimationStyleValue;
    scaleX?: AnimationStyleValue;
    scaleY?: AnimationStyleValue;
    translateX?: AnimationStyleValue;
    translateY?: AnimationStyleValue;
    rotate?: AnimationStyleValue;
    rotateX?: AnimationStyleValue;
    rotateY?: AnimationStyleValue;
    rotateZ?: AnimationStyleValue;
    skewX?: AnimationStyleValue;
    skewY?: AnimationStyleValue;
    perspective?: AnimationStyleValue;
};
type AnimationStyle = {
    children: AnimationStyleProperties;
    otherwise?: AnimationStyleProperties;
};
type ShowWithAnimationProps = ViewProps & {
    when: boolean;
    children: React.ReactNode;
    otherwise?: React.ReactNode;
    removeOnHide?: boolean;
    animationType?: AnimationType;
    animationStyle?: AnimationStyle;
    containerProps?: ThemeViewProps;
    animationConfig?: {
        duration?: number;
        delay?: number;
        easing?: EasingFunction;
    };
    onShowAnimationEnd?: {
        children?: () => void;
        otherwise?: () => void;
    };
    onHideAnimationEnd?: {
        children?: () => void;
        otherwise?: () => void;
    };
};

type ButtonVariant = 'solid' | 'outlined' | 'soft' | 'soft-outlined' | 'text';

type LocalStates = Partial<Pick<ButtonProps, 'title' | 'startIcon' | 'endIcon' | 'color' | 'loading'>>;
type ButtonProps = Omit<RippleContainerProps, "rippleColor" | "rippleScale" | 'onPress'> & {
    title: string;
    startIcon?: IconName;
    endIcon?: IconName;
    variant?: ButtonVariant;
    rounded?: number;
    fontSize?: number;
    height?: number;
    autoDisabled?: boolean;
    loading?: boolean;
    loaderName?: SpinnerLoaderProps["name"];
    onPress?: (event: GestureResponderEvent, { handleState, reset }: {
        handleState: <K extends keyof LocalStates>(key: K, val: LocalStates[K]) => void;
        reset: () => void;
    }) => void;
};
declare function Button({ title, startIcon, endIcon, variant, color, loading, loaderName, style, disabled, height, fontSize, rounded, onPress, autoDisabled, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

type SpinnerLoaderProps = Omit<IconProps, 'name'> & {
    name?: keyof typeof LOADERS;
};
declare function SpinnerLoader({ name, ...props }: SpinnerLoaderProps): react_jsx_runtime.JSX.Element;
declare const LOADERS: {
    LoaderPinwheel: (props: Omit<IconProps, "name">) => react_jsx_runtime.JSX.Element;
    LoaderCircle: (props: Omit<IconProps, "name">) => react_jsx_runtime.JSX.Element;
    Loader: (props: Omit<IconProps, "name">) => react_jsx_runtime.JSX.Element;
    LoaderRefresh: (props: Omit<IconProps, "name">) => react_jsx_runtime.JSX.Element;
};

export { type AnimatedInterpolValue as A, type ButtonVariant as B, type IconName as I, type RippleContainerProps as R, type SpinnerLoaderProps as S, type ThemeViewProps as T, type ShowWithAnimationProps as a, Button as b, type ButtonProps as c, SpinnerLoader as d, Icon as e, type IconProps as f, RippleContainer as g, ThemeView as h };
