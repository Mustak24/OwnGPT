import { IconButton } from '@funtools/native-ui';
import { useNavigation } from '@/shared/hooks';
import { View } from 'react-native';

export default function Header() {
  const navigation = useNavigation();
  return (
    <View className="w-full flex-row items-center justify-end gap-2">
      <IconButton
        icon="History"
        color="text-secondary"
        onPress={() =>
          navigation.navigate('HomeStack', { screen: 'PdfHistory' })
        }
      />

      <IconButton icon="Edit2" color="text-secondary" />

      <IconButton
        icon="Settings"
        color="text-secondary"
        onPress={() => {
          navigation.navigate({
            name: 'SettingStack',
            params: {
              screen: 'Setting',
            },
          });
        }}
      />
    </View>
  );
}
