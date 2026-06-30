import ReactNativeBlobUtil from "react-native-blob-util";

export type MODEL_STATUS = 'DOWNLOADING' | 'PAUSED' | 'RESUMING' | 'DOWNLOADED' | 'DELETING' | 'FAILED' | 'NOT_DOWNLOADED';

export type MODEL_INFO = {
    id: string;
    name: string;
    description: string;
    recommended: boolean;
    sizeBytes: number;
    ramRequirementGB: number;
    parameters: string;
    quantization: string;
    contextLength: number;
    languages: string[];
    capabilities: string[];
    mobilePerformance: string;
    quality: string;
    downloadUrl: string;
    fileName: string;
}

export type MODEL_DOWNLOADING_INFO = {
    task: ReturnType<typeof ReactNativeBlobUtil.fetch> | null,
    totalBytes: number,
    downloadedBytes: number,
    progress: number,
    downloadingSpeedInBytes: number,
    status: MODEL_STATUS
}

export type MODEL_INFERENCE_SETTINGS = {
    n_predict: number;
    temperature: number;
    top_p: number;
    top_k: number;
    min_p: number;
    repeat_penalty: number;
    frequency_penalty: number;
    presence_penalty: number;
}