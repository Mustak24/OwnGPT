import { ModelDownloadingCard } from '@/features/Models/Components';
import { useModelStore } from '@/features/Models/Store';
import { EmptyState } from '@funtools/native-ui';
import { ShowWithAnimation } from '@funtools/native-ui/core';
import { View } from 'react-native';

export default function ListingSection() {
  const { models } = useModelStore(store => {
    const models = [];
    for (let model of store.models) {
      const downloadingInfo = store.downloadingInfo[model.id];
      if (downloadingInfo && downloadingInfo.status !== 'NOT_DOWNLOADED') {
        models.push(model);
      }
    }
    return { models };
  });

  return (
    <View className="w-full gap-4">
      {models.map(model => (
        <ModelDownloadingCard key={model.id} modelId={model.id} />
      ))}

      <ShowWithAnimation when={models.length === 0}>
        <EmptyState
          title="Empty Download List"
          description="No active downloading file"
        />
      </ShowWithAnimation>
    </View>
  );
}
