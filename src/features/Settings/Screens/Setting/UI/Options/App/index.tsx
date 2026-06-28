import { Icon, ThemeText } from '@funtools/native-ui/core';
import { View } from 'react-native';
import { PressableView } from '@funtools/native-ui';

export default function AppOptions() {
  return (
    <View className="w-full gap-4">
      <ThemeText color="text-secondary" className="text-lg font-bold">
        App Info
      </ThemeText>

      <PressableView
        color="primary"
        className="flex-row items-center gap-4 w-full p-4 rounded-xl"
        // onPress={() => openURL(PLAY_STORE_URL)}
      >
        <Icon name="Star" size={24} color="primary" />
        <ThemeText color="primary" className="text-lg font-bold">
          Rate us on Google Play Store
        </ThemeText>
      </PressableView>

      <PressableView
        color="warning"
        className="flex-row items-center gap-4 w-full p-4 rounded-xl"
        // onPress={() => Share.share(APP_SHARE_INFO)}
      >
        <Icon name="Share2" size={24} color="warning" />
        <ThemeText color="warning" className="text-lg font-bold">
          Share App
        </ThemeText>
      </PressableView>

      <PressableView
        color="bg-secondary"
        className="flex-row items-center gap-4 w-full p-4 rounded-xl"
        // onPress={() => openURL(PRIVACY_POLICY_URL)}
      >
        <Icon name="FileText" size={24} />
        <ThemeText className="text-lg font-bold">Privacy Policy</ThemeText>
      </PressableView>

      <PressableView
        color="bg-secondary"
        className="flex-row items-center gap-4 w-full p-4 rounded-xl"
        // onPress={() => openURL(PRIVACY_POLICY_URL)}
      >
        <Icon name="RefreshCw" size={24} />
        <ThemeText className="text-lg font-bold">Check for Updates</ThemeText>
      </PressableView>

      <PressableView
        color="bg-secondary"
        className="flex-row items-center gap-4 w-full p-4 rounded-xl"
        // onPress={() => openURL(PRIVACY_POLICY_URL)}
      >
        <Icon name="Info" size={24} />
        <ThemeText className="text-lg font-bold">
          Version 1.2.4, Build 423
        </ThemeText>
      </PressableView>
    </View>
  );
}
