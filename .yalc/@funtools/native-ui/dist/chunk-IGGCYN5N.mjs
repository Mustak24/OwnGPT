import { useStore } from './chunk-TCUDEVCQ.mjs';
import { toRgba, randomUUID } from './chunk-FOUCWFCB.mjs';
import * as icons from 'lucide-react-native';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Animated, StyleSheet, useAnimatedValue, Pressable, View, useWindowDimensions, PanResponder, Modal, TextInput, ScrollView } from 'react-native';
import { forwardRef, createContext, useState, useRef, useMemo, useLayoutEffect, useEffect, useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Icon({
  name,
  size = 16,
  color = "text",
  alpha = 100,
  customColor,
  ...props
}) {
  const colors = useStore((states) => {
    return customColor ?? toRgba(states.colors[color], alpha);
  });
  const LucideIcon = icons[name];
  return /* @__PURE__ */ jsx(LucideIcon, { ...props, color: colors, size });
}

// src/core/Show/index.tsx
function Show({ when, children, otherwise = null }) {
  return when ? children : otherwise;
}
var ThemeText = forwardRef((props, ref) => {
  const {
    style,
    color: _color = "text",
    alpha = 100,
    textColor
  } = props;
  const themeColor = useStore((states) => states.colors[_color]);
  const color = textColor ?? toRgba(themeColor, alpha);
  return /* @__PURE__ */ jsx(
    Animated.Text,
    {
      ...props,
      ref,
      style: [style, { color }]
    }
  );
});
var ThemeView = forwardRef((props, ref) => {
  let {
    style,
    backgroundColor,
    color = "bg",
    alpha = 100
  } = props;
  const { _backgroundColor } = useStore((states) => ({
    _backgroundColor: states.colors[color]
  }));
  if (!backgroundColor) backgroundColor = toRgba(_backgroundColor, alpha);
  return /* @__PURE__ */ jsx(
    Animated.View,
    {
      ...props,
      ref,
      style: [style, { backgroundColor }]
    }
  );
});
function RippleContainer({
  children,
  style,
  onPress,
  color = "text",
  rippleColor,
  rippleOpacity = 0.4,
  rippleScale = 1,
  duration = 300,
  rippleCount = 3,
  ...props
}) {
  const { top, left } = useSafeAreaInsets();
  const _rippleColor = useStore((s) => s.colors[color]);
  rippleColor ?? (rippleColor = toRgba(_rippleColor));
  const [position, setPosition] = useState({
    top: 0,
    left: 0
  });
  const animatedValue = useAnimatedValue(0);
  const button = useRef(null);
  function handleOnPress(event) {
    const { pageX, pageY } = event.nativeEvent;
    button.current?.measureInWindow((x, y, w) => {
      x += left;
      y += top;
      setPosition({ top: pageY - y - w / 2, left: pageX - x - w / 2 });
    });
    startAnimation();
    onPress?.(event);
  }
  function startAnimation() {
    if (props.disabled) return;
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      useNativeDriver: true
    }).start(() => {
      animatedValue.setValue(0);
    });
  }
  return /* @__PURE__ */ jsxs(
    Pressable,
    {
      ref: button,
      ...props,
      onPress: handleOnPress,
      style: [style, styles.container],
      children: [
        /* @__PURE__ */ jsx(View, { style: [styles.rippleContainer, { ...position }], children: [...new Array(Math.min(rippleCount, 5))].map((_, index) => /* @__PURE__ */ jsx(
          Animated.View,
          {
            style: [
              styles.ripple,
              {
                backgroundColor: rippleColor,
                opacity: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    rippleOpacity * ((rippleCount - index) / rippleCount),
                    0
                  ]
                }),
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.1, 1],
                      outputRange: [
                        0,
                        rippleScale * 0.1,
                        rippleScale + index * 0.1
                      ]
                    })
                  }
                ]
              }
            ]
          },
          index
        )) }),
        children
      ]
    }
  );
}
var styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative"
  },
  rippleContainer: {
    position: "absolute",
    aspectRatio: 1,
    width: "100%"
  },
  ripple: {
    position: "absolute",
    width: "100%",
    borderRadius: 1e6,
    aspectRatio: 1
  }
});

