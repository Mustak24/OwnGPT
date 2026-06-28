import { R as RippleContainerProps, I as IconName, B as ButtonVariant, S as SpinnerLoaderProps, T as ThemeViewProps, a as ShowWithAnimationProps } from '../index-KklNf3Mw.mjs';
export { b as Button, c as ButtonProps, d as SpinnerLoader } from '../index-KklNf3Mw.mjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { GestureResponderEvent, TextInputProps, ModalProps, ScrollViewProps, ViewProps } from 'react-native';
import { ReactNode, Dispatch, SetStateAction } from 'react';
import { C as ColorState } from '../index-CSOtdVAQ.mjs';
import 'lucide-react-native';

type LocalStates = Partial<Pick<IconButtonProps, 'icon' | 'color' | 'loading'>>;
type IconButtonProps = Omit<RippleContainerProps, 'rippleColor' | 'rippleScale' | 'onPress'> & {
    icon: IconName;
    autoDisabled?: boolean;
    variant?: ButtonVariant;
    size?: number;
    iconSize?: number;
    rounded?: number;
    loading?: boolean;
    loaderName?: SpinnerLoaderProps["name"];
    onPress?: (event: GestureResponderEvent, { handleState, reset }: {
        handleState: <K extends keyof LocalStates>(key: K, val: LocalStates[K]) => void;
        reset: () => void;
    }) => void;
};
declare function IconButton({ variant, color, icon, size, iconSize, rounded, loading, loaderName, disabled, autoDisabled, ...props }: IconButtonProps): react_jsx_runtime.JSX.Element;

type InputProps = Omit<TextInputProps, "placeholderTextColor"> & {
    useTrim?: boolean;
    color?: string;
};
declare function Input({ onChangeText, color, style, ...props }: InputProps): react_jsx_runtime.JSX.Element;

type ProgressBarProps = {
    progress: number;
    min?: number;
    max?: number;
    backgroundColor?: ThemeViewProps['color'];
    progressColor?: ThemeViewProps['color'];
    height?: number;
};
declare function ProgressBar(props: ProgressBarProps): react_jsx_runtime.JSX.Element;

type CenterModalProps = Omit<ModalProps, "animationType"> & {
    children: ReactNode;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    preventCloseRequest?: boolean;
    containerProps?: ThemeViewProps;
    backdropVariant?: ColorState;
    backdropAlpha?: number;
    onClose?: () => void;
    backgroundContent?: ReactNode;
    closeVelocity?: number;
    backdropColor?: string;
};
declare function CenterModal({ children, visible, setVisible, preventCloseRequest, onRequestClose, style, containerProps, backdropColor, backdropVariant, backdropAlpha, onClose, backgroundContent, closeVelocity, ...props }: CenterModalProps): react_jsx_runtime.JSX.Element;

declare function Content(props: ScrollViewProps): react_jsx_runtime.JSX.Element;

type Props = {
    title?: string;
    description?: string;
} & ViewProps;
declare function Header(props: Props): react_jsx_runtime.JSX.Element;

declare function Footer(props: ViewProps): react_jsx_runtime.JSX.Element;

type DialogProps = {
    onClose?: () => void;
    onHide?: () => void;
    containerProps?: ThemeViewProps;
    maxWidth?: number | `${number}%`;
    maxHeight?: number | `${number}%`;
    inlineMargin?: number | `${number}%`;
    blockMargin?: number | `${number}%`;
    backdropVariant?: ColorState;
    backgroundContent?: ReactNode;
    animationConfig?: {
        speed?: number;
        bounciness?: number;
    };
} & Omit<ModalProps, 'transparent' | 'animationType'>;
type DialogComponent = ((props: DialogProps) => JSX.Element) & {
    Header: typeof Header;
    Content: typeof Content;
    Footer: typeof Footer;
};
declare const Dialog: DialogComponent;

type PanelSwitcherProps = {
    activePanelValue: string;
    panels: Array<{
        value: string;
        content: ReactNode;
    }>;
    animationStyle?: ShowWithAnimationProps['animationStyle'];
    removePanelOnHide?: boolean;
} & Omit<ThemeViewProps, 'children'>;
declare function PanelSwitcher(props: PanelSwitcherProps): react_jsx_runtime.JSX.Element;

type PressableViewProps = {
    customColor?: string;
} & Omit<RippleContainerProps, 'rippleColor'>;
declare function PressableView(props: PressableViewProps): react_jsx_runtime.JSX.Element;

type EmptyStateProps = {
    title: string;
    description: string;
    iconName?: IconName;
};
declare function EmptyState({ iconName, title, description }: EmptyStateProps): react_jsx_runtime.JSX.Element;

declare function FuntoolsNativeUIProvider({ children }: {
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;

export { CenterModal, type CenterModalProps, Dialog, type DialogProps, EmptyState, type EmptyStateProps, FuntoolsNativeUIProvider, IconButton, type IconButtonProps, Input, type InputProps, PanelSwitcher, type PanelSwitcherProps, PressableView, type PressableViewProps, ProgressBar, type ProgressBarProps, SpinnerLoaderProps };
