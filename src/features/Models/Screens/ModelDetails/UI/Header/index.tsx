import { EntityHeader } from '@/shared/components';
import { useModelDetailsContext } from '../../Context';
import { View } from 'react-native';
import { IconButton } from '@funtools/native-ui';
import { Show } from '@funtools/native-ui/core';
import { modelHandlers } from '@/features/Models/Store';

export default function Header() {
  const { model, downloadingInfo } = useModelDetailsContext();
  return (
    <EntityHeader
      label={model.name}
      className="flex-row items-center justify-between"
    >
      <View className="flex-row items-center gap-8">
        <Show when={downloadingInfo.status === 'DOWNLOADED'}>
          <IconButton
            icon="Trash2"
            color="error"
            variant="solid"
            iconSize={16}
            onPress={() => modelHandlers.deleteModel(model.id)}
          />
        </Show>
      </View>
    </EntityHeader>
  );
}
