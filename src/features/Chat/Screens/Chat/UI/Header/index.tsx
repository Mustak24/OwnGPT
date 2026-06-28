import { IconButton, PressableView } from '@funtools/native-ui';
import { Animated, useAnimatedValue, View } from 'react-native';
import { navigation } from '@/app/navigation';
import { chatHandlers, useChatStore } from '@/features/Chat/Store';
import { useEffect } from 'react';
import { ThemeView } from '@funtools/native-ui/core';

export default function Header() {

  const chatName = useChatStore(store => store.chat.name);
  const animatedValue = useAnimatedValue(0);

  function animate(value: 0 | 1) {
    Animated.spring(animatedValue, {
      toValue: value, 
      useNativeDriver: false, 
      bounciness: 12, 
      delay: 220,
      speed: 2
    }).start()
  }

  useEffect(() => {
      animate(chatName === 'NEW_CHAT' ? 0 : 1);
  }, [chatName])


  return (
    <View className="w-full flex-row items-center justify-between gap-2">
      <IconButton
        icon="History"
        color="text-secondary"
        size={40}
        onPress={() =>
          navigation.navigate('HomeStack', {screen: 'ChatHistory'})
        }
      />

      <ThemeView
        color='text-secondary' 
        alpha={20}
        className='rounded-full flex-row items-center justify-cetner' 
        style={{
          width: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [40, 80]
          }),
          height: 40
        }}
      >
        <Animated.View 
          style={{
            opacity: animatedValue,
            transform: [{scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.6, 1]
            })}]
          }}
        >
          <IconButton
            icon='SquarePen'
            variant='text'
            color='text-secondary'
            size={40}
            onPress={() => {
              chatHandlers.newChat();
            }}
          />
        </Animated.View>

        <View className='absolute right-0' >
          <IconButton
            icon='Settings'
            variant='text'
            color='text-secondary'
            size={40}
            onPress={() => {
              navigation.navigate('SettingStack', {screen: 'Setting'});
            }}
          />
        </View>
      </ThemeView>
    </View>
  );
}
