import { useModelStore } from '@/features/Models/Store';
import { EntityHeader } from '@/shared/components/layout/EntityHeader';
import { Button } from '@funtools/native-ui';
import { View } from 'react-native';

export default function Header() {
  const activeDownloads = useModelStore(store => {
    let count = 0;
    for (let key in store.downloadingInfo) {
      if (
        store.downloadingInfo[key].status === 'DOWNLOADING' ||
        store.downloadingInfo[key].status === 'RESUMING'
      ) {
        count++;
      }
    }
    return count;
  });

  return (
    <EntityHeader label="Downloads">
      <View className="flex-1 flex-row items-center justify-end">
        <Button
          rounded={100}
          fontSize={14}
          style={{ height: 32 }}
          startIcon="Download"
          title={activeDownloads.toString()}
        />
      </View>
    </EntityHeader>
  );
}