// src/core/ShowWithAnimation/animations.ts
var ANIMATIONS = {
  fade: {
    children: {
      opacity: [0, 1],
      scale: [0.8, 1]
    }
  }
};
function createAnimationStyle({ jsAnimatedValue, nativeAnimatedValue, animationStyle }) {
  const keys = Object.keys(animationStyle);
  const style = {};
  const transform = [];
  for (let key of keys) {
    if (key === "perspective" || key === "skewX" || key === "skewY" || key === "translateX" || key === "translateY" || key === "scale" || key === "scaleX" || key === "scaleY" || key === "rotate" || key === "rotateX" || key === "rotateY" || key === "rotateZ") {
      transform.push({
        [key]: nativeAnimatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [...animationStyle[key], ...animationStyle[key]].slice(0, 3)
        })
      });
    } else if (key === "opacity") {
      style.opacity = nativeAnimatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [...animationStyle[key], ...animationStyle[key]].slice(0, 3)
      });
    } else {
      style[key] = jsAnimatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [...animationStyle[key], ...animationStyle[key]].slice(0, 3)
      });
    }
  }
  return {
    ...style,
    transform
  };
}
function ShowWithAnimation(props) {
  let {
    when,
    children,
    containerProps,
    animationStyle,
    otherwise = null,
    removeOnHide = false,
    animationType = "fade",
    animationConfig = { duration: 300 },
    onShowAnimationEnd,
    onHideAnimationEnd,
    ...wrapperProps
  } = props;
  removeOnHide = removeOnHide === void 0 || removeOnHide;
  if (animationStyle && !animationStyle.otherwise) {
    animationStyle.otherwise = { ...animationStyle.children };
  }
  animationStyle = (() => {
    if (animationStyle) return animationStyle;
    const defaultAnimationStyle = ANIMATIONS[animationType];
    if (!defaultAnimationStyle.otherwise) {
      defaultAnimationStyle.otherwise = {
        ...defaultAnimationStyle.children
      };
    }
    return defaultAnimationStyle;
  })();
  const childrenJsAnimatedValue = useAnimatedValue(when ? 0 : -1);
  const childrenNativeAnimatedValue = useAnimatedValue(when ? 0 : -1);
  const otherwiseJsAnimatedValue = useAnimatedValue(when ? -1 : 0);
  const otherwiseNativeAnimatedValue = useAnimatedValue(when ? -1 : 0);
  const [isChildrenShow, setIsChildrenShow] = useState(when);
  const [isOtherwiseShow, setIsOtherwiseShow] = useState(!when);
  const visibility = useRef({ children: when, otherwise: !when });
  const styles7 = useMemo(() => ({
    children: createAnimationStyle({
      jsAnimatedValue: childrenJsAnimatedValue,
      nativeAnimatedValue: childrenNativeAnimatedValue,
      animationStyle: animationStyle.children
    }),
    otherwise: createAnimationStyle({
      jsAnimatedValue: otherwiseJsAnimatedValue,
      nativeAnimatedValue: otherwiseNativeAnimatedValue,
      animationStyle: animationStyle.otherwise ?? animationStyle.children
    })
  }), [animationStyle]);
  function Animate(value, toValue, useNativeDriver) {
    return Animated.timing(value, {
      toValue,
      useNativeDriver,
      ...animationConfig
    });
  }
  function handleShow() {
    setIsChildrenShow(true);
    visibility.current = { children: true, otherwise: false };
    Animated.parallel([
      Animate(childrenJsAnimatedValue, 0, false),
      Animate(childrenNativeAnimatedValue, 0, true),
      Animate(otherwiseJsAnimatedValue, 1, false),
      Animate(otherwiseNativeAnimatedValue, 1, true)
    ]).start(() => {
      if (visibility.current.otherwise) return;
      setIsOtherwiseShow(false);
      otherwiseJsAnimatedValue.setValue(-1);
      otherwiseNativeAnimatedValue.setValue(-1);
      onShowAnimationEnd?.children?.();
      onHideAnimationEnd?.otherwise?.();
    });
  }
  function handleHide() {
    setIsOtherwiseShow(true);
    visibility.current = { children: false, otherwise: true };
    Animated.parallel([
      Animate(otherwiseJsAnimatedValue, 0, false),
      Animate(otherwiseNativeAnimatedValue, 0, true),
      Animate(childrenJsAnimatedValue, 1, false),
      Animate(childrenNativeAnimatedValue, 1, true)
    ]).start(() => {
      if (visibility.current.children) return;
      setIsChildrenShow(false);
      childrenJsAnimatedValue.setValue(-1);
      childrenNativeAnimatedValue.setValue(-1);
      onShowAnimationEnd?.otherwise?.();
      onHideAnimationEnd?.children?.();
    });
  }
  useLayoutEffect(() => {
    when ? handleShow() : handleHide();
  }, [when]);
  return /* @__PURE__ */ jsx(Show, { when: removeOnHide ? isChildrenShow || !!otherwise && isOtherwiseShow : true, children: /* @__PURE__ */ jsxs(
    ThemeView,
    {
      ...containerProps,
      style: [
        containerProps?.style,
        {
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          display: isChildrenShow || !!otherwise && isOtherwiseShow ? "flex" : "none"
        }
      ],
      children: [
        /* @__PURE__ */ jsx(Show, { when: removeOnHide ? isChildrenShow : true, children: /* @__PURE__ */ jsx(
          Animated.View,
          {
            ...wrapperProps,
            style: [
              wrapperProps.style,
              styles7.children,
              {
                display: isChildrenShow ? "flex" : "none",
                position: when ? "relative" : otherwise ? "absolute" : "relative"
              }
            ],
            children
          }
        ) }),
        /* @__PURE__ */ jsx(Show, { when: !!otherwise && (removeOnHide ? isOtherwiseShow : true), children: /* @__PURE__ */ jsx(
          Animated.View,
          {
            ...wrapperProps,
            style: [
              wrapperProps.style,
              styles7.otherwise,
              {
                display: isOtherwiseShow ? "flex" : "none",
                position: when ? "absolute" : "relative"
              }
            ],
            children: otherwise
          }
        ) })
      ]
    }
  ) });
}
function SpinnerLoader({ name = "LoaderPinwheel", ...props }) {
  const animatedValue = useAnimatedValue(0);
  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1e3,
        useNativeDriver: true
      })
    );
    animation.start();
    return () => animation.stop();
  }, []);
  return /* @__PURE__ */ jsx(Animated.View, { style: {
    alignItems: "center",
    justifyContent: "center",
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"]
        })
      }
    ]
  }, children: LOADERS[name](props) });
}
var LOADERS = {
  LoaderPinwheel: (props) => /* @__PURE__ */ jsx(Icon, { ...props, name: "LoaderPinwheel" }),
  LoaderCircle: (props) => /* @__PURE__ */ jsx(Icon, { ...props, name: "LoaderCircle" }),
  Loader: (props) => /* @__PURE__ */ jsx(Icon, { ...props, name: "Loader" }),
  LoaderRefresh: (props) => /* @__PURE__ */ jsx(Icon, { ...props, name: "RefreshCw" })
};
function ProgressBar(props) {
  const {
    progress,
    min = 0,
    max = 100,
    backgroundColor = "bg-secondary",
    progressColor = "primary",
    height = 4
  } = props;
  const animatedValue = useAnimatedValue(progress);
  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: Math.min(Math.max(progress, min), max),
      useNativeDriver: false
    }).start();
  }, [progress]);
  return /* @__PURE__ */ jsx(ThemeView, { color: backgroundColor, style: { width: "100%", borderRadius: height, overflow: "hidden" }, children: /* @__PURE__ */ jsx(
    ThemeView,
    {
      color: progressColor,
      style: {
        borderRadius: height,
        height,
        width: animatedValue.interpolate({
          inputRange: [min, max],
          outputRange: ["0%", "100%"]
        })
      }
    }
  ) });
}
function CenterModal({
  children,
  visible,
  setVisible,
  preventCloseRequest = false,
  onRequestClose,
  style,
  containerProps,
  backdropColor,
  backdropVariant = "bg-secondary",
  backdropAlpha = 90,
  onClose,
  backgroundContent,
  closeVelocity = 2,
  ...props
}) {
  const backgroundColor = useStore((states) => {
    if (backdropColor) return backdropColor;
    return toRgba(states.colors[backdropVariant], backdropAlpha);
  });
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [show, setShow] = useState(visible);
  const animatedValue = useAnimatedValue(0);
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const { panHandlers } = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (_, { dx, dy }) => {
        translate.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (_, { vx, vy, dx, dy }) => {
        const isNearEdge = [
          Math.abs(dx) > windowWidth * 0.4,
          Math.abs(dy) > windowHeight * 0.4
        ].some(Boolean);
        const isMovingFast = [
          Math.abs(vx) > closeVelocity,
          Math.abs(vy) > closeVelocity
        ].some(Boolean);
        if ((isNearEdge || isMovingFast) && !preventCloseRequest) {
          return setVisible(false);
        }
        Animated.spring(translate, {
          toValue: { x: 0, y: 0 },
          bounciness: 12,
          useNativeDriver: true
        }).start();
      }
    })
  ).current;
  function handleClose() {
    setTimeout(() => setShow(false), 150);
    Animated.spring(animatedValue, {
      toValue: 0,
      bounciness: 12,
      useNativeDriver: true
    }).start(() => {
      onClose?.();
    });
  }
  function handleOnRequestClose() {
    if (preventCloseRequest) return;
    setVisible(false);
  }
  useEffect(() => {
    if (visible) {
      setShow(true);
      translate.setValue({ x: 0, y: 0 });
      Animated.spring(animatedValue, {
        toValue: 1,
        bounciness: 12,
        useNativeDriver: true
      }).start();
    } else {
      handleClose();
    }
  }, [visible]);
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      ...props,
      visible: show,
      transparent: true,
      animationType: "fade",
      onRequestClose: handleOnRequestClose,
      children: [
        /* @__PURE__ */ jsx(View, { style: styles2.backgroundContainer, children: backgroundContent }),
        /* @__PURE__ */ jsxs(
          Animated.View,
          {
            style: [
              styles2.contentContainer,
              {
                opacity: animatedValue,
                backgroundColor
              }
            ],
            children: [
              /* @__PURE__ */ jsx(
                RippleContainer,
                {
                  style: styles2.ripple,
                  onPress: handleOnRequestClose,
                  rippleOpacity: 0.2
                }
              ),
              /* @__PURE__ */ jsx(
                Animated.View,
                {
                  ...panHandlers,
                  style: {
                    width: "100%",
                    padding: 8,
                    position: "relative",
                    opacity: animatedValue,
                    transform: [
                      { translateX: translate.x },
                      { translateY: translate.y },
                      {
                        scale: animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.4, 1]
                        })
                      }
                    ]
                  },
                  children: /* @__PURE__ */ jsx(
                    ThemeView,
                    {
                      ...containerProps,
                      style: [
                        { borderRadius: 12, padding: 4 },
                        style,
                        { overflow: "hidden", width: "100%" }
                      ],
                      children
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                RippleContainer,
                {
                  style: styles2.ripple,
                  onPress: handleOnRequestClose,
                  rippleOpacity: 0.2
                }
              )
            ]
          }
        )
      ]
    }
  );
}
var styles2 = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },
  ripple: {
    flex: 1,
    width: "100%"
  }
});
function Panels(props) {
  const {
    activePanelValue,
    panels,
    animationStyle,
    removePanelOnHide
  } = props;
  if (panels.length === 0) return null;
  return /* @__PURE__ */ jsx(
    ShowWithAnimation,
    {
      when: panels[0].value === activePanelValue,
      containerProps: { style: { flex: 1, width: "100%" } },
      style: { flex: 1, width: "100%" },
      removeOnHide: removePanelOnHide,
      otherwise: /* @__PURE__ */ jsx(Panels, { ...props, panels: panels.slice(1) }),
      animationStyle: animationStyle ?? {
        children: {
          scale: [0.9, 1, 1.1],
          opacity: [0, 1, 0]
        }
      },
      children: panels[0].content
    }
  );
}
function PanelSwitcher(props) {
  const {
    activePanelValue,
    panels,
    animationStyle,
    removePanelOnHide,
    ...themeViewProps
  } = props;
  return /* @__PURE__ */ jsx(
    ThemeView,
    {
      ...themeViewProps,
      style: [
        { position: "relative" },
        themeViewProps.style
      ],
      children: /* @__PURE__ */ jsx(
        Panels,
        {
          activePanelValue,
          panels,
          animationStyle,
          removePanelOnHide
        }
      )
    }
  );
}
function PressableView(props) {
  const {
    color = "bg-secondary",
    rippleScale = 2,
    customColor
  } = props;
  const colors = useStore((store) => store.colors);
  return /* @__PURE__ */ jsx(
    RippleContainer,
    {
      ...props,
      color,
      rippleScale,
      style: {
        ...props.style,
        backgroundColor: customColor ? toRgba(customColor, 20) : toRgba(colors[color], 20)
      }
    }
  );
}
function EmptyState({ iconName, title, description }) {
  const animatedValue = useAnimatedValue(0);
  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 10
    }).start();
  }, []);
  return /* @__PURE__ */ jsxs(
    Animated.View,
    {
      style: [styles3.container, {
        opacity: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.8]
        }),
        transform: [{
          scale: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1]
          })
        }]
      }],
      children: [
        /* @__PURE__ */ jsx(Icon, { name: iconName ?? "Inbox", size: 38 }),
        /* @__PURE__ */ jsx(ThemeText, { style: styles3.title, children: title }),
        /* @__PURE__ */ jsx(ThemeText, { color: "text-secondary", style: styles3.description, children: description })
      ]
    }
  );
}
var styles3 = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 32,
    opacity: 0.8
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
    marginTop: 8
  },
  description: {
    fontWeight: 600,
    fontSize: 12,
    textAlign: "center"
  }
});

