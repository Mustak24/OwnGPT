import { Button, ButtonProps } from '@funtools/native-ui';
import { View } from 'react-native';
import { useModelDetailsContext } from '../../Context';
import {
  modelHandlers,
  useModelStore,
} from '@/features/Models/Store/modelStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, Show } from '@funtools/native-ui/core';
import { pick } from '@react-native-documents/picker';
import { asyncTry } from '@funtools/native-ui/utils';

export default function Footer() {
  const { model, downloadingInfo } = useModelDetailsContext();
  const selectedModel = useModelStore(store => store.selectedModel);
  const { bottom } = useSafeAreaInsets();

  if (selectedModel?.id === model.id) return null;

  const handleLoadModel: ButtonProps['onPress'] = async (
    event,
    { handleState, reset },
  ) => {
    const [pickFile] = await pick({
      allowMultiSelection: false,
      mimeType: ['application/octet-stream', 'application/gguf'],
    });

    if (!pickFile) return;

    if (pickFile.name !== model.fileName) {
      return Alert.error({
        title: 'File Name Mismatch',
        subtitle: `You selected "${pickFile.name}", but this model requires the file to be named exactly "${model.fileName}".`,
      });
    }

    handleState('title', 'Loading Model...');
    handleState('loading', true);

    const [_, error] = await asyncTry(() =>
      modelHandlers.loadLocalModel(pickFile.name!, pickFile.uri),
    );

    reset();
    if (error) {
      return Alert.error({
        title: 'Error',
        subtitle: error.message ?? 'Failed to load model.',
      });
    }
  };

  return (
    <View
      className="flex-row items-center justify-center gap-2"
      style={{ paddingBottom: bottom + 12 }}
    >
      <Show when={downloadingInfo.status === 'NOT_DOWNLOADED'}>
        <Button
          fontSize={14}
          className="flex-1 basis-[180]"
          title="Load Model"
          variant="outlined"
          startIcon="Upload"
          onPress={handleLoadModel}
        />
      </Show>

      <Button
        className="flex-1 basis-[180]"
        variant="solid"
        fontSize={14}
        loading={downloadingInfo.status.endsWith('ING')}
        disabled={downloadingInfo.status === 'RESUMING'}
        color={'primary'}
        startIcon={
          downloadingInfo.status === 'DOWNLOADED'
            ? undefined
            : downloadingInfo.status === 'PAUSED'
            ? 'Play'
            : 'Download'
        }
        title={(() => {
          const status = downloadingInfo.status;
          if (status === 'NOT_DOWNLOADED') return 'Download';
          if (status === 'DOWNLOADED') return 'Use Model';
          if (status === 'RESUMING') return 'Resuming...';
          if (status === 'FAILED') return 'Retry';
          if (status === 'PAUSED')
            return `Resume (${downloadingInfo.progress.toFixed(1)}%)`;
          if (status === 'DOWNLOADING')
            return `Downloading (${downloadingInfo.progress.toFixed(1)}%)`;
          return status;
        })()}
        onPress={() => {
          const status = downloadingInfo.status;
          if (status === 'PAUSED' || status === 'NOT_DOWNLOADED')
            return modelHandlers.startDownloading(model);
          if (status === 'DOWNLOADING')
            return modelHandlers.pauseDownloading(model);
          if (status === 'DOWNLOADED') return modelHandlers.selectModel(model);
          if (status === 'FAILED') return;
        }}
      />
    </View>
  );
}
