import { useModelStore } from '@/features/Models';
import { Button } from '@funtools/native-ui';
import { EntityHeader } from '@/shared/components';
import { useNavigation } from '@/shared/hooks';
import { View } from 'react-native';

export default function Header() {
  const { isSomethingDownloading, selectedModel, downloadingInfo } =
    useModelStore(store => {
      let isSomethingDownloading = false;
      for (let id in store.downloadingInfo) {
        if (store.downloadingInfo[id].task) {
          isSomethingDownloading = true;
          break;
        }
      }

      return {
        isSomethingDownloading,
        selectedModel: store.selectedModel,
        downloadingInfo: store.downloadingInfo[store.selectedModel?.id ?? ''],
      };
    });

  const navigation = useNavigation();

  return (
    <View>
      <EntityHeader label="AI Models" className="justify-between">
        <Button
          rounded={100}
          fontSize={14}
          style={{ height: 32 }}
          loading={isSomethingDownloading}
          title="Downloads"
          endIcon="ChevronRight"
          onPress={() => {
            navigation.navigate('ModelStack', {
              screen: 'DownloadScreen',
            });
          }}
        />
      </EntityHeader>
    </View>
  );
}
