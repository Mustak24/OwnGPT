import { useModelStore } from '@/features/Models';
import { Icon, ThemeText } from '@funtools/native-ui/core';
import { useThemeStore } from '@funtools/native-ui/theme';
import { useNavigation } from '@/shared/hooks';
import { Switch, View } from 'react-native';
import { PressableView } from '@funtools/native-ui';

export default function AIModelsOptions() {
  const { colors, themeMode } = useThemeStore(store => ({
    colors: store.colors,
    themeMode: store.theme,
  }));

  const selectedMode = useModelStore(store => store.selectedModel);
  const navigation = useNavigation();

  return (
    <View className="w-full gap-4">
      <ThemeText color="text-secondary" className="text-lg font-bold">
        AI Model Info
      </ThemeText>

      <PressableView
        className="flex-row items-center justify-between w-full p-4 rounded-xl"
        onPress={() =>
          navigation.navigate('ModelStack', {
            screen: 'ListingScreen',
          })
        }
      >
        <View className="flex-1">
          <ThemeText color="text-secondary" className="text-xs">
            {selectedMode ? 'Model In Use' : 'Please Select A Model'}
          </ThemeText>
          <ThemeText className="text-lg font-bold">
            {selectedMode ? selectedMode.name : 'N/A'}
          </ThemeText>
        </View>

        <Icon name="ChevronRight" size={20} color="text-secondary" />
      </PressableView>

      <PressableView className="flex-row items-center gap-4 w-full p-4 rounded-xl">
        <View className="flex-1">
          <ThemeText className="text-lg font-bold">
            Use GPU Acceleration
          </ThemeText>

          <View className="flex-row items-center gap-1">
            <Icon name="Info" color="warning" size={12} />

            <ThemeText color="warning" className="text-xs">
              Required App Restart
            </ThemeText>
          </View>
        </View>

        <View className="flex-1 flex-row items-center justify-end">
          <Switch
            // value={themeMode === 'dark'}
            trackColor={{ false: 'white', true: 'white' }}
            thumbColor={
              themeMode === 'dark' ? colors.primary : colors['text-secondary']
            }
            // onValueChange={() => toggleTheme()}
          />
        </View>
      </PressableView>
    </View>
  );
}
