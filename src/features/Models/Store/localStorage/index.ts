import { createMMKV } from 'react-native-mmkv';
import modelsMetadata from './models-metadata';
import fs from 'react-native-fs';
import {
  MODEL_DOWNLOADING_INFO,
  MODEL_INFO,
  MODEL_STATUS,
} from '@/features/Models/Types';

const storage = createMMKV({ id: 'ai-model-storage' });

if (!storage.contains('models-metadata')) {
  storage.set('models-metadata', JSON.stringify(modelsMetadata));
}

if (!storage.contains('models-downloading-info')) {
  storage.set(
    'models-downloading-info',
    JSON.stringify(
      modelsMetadata.reduce((acc, model) => {
        acc[model.id] = {
          task: null,
          totalBytes: model.sizeBytes,
          downloadedBytes: 0,
          progress: 0,
          downloadingSpeedInBytes: 0,
          status: 'NOT_DOWNLOADED',
        } as MODEL_DOWNLOADING_INFO;
        return acc;
      }, {} as Record<string, MODEL_DOWNLOADING_INFO>),
    ),
  );
}

type KEY_VALUES = {
  'models-metadata': typeof modelsMetadata;
  'selected-model': MODEL_INFO | null;
  'models-downloading-info': Record<string, MODEL_DOWNLOADING_INFO>;
};

export default {
  ...storage,
  set<K extends keyof KEY_VALUES>(key: K, value: KEY_VALUES[K]) {
    return storage.set(key, JSON.stringify(value));
  },

  has(key: keyof KEY_VALUES) {
    return storage.contains(key);
  },

  get<K extends keyof KEY_VALUES>(key: K): KEY_VALUES[K] {
    return JSON.parse(storage.getString(key) ?? 'null');
  },

  rootPath: `${fs.DocumentDirectoryPath}/models`,

  getDir(id: string) {
    return `${this.rootPath}/${id}`;
  },

  getMetadataPath(id: string) {
    return `${this.getDir(id)}/metadata.json`;
  },

  getTempPath(id: string) {
    return `${this.getDir(id)}/download.tmp`;
  },

  getFinalPath(id: string, fileName: string) {
    return `${this.getDir(id)}/${fileName}`;
  },

  async delete(id: string) {
    return await fs.unlink(this.getDir(id));
  },

  async sizeOf(path: string) {
    if (await fs.exists(path)) return (await fs.stat(path)).size;
    return 0;
  },

  async writeMetadata(
    id: string,
    metadata: { status: MODEL_STATUS; downloadedBytes: number },
  ) {
    await fs.writeFile(
      this.getMetadataPath(id),
      JSON.stringify(metadata),
      'utf8',
    );
    const allMetadata = this.get('models-downloading-info');
    allMetadata[id] = {
      ...allMetadata[id],
      ...metadata,
    };
    this.set('models-downloading-info', allMetadata);
  },

  async readMetadata(id: string) {
    const modelMetadataPath = this.getMetadataPath(id);

    const isModelMetadataExist = await fs.exists(modelMetadataPath);
    if (!isModelMetadataExist) return null;

    const modelMetadataContent = await fs.readFile(modelMetadataPath, 'utf8');
    return JSON.parse(modelMetadataContent) as {
      status: MODEL_STATUS;
      downloadedBytes: number;
    };
  },

  async getAllMetadata() {
    const models = this.get('models-metadata') ?? [];
    const metadata = {} as Record<
      string,
      { status: MODEL_STATUS; downloadedBytes: number }
    >;

    for (let model of models) {
      const modelMetadata = await this.readMetadata(model.id);
      if (modelMetadata) {
        metadata[model.id] = modelMetadata;
      }
    }
    return metadata;
  },
} as const;
