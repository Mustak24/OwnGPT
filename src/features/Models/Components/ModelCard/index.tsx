import { PressableView, PressableViewProps, ProgressBar } from "@funtools/native-ui";
import { Icon, Show, ThemeText } from "@funtools/native-ui/core";
import { View } from "react-native";
import { MODEL_DOWNLOADING_INFO, MODEL_INFO } from "../../Types";
import { formatBytes } from "@/shared/utils";

type Props = {
    model: MODEL_INFO | null;
    downloadingInfo: MODEL_DOWNLOADING_INFO | null;
} & PressableViewProps;

export default function ModelCard({ model, downloadingInfo, ...props }: Props) {
    if(!model) return null;
    if(!downloadingInfo) return null;
    
    return (
        <PressableView
            {...props}
            className={"p-4 gap-1 rounded-xl " + props.className} 
        >
            <View className="flex-row items-center justify-between gap-2" >
                <View>
                    <ThemeText className="text-lg font-bold" >{model.name}</ThemeText>
                    <ThemeText color="text-secondary" className="text-xs" >
                        {(() => {
                            const status = downloadingInfo.status;
                            if(status === 'NOT_DOWNLOADED') return `SIZE: ${formatBytes(model.sizeBytes)}`;
                            if(status === 'DOWNLOADING') return `Progress: ${downloadingInfo?.progress?.toFixed(2) ?? 0}%`
                            if(status === 'PAUSED') return 'Downloading Paused'
                            return status;
                        })()}
                    </ThemeText>
                </View>

                <Icon
                    name="ChevronRight" size={20}
                />
            </View>

            <Show 
                when={downloadingInfo.status === 'DOWNLOADING'}
            >
                <ProgressBar 
                    progressColor={downloadingInfo.status === 'FAILED' ? 'error' : 'success'} 
                    progress={downloadingInfo?.progress ?? 0} 
                />
            </Show>
        </PressableView>
    )
}