// src/components/form/buttons/utils.ts
function getButtonStyle({ text, bg, variant }) {
  if (variant === "solid") return { text: toRgba(text), bg: toRgba(bg), border: toRgba(bg) };
  if (variant === "outlined") return { text: toRgba(bg), bg: "transparent", border: toRgba(bg) };
  if (variant === "soft") return { text: toRgba(bg), bg: toRgba(bg, 20), border: toRgba(bg, 20) };
  if (variant === "soft-outlined") return { text: toRgba(bg), bg: toRgba(bg, 20), border: toRgba(bg) };
  if (variant === "text") return { text: toRgba(bg), bg: "transparent", border: "transparent" };
  return { text: toRgba(text), bg: toRgba(bg), border: toRgba(bg) };
}
function Button({
  title,
  startIcon,
  endIcon,
  variant = "soft",
  color = "primary",
  loading = false,
  loaderName,
  style,
  disabled = false,
  height = 40,
  fontSize,
  rounded = 12,
  onPress,
  autoDisabled = false,
  ...props
}) {
  const [states, setStates] = useState({});
  function handleState(key, val) {
    setStates((prev) => ({ ...prev, [key]: val }));
  }
  if (!fontSize) fontSize = Math.floor(height * 0.4);
  title = states.title ?? title;
  startIcon = states.startIcon ?? startIcon;
  endIcon = states.endIcon ?? endIcon;
  color = states.color ?? color;
  loading = states.loading ?? loading;
  if (autoDisabled === void 0 || autoDisabled) {
    disabled = disabled || loading;
  }
  const theme = useStore(({ colors }) => {
    if (["text", "bg"].includes(color ?? "")) {
      return {
        bgColor: colors[color],
        textColor: colors[color === "text" ? "bg" : "text"]
      };
    }
    return {
      bgColor: colors[color],
      textColor: "rgb(255, 255, 255)"
    };
  });
  const { text, bg, border } = useMemo(() => {
    return getButtonStyle({
      variant,
      text: toRgba(theme.textColor),
      bg: toRgba(theme.bgColor)
    });
  }, [theme, variant]);
  return /* @__PURE__ */ jsxs(
    RippleContainer,
    {
      ...props,
      rippleColor: text,
      rippleScale: 2,
      disabled,
      style: {
        backgroundColor: bg,
        borderColor: border,
        flexDirection: "row",
        gap: Math.floor(fontSize / 2),
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 12,
        height,
        borderRadius: rounded,
        borderWidth: 1,
        ...style,
        opacity: disabled ? 0.8 : 1
      },
      onPress: (event) => onPress?.(event, { handleState, reset: () => setStates({}) }),
      children: [
        /* @__PURE__ */ jsx(
          Show,
          {
            when: !loading,
            otherwise: /* @__PURE__ */ jsx(
              SpinnerLoader,
              {
                name: loaderName,
                size: fontSize,
                customColor: text
              }
            ),
            children: /* @__PURE__ */ jsx(Show, { when: !!startIcon, children: /* @__PURE__ */ jsx(
              Icon,
              {
                name: startIcon,
                size: fontSize,
                customColor: text
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsx(ThemeText, { textColor: text, style: { fontSize }, children: title }),
        /* @__PURE__ */ jsx(Show, { when: !!endIcon, children: /* @__PURE__ */ jsx(
          Icon,
          {
            name: endIcon,
            size: fontSize,
            customColor: text
          }
        ) })
      ]
    }
  );
}
function IconButton({
  variant = "soft",
  color = "primary",
  icon,
  size = 40,
  iconSize,
  rounded = 40,
  loading = false,
  loaderName,
  disabled = false,
  autoDisabled = false,
  ...props
}) {
  const [states, setStates] = useState({});
  function handleState(key, val) {
    setStates((prev) => ({ ...prev, [key]: val }));
  }
  function resetStates() {
    setStates({});
  }
  if (!iconSize) iconSize = Math.floor(size * 0.6);
  icon = states.icon ?? icon;
  color = states.color ?? color;
  loading = states.loading ?? loading;
  if (autoDisabled === void 0 || autoDisabled) {
    disabled = disabled || loading;
  }
  const theme = useStore(({ colors }) => {
    if (["text", "bg"].includes(color ?? "")) {
      return {
        bgColor: colors[color],
        textColor: colors[color === "text" ? "bg" : "text"]
      };
    }
    return {
      bgColor: colors[color],
      textColor: "rgb(255, 255, 255)"
    };
  });
  const { text, bg, border } = useMemo(() => {
    return getButtonStyle({
      variant,
      text: toRgba(theme.textColor),
      bg: toRgba(theme.bgColor)
    });
  }, [theme, variant]);
  return /* @__PURE__ */ jsx(
    RippleContainer,
    {
      ...props,
      disabled,
      rippleScale: 2,
      rippleColor: text,
      style: {
        opacity: disabled ? 0.8 : 1,
        height: size,
        width: size,
        aspectRatio: 1,
        borderRadius: rounded,
        borderWidth: 1,
        borderColor: border,
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center"
      },
      onPress: (event) => props.onPress?.(event, { handleState, reset: resetStates }),
      children: /* @__PURE__ */ jsx(
        Show,
        {
          when: !loading,
          otherwise: /* @__PURE__ */ jsx(
            SpinnerLoader,
            {
              name: loaderName,
              size: iconSize,
              customColor: text
            }
          ),
          children: /* @__PURE__ */ jsx(
            Icon,
            {
              customColor: text,
              name: icon,
              size: iconSize
            }
          )
        }
      )
    }
  );
}
function Input({ onChangeText, color, style, ...props }) {
  const colors = useStore((store) => store.colors);
  const textColor = colors.hasOwnProperty(color ?? "") ? colors[color] : color;
  return /* @__PURE__ */ jsx(
    TextInput,
    {
      ...props,
      placeholderTextColor: toRgba(textColor ?? colors.text, 80),
      style: [{ color: textColor ?? colors.text }, style]
    }
  );
}
function Popup({ id }) {
  const { popups, hidePopup, cleanupPopups } = usePopupContext();
  const popup = popups.find((popup2) => popup2.id === id);
  if (!popup) return null;
  const { icon, title, subtitle, actions, styles: customStyles, visible, closeAfterAction } = popup;
  return /* @__PURE__ */ jsxs(
    Dialog,
    {
      visible,
      onHide: cleanupPopups,
      containerProps: { style: styles4.dialog },
      style: [{ padding: 12 }, customStyles?.dialog],
      maxWidth: typeof customStyles?.dialog.maxWidth === "number" ? customStyles.dialog.maxWidth : 440,
      maxHeight: typeof customStyles?.dialog.maxWidth === "number" ? customStyles.dialog.maxWidth : void 0,
      children: [
        /* @__PURE__ */ jsx(View, { style: [styles4.header], children: /* @__PURE__ */ jsx(
          IconButton,
          {
            icon: "X",
            color: "text",
            variant: "text",
            onPress: () => hidePopup(id)
          }
        ) }),
        /* @__PURE__ */ jsxs(Dialog.Content, { contentContainerStyle: [styles4.content, customStyles?.content], children: [
          !icon ? null : typeof icon === "string" ? /* @__PURE__ */ jsx(
            Icon,
            {
              name: icon,
              size: 32
            }
          ) : icon(),
          /* @__PURE__ */ jsx(ThemeText, { color: "text", style: [styles4.title, customStyles?.title], children: title }),
          /* @__PURE__ */ jsx(Show, { when: !!subtitle, children: /* @__PURE__ */ jsx(ThemeText, { color: "text-secondary", style: [styles4.subtitle, customStyles?.subtitle], children: subtitle }) })
        ] }),
        /* @__PURE__ */ jsx(Dialog.Footer, { style: [styles4.footer, customStyles?.footer], children: actions.map((action, index) => /* @__PURE__ */ jsx(
          Button,
          {
            ...action,
            onPress: (event, options) => {
              if (closeAfterAction === void 0 || closeAfterAction) {
                hidePopup(id);
              }
              action.onPress(event, {
                ...options,
                hide: () => hidePopup(id)
              });
            },
            rounded: action.rounded ?? 100
          },
          index
        )) })
      ]
    }
  );
}
var styles4 = StyleSheet.create({
  dialog: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 16,
    position: "relative"
  },
  content: {
    gap: 8
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    top: 4,
    right: 4,
    zIndex: 100,
    width: "100%"
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center"
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8
  }
});
var Context = createContext(null);
var popupServiceRef = {
  current: null
};
function PopupProvider({ children }) {
  const [popups, setPopups] = useState([]);
  function showPopup(info) {
    setPopups((prev) => [...prev, {
      id: randomUUID(),
      visible: true,
      closeAfterAction: false,
      ...info
    }]);
  }
  function hidePopup(id) {
    setPopups((prev) => prev.map((popup) => {
      if (popup.id !== id) return popup;
      return {
        ...popup,
        visible: false
      };
    }));
  }
  function showAlert(type, info) {
    showPopup({
      ...info,
      closeAfterAction: true,
      actions: [{
        title: info.action?.title ?? "OK",
        variant: info.action?.variant ?? "solid",
        color: type === "default" ? "text" : type,
        rounded: info.action?.rounded ?? 100,
        style: { ...info.action?.style, flex: 1 },
        onPress: info.action?.onPress ?? ((_, { hide }) => hide())
      }]
    });
  }
  function showConfirm(type, info) {
    showPopup({
      ...info,
      closeAfterAction: true,
      actions: [
        {
          title: info.cancel?.title ?? "Cancel",
          variant: info.cancel?.variant ?? "outlined",
          color: "text",
          rounded: info.cancel?.rounded ?? 100,
          style: { ...info.cancel?.style, flex: 1 },
          onPress: info?.onCancel ?? ((_, { hide }) => hide())
        },
        {
          title: info.confirm?.title ?? "Confirm",
          variant: info.confirm?.variant ?? "solid",
          color: type === "default" ? "text" : type,
          rounded: info.confirm?.rounded ?? 100,
          style: { ...info.confirm?.style, flex: 1 },
          onPress: info.onConfirm ?? ((_, { hide }) => hide())
        }
      ]
    });
  }
  popupServiceRef.current = { showAlert, showConfirm };
  const Alert2 = {
    success: (info) => showAlert("success", info),
    error: (info) => showAlert("error", info),
    warning: (info) => showAlert("warning", info),
    info: (info) => showAlert("info", info),
    default: (info) => showAlert("default", info)
  };
  const Confirm2 = {
    success: (info) => showConfirm("success", info),
    error: (info) => showConfirm("error", info),
    warning: (info) => showConfirm("warning", info),
    info: (info) => showConfirm("info", info),
    default: (info) => showConfirm("default", info)
  };
  function cleanupPopups() {
    setPopups((prev) => prev.filter((popup) => popup.visible));
  }
  const states = {
    popups,
    showPopup,
    hidePopup,
    cleanupPopups,
    Alert: Alert2,
    Confirm: Confirm2
  };
  return /* @__PURE__ */ jsxs(Context.Provider, { value: states, children: [
    children,
    popups.map((popup) => /* @__PURE__ */ jsx(Popup, { id: popup.id }, popup.id))
  ] });
}
function usePopupContext() {
  const context = useContext(Context);
  if (!context) throw new Error("usePopupContext must be used within a PopupProvider");
  return context;
}
function usePopup() {
  const { Alert: Alert2, Confirm: Confirm2, cleanupPopups, showPopup } = usePopupContext();
  return {
    Alert: Alert2,
    Confirm: Confirm2,
    cleanupPopups,
    showPopup
  };
}

// src/core/Popup/services.ts
function executeServiceCall(type, method, info) {
  if (!popupServiceRef.current) {
    throw new Error(`Popup service not initialized. Render <PopupProvider> first.`);
  }
  if (type === "alert") {
    popupServiceRef.current.showAlert(method, info);
  } else {
    popupServiceRef.current.showConfirm(method, info);
  }
}
var Alert = {
  success: (info) => executeServiceCall("alert", "success", info),
  error: (info) => executeServiceCall("alert", "error", info),
  warning: (info) => executeServiceCall("alert", "warning", info),
  info: (info) => executeServiceCall("alert", "info", info),
  default: (info) => executeServiceCall("alert", "default", info)
};
var Confirm = {
  success: (info) => executeServiceCall("confirm", "success", info),
  error: (info) => executeServiceCall("confirm", "error", info),
  warning: (info) => executeServiceCall("confirm", "warning", info),
  info: (info) => executeServiceCall("confirm", "info", info),
  default: (info) => executeServiceCall("confirm", "default", info)
};
function Content(props) {
  return /* @__PURE__ */ jsx(
    ScrollView,
    {
      ...props,
      showsVerticalScrollIndicator: props.showsVerticalScrollIndicator ?? false,
      style: [
        { width: "100%" },
        props.style
      ],
      children: props.children
    }
  );
}
function Header(props) {
  const {
    title,
    description,
    children
  } = props;
  return /* @__PURE__ */ jsxs(
    View,
    {
      ...props,
      style: [
        styles5.container,
        props.style
      ],
      children: [
        /* @__PURE__ */ jsxs(View, { style: { display: title || description ? "flex" : "none", flex: 1 }, children: [
          /* @__PURE__ */ jsx(Show, { when: !!title, children: /* @__PURE__ */ jsx(
            ThemeText,
            {
              style: { fontSize: 20, fontWeight: "bold", width: "100%" },
              numberOfLines: 1,
              children: title
            }
          ) }),
          /* @__PURE__ */ jsx(Show, { when: !!description, children: /* @__PURE__ */ jsx(
            ThemeText,
            {
              color: "text-secondary",
              style: { fontSize: 12, width: "100%" },
              numberOfLines: 3,
              children: description
            }
          ) })
        ] }),
        children
      ]
    }
  );
}
var styles5 = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    paddingInline: 12
  }
});
function Footer(props) {
  return /* @__PURE__ */ jsx(
    View,
    {
      ...props,
      style: [
        styles6.container,
        props.style
      ]
    }
  );
}
var styles6 = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4
  }
});
var Dialog = (props) => {
  const {
    visible,
    children,
    onClose,
    onHide,
    maxWidth,
    maxHeight,
    inlineMargin = 32,
    blockMargin = "30%",
    containerProps,
    backdropVariant = "text-secondary",
    backgroundContent,
    animationConfig,
    ...modalProps
  } = props;
  if (animationConfig?.speed) animationConfig.speed = 5;
  if (animationConfig?.bounciness) animationConfig.bounciness = 20;
  const { width, height } = useWindowDimensions();
  const animatedValue = useAnimatedValue(0);
  const [show, setShow] = useState(!!visible);
  function getMarginValue(margin, total) {
    if (typeof margin === "number") {
      return margin;
    }
    const val = parseInt(margin.replace("%", ""));
    return Math.floor(total * (val / 100));
  }
  function handleShow() {
    setShow(true);
    Animated.spring(animatedValue, {
      delay: 50,
      toValue: 1,
      useNativeDriver: true,
      ...animationConfig
    }).start();
  }
  function handleHide() {
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
      ...animationConfig
    }).start(() => {
      setShow(false);
      onHide?.();
    });
  }
  useEffect(() => {
    !!visible ? handleShow() : handleHide();
  }, [visible]);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      ...modalProps,
      visible: show,
      transparent: true,
      animationType: "none",
      onRequestClose: (event) => {
        modalProps.onRequestClose?.(event);
        onClose?.();
      },
      children: /* @__PURE__ */ jsxs(
        ThemeView,
        {
          color: backdropVariant,
          alpha: 60,
          style: {
            flex: 1,
            width,
            height,
            justifyContent: "center",
            alignItems: "center",
            opacity: animatedValue
          },
          children: [
            /* @__PURE__ */ jsx(View, { style: {
              position: "absolute",
              flex: 1,
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              zIndex: -1
            }, children: backgroundContent }),
            /* @__PURE__ */ jsx(
              RippleContainer,
              {
                style: { flex: 1, width: "100%" },
                onPress: onClose,
                rippleOpacity: 0.2
              }
            ),
            /* @__PURE__ */ jsxs(View, { style: { width: "100%", flexDirection: "row" }, children: [
              /* @__PURE__ */ jsx(
                RippleContainer,
                {
                  style: { flex: 1 },
                  onPress: onClose,
                  rippleOpacity: 0.2
                }
              ),
              /* @__PURE__ */ jsx(
                ThemeView,
                {
                  ...containerProps,
                  style: [
                    {
                      width: "100%",
                      padding: 4,
                      borderRadius: 12,
                      gap: 8
                    },
                    containerProps?.style,
                    {
                      maxWidth: typeof maxWidth === "number" ? Math.min(maxWidth, width - getMarginValue(inlineMargin, width)) : maxWidth,
                      maxHeight: typeof maxHeight === "number" ? Math.min(maxHeight, height - getMarginValue(blockMargin, height)) : maxHeight
                    },
                    {
                      transform: [
                        {
                          scale: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.8, 1]
                          })
                        }
                      ]
                    }
                  ],
                  children
                }
              ),
              /* @__PURE__ */ jsx(
                RippleContainer,
                {
                  style: { flex: 1 },
                  onPress: onClose,
                  rippleOpacity: 0.2
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              RippleContainer,
              {
                style: { flex: 1, width: "100%" },
                onPress: onClose,
                rippleOpacity: 0.2
              }
            )
          ]
        }
      )
    }
  );
};
Dialog.Content = Content;
Dialog.Header = Header;
Dialog.Footer = Footer;

export { Alert, Button, CenterModal, Confirm, Dialog, EmptyState, Icon, IconButton, Input, PanelSwitcher, PopupProvider, PressableView, ProgressBar, RippleContainer, Show, ShowWithAnimation, SpinnerLoader, ThemeText, ThemeView, usePopup };
//# sourceMappingURL=chunk-IGGCYN5N.mjs.map
//# sourceMappingURL=chunk-IGGCYN5N.mjs.map