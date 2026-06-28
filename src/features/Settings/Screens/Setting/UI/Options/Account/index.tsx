import { PressableView } from '@funtools/native-ui';
import { Icon, ThemeText } from '@funtools/native-ui/core';
import { toggleTheme, useThemeStore } from '@funtools/native-ui/theme';
import { Switch, View } from 'react-native';

export default function AccountOptions() {
  const { themeMode, colors } = useThemeStore(store => ({
    themeMode: store.theme,
    colors: store.colors,
  }));

  return (
    <View className="w-full gap-4">
      <ThemeText color="text-secondary" className="text-lg font-bold">
        Account Info
      </ThemeText>

      <PressableView className="gap-2 w-full p-4 rounded-xl">
        <ThemeText color="text-secondary">Name</ThemeText>

        <View className="flex-row items-center gap-2">
          <Icon name="User" size={24} color="text" />
          <ThemeText className="text-lg font-bold">@Mustak24</ThemeText>
        </View>
      </PressableView>

      <PressableView
        className="flex-row items-center gap-4 w-full p-4 rounded-xl"
        onPress={() => toggleTheme()}
      >
        <Icon name="Moon" size={24} color="text" />
        <ThemeText className="text-lg font-bold">Dark Mode</ThemeText>

        <View className="flex-1 flex-row items-center justify-end">
          <Switch
            value={themeMode === 'dark'}
            trackColor={{ false: 'white', true: 'white' }}
            thumbColor={themeMode === 'dark' ? colors.primary : 'gray'}
            onValueChange={() => toggleTheme()}
          />
        </View>
      </PressableView>
    </View>
  );
}
