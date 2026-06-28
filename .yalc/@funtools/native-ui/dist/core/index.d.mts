import { A as AnimatedInterpolValue, a as ShowWithAnimationProps, c as ButtonProps, I as IconName } from '../index-KklNf3Mw.mjs';
export { e as Icon, f as IconProps, g as RippleContainer, R as RippleContainerProps, h as ThemeView, T as ThemeViewProps } from '../index-KklNf3Mw.mjs';
import * as react from 'react';
import { ReactNode } from 'react';
import { TextProps, Text, GestureResponderEvent, ViewStyle } from 'react-native';
import { C as ColorState } from '../index-CSOtdVAQ.mjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import 'lucide-react-native';

type ShowProps = {
    when: boolean;
    children: ReactNode;
    otherwise?: ReactNode;
};
type ShowReturnType = (ShowProps['when'] extends true ? (ShowProps['children']) : (ShowProps['otherwise'] extends ReactNode ? ReactNode : null));
declare function Show({ when, children, otherwise }: ShowProps): ShowReturnType;

type ThemeTextProps = TextProps & {
    color?: ColorState;
    alpha?: number;
    textColor?: string | AnimatedInterpolValue;
};
declare const ThemeText: react.ForwardRefExoticComponent<TextProps & {
    color?: ColorState;
    alpha?: number;
    textColor?: string | AnimatedInterpolValue;
} & react.RefAttributes<Text>>;

declare function ShowWithAnimation(props: ShowWithAnimationProps): react_jsx_runtime.JSX.Element;

type Actions = Array<Pick<ButtonProps, 'title' | 'variant' | 'color' | 'rounded' | 'loading' | 'style'> & {
    onPress: (event: GestureResponderEvent, options: Parameters<NonNullable<ButtonProps['onPress']>>['1'] & {
        hide: () => void;
    }) => void;
}>;
type POPUP = {
    title: string;
    actions: Actions;
    icon?: IconName | (() => ReactNode);
    subtitle?: string;
    styles?: Record<'dialog' | 'content' | 'title' | 'subtitle' | 'footer', ViewStyle>;
    closeAfterAction?: boolean;
};
type ALERT_INFO = Omit<POPUP, 'actions'> & {
    action?: Omit<Actions[0], 'color'>;
};
type CONFIRM_INFO = Omit<POPUP, 'actions'> & {
    onConfirm: Actions[0]['onPress'];
    confirm?: Omit<Actions[0], 'color' | 'onPress'>;
    cancel?: Omit<Actions[0], 'color' | 'onPress'>;
    onCancel?: Actions[0]['onPress'];
};
type INFO_TYPE = 'success' | 'error' | 'warning' | 'info' | 'default';
declare function usePopup(): {
    Alert: Record<INFO_TYPE, (info: ALERT_INFO) => void>;
    Confirm: Record<INFO_TYPE, (info: CONFIRM_INFO) => void>;
    cleanupPopups: () => void;
    showPopup: (info: POPUP) => void;
};

declare const Alert: {
    success: (info: ALERT_INFO) => void;
    error: (info: ALERT_INFO) => void;
    warning: (info: ALERT_INFO) => void;
    info: (info: ALERT_INFO) => void;
    default: (info: ALERT_INFO) => void;
};
declare const Confirm: {
    success: (info: CONFIRM_INFO) => void;
    error: (info: CONFIRM_INFO) => void;
    warning: (info: CONFIRM_INFO) => void;
    info: (info: CONFIRM_INFO) => void;
    default: (info: CONFIRM_INFO) => void;
};

export { Alert, Confirm, IconName, Show, type ShowProps, ShowWithAnimation, ShowWithAnimationProps, ThemeText, type ThemeTextProps, usePopup };
