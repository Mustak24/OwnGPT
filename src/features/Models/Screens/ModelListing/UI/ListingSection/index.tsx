import { ModelCard } from '@/features/Models/Components';
import { useModelStore } from '@/features/Models/Store';
import { View } from 'react-native';
import { Icon, Show, ThemeText } from '@funtools/native-ui/core';
import { PressableView } from '@funtools/native-ui';
import { navigation } from '@/app/navigation';

export default function ListingSection() {
  const { models, downloadingInfo, selectedModel } = useModelStore(store => ({
    models: store.models,
    downloadingInfo: store.downloadingInfo,
    selectedModel: store.selectedModel,
  }));

  return (
    <View className="w-full gap-2">
      <Show when={!!selectedModel}>
        <PressableView
          alpha={100}
          color="primary"
          className="p-4 rounded-xl flex-row items-center justify-between gap-4"
          onPress={() => {
            navigation.navigate('ModelStack', {
              screen: 'DetailsScreen', params: {
                id: selectedModel?.id ?? ''
              }
            })
          }}
        >
          <View>
            <ThemeText textColor={'white'} className="text-lg font-bold">
              {selectedModel?.name}
            </ThemeText>
            <ThemeText
              color="text-secondary"
              className="text-xs"
              textColor={'white'}
              alpha={80}
            >
              RAM: {selectedModel?.ramRequirementGB}
            </ThemeText>
          </View>

          <View className="flex-row items-center gap-2">
            <Icon name="Check" customColor="white" size={18} />
            <ThemeText textColor={'white'} className="text-sm">
              Selected
            </ThemeText>
          </View>
        </PressableView>
      </Show>

      <ThemeText color="text-secondary" className="text-lg font-bold pt-4">
        Available Models
      </ThemeText>

      {models.map(mode => (
        <ModelCard
          key={mode.id}
          color="bg-secondary"
          model={mode}
          downloadingInfo={downloadingInfo[mode.id]}
          onPress={() => {
            navigation.navigate('ModelStack', {
              screen: 'DetailsScreen',
              params: {
                id: mode.id,
              },
            });
          }}
        />
      ))}
    </View>
  );
}
