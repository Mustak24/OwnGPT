import { MODEL_DOWNLOADING_INFO, MODEL_INFO } from '@/features/Models/Types';
import { createStore } from '@funtools/store';
import localStorage from '../localStorage';
import fs from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { speedometer } from '@/shared/utils';
import { keepLocalCopy } from '@react-native-documents/picker';

const { useStore, useHandlers } = createStore({
  states: {
    isLoading: false,
    models: localStorage.get('models-metadata') ?? [],
    downloadingInfo: localStorage.get('models-downloading-info'),
    selectedModel: localStorage.get('selected-model'),
    inferenceSettings: localStorage.get('models-inference-settings'),
  },

  syncHandlers: {
    selectModel({ handlers }, model: MODEL_INFO | null) {
      localStorage.set('selected-model', model);
      handlers.selectedModel.set(model);
    },

    updateDownloadingInfo(
      { states, handlers },
      id: string,
      info: Partial<MODEL_DOWNLOADING_INFO>,
    ) {
      const currentInfo = states.downloadingInfo[id];
      const newInfo = { ...currentInfo, ...info };

      handlers.downloadingInfo.update(id, newInfo);

      localStorage.set('models-downloading-info', {
        ...states.downloadingInfo,
        [id]: newInfo,
      });

      if (!states.selectedModel && newInfo.status === 'DOWNLOADED') {
        modelHandlers.selectModel(states.models.find(m => m.id === id) ?? null);
      }
    },

    updateInferenceSettings(
      { states, handlers },
      id: string,
      settings: Partial<typeof states.inferenceSettings[string]>,
    ) {
      const currentSettings = states.inferenceSettings[id];
      const newSettings = { ...currentSettings, ...settings };

      handlers.inferenceSettings.update(id, newSettings);

      localStorage.updateInferenceSettings(id, settings);
    }
  },

  asyncHandlers: {
    async fetchDownloadingInfo() {
      const metadata = await localStorage.getAllMetadata();
      for (let id in metadata) {
        modelHandlers.updateDownloadingInfo(id, metadata[id]);
      }
    },

    async startDownloading({ states, handlers }, model: MODEL_INFO) {
      fs.mkdir(localStorage.getDir(model.id));

      handlers.downloadingInfo.update(model.id, pre => ({
        ...pre,
        status: 'RESUMING',
      }));

      let downloadedBytes = 0;
      if (await fs.exists(localStorage.getTempPath(model.id))) {
        downloadedBytes = (await fs.stat(localStorage.getTempPath(model.id)))
          .size;
      }

      const calculateSpeed = speedometer(downloadedBytes);
      const task = ReactNativeBlobUtil.config({
        path: localStorage.getTempPath(model.id),
        overwrite: false,
      }).fetch('GET', model.downloadUrl, {
        Range: `bytes=${downloadedBytes}-`,
      });

      handlers.downloadingInfo.update(model.id, {
        ...model,
        task,
        downloadedBytes: downloadedBytes,
        totalBytes: model.sizeBytes,
        progress: (downloadedBytes / model.sizeBytes) * 100,
        downloadingSpeedInBytes: calculateSpeed(downloadedBytes),
        status: 'DOWNLOADING',
      });

      await task.progress((received, total) => {
        const receivedBytes = downloadedBytes + Number(received);
        const totalBytes = downloadedBytes + Number(total);

        handlers.downloadingInfo.update(model.id, pre => ({
          ...pre,
          totalBytes,
          downloadedBytes: receivedBytes,
          progress: (receivedBytes / totalBytes) * 100,
          downloadingSpeedInBytes: calculateSpeed(receivedBytes),
        }));
      });

      handlers.downloadingInfo.update(model.id, pre => ({
        ...pre,
        status: 'DOWNLOADED',
        task: null,
      }));

      await fs.moveFile(
        localStorage.getTempPath(model.id),
        localStorage.getFinalPath(model.id, model.fileName),
      );
      await localStorage.writeMetadata(model.id, {
        status: 'DOWNLOADED',
        downloadedBytes: model.sizeBytes,
      });
      if (!states.selectedModel) modelHandlers.selectModel(model);
    },

    async pauseDownloading({ states, handlers }, model: MODEL_INFO) {
      handlers.downloadingInfo.update(model.id, pre => ({
        ...pre,
        status: 'PAUSED',
      }));

      const task = states.downloadingInfo[model.id]?.task;
      if (!task) return;

      await task.cancel(console.log);
      await localStorage.writeMetadata(model.id, {
        status: 'PAUSED',
        downloadedBytes: states.downloadingInfo[model.id].downloadedBytes,
      });

      handlers.downloadingInfo.update(model.id, pre => ({
        ...pre,
        task: null,
        status: 'PAUSED',
      }));
    },

    async deleteModel({ states, handlers }, id: string) {
      const task = states.downloadingInfo[id]?.task;
      handlers.downloadingInfo.update(id, pre => ({
        ...pre,
        status: 'DELETING',
      }));
      if (task) {
        await task.cancel(console.log);
      }

      await localStorage.delete(id);
      handlers.downloadingInfo.update(id, pre => ({
        ...pre,
        task: null,
        status: 'NOT_DOWNLOADED',
        downloadedBytes: 0,
      }));

      if (states.selectedModel?.id === id) {
        modelHandlers.selectModel(null);
        for (let model of states.models) {
          if (model.id === id || states.downloadingInfo[model.id]?.status !== 'DOWNLOADED') continue;
          modelHandlers.selectModel(model);
          break;
        }
      }
    },

    async loadLocalModel({ states }, fileName: string, fileUri: string) {
      const model = states.models.find(m => m.fileName === fileName);
      if (!model) {
        throw Error('Invalid Model Name. No matching model found.');
      }

      const [copiedRes] = await keepLocalCopy({
        files: [{ fileName, uri: fileUri }],
        destination: 'cachesDirectory',
      });

      if (copiedRes.status === 'error') {
        throw Error('Failed to copy file.');
      }

      const destination = localStorage.getFinalPath(model.id, model.fileName);

      if (!(await fs.exists(destination))) {
        await fs.mkdir(localStorage.getDir(model.id));
      }

      await fs.moveFile(copiedRes.localUri, destination);

      await localStorage.writeMetadata(model.id, {
        status: 'DOWNLOADED',
        downloadedBytes: model.sizeBytes,
      });

      modelHandlers.updateDownloadingInfo(model.id, {
        ...model,
        status: 'DOWNLOADED',
        downloadedBytes: model.sizeBytes,
      });
    },
  },
});

const modelHandlers = useHandlers();
modelHandlers.fetchDownloadingInfo();

export { useStore as useModelStore, modelHandlers };
