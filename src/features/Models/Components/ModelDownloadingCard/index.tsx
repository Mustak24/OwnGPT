import { useWindowDimensions, View } from "react-native";
import { Confirm, Icon, Show, ShowWithAnimation, ThemeText } from "@funtools/native-ui/core";
import { Button, IconButton, PressableView, ProgressBar, SpinnerLoader } from "@funtools/native-ui";
import { formatBytes, formatSeconds } from "@/shared/utils";
import { modelHandlers, useModelStore } from "@/features/Models/Store";


export type DownloadCardProps = {
    modelId: string;
}

export default function DownloadCard({modelId}: DownloadCardProps) {
    const {model, downloadingInfo} = useModelStore(store => {
        const model = store.models.find(m => m.id === modelId)!;
        return {
            model, 
            downloadingInfo: store.downloadingInfo[model.id]
        }
    });
    
    const { width } = useWindowDimensions();
    
    return (
        <PressableView
            className="w-full p-4 rounded-xl gap-2"
        >
            <View className="flex-row items-center justify-between gap-8" >
                <View className="flex-1 flex-row items-center gap-2" >
                    <Icon name="FileText" />
                    <ThemeText>{model.fileName}</ThemeText>
                </View>

                <View className="flex-row items-center" >
                    <IconButton
                        size={32}
                        variant="text"
                        iconSize={16}
                        loading={downloadingInfo.status === 'RESUMING'}
                        disabled={downloadingInfo.status === 'DOWNLOADED' || downloadingInfo.status === 'FAILED'}

                        icon={(() => {
                            const status = downloadingInfo.status;
                            if(status === 'DOWNLOADED') return 'Folder';
                            if(status === 'FAILED') return 'RefreshCcw';
                            if(status === 'DOWNLOADING') return 'Pause';
                            return 'Play';
                        })()}

                        onPress={() => {
                            const status = downloadingInfo.status;
                            if(status === 'DOWNLOADED') return ;
                            if(status === 'FAILED') return ;
                            if(status === 'DOWNLOADING') return modelHandlers.pauseDownloading(model);
                            return modelHandlers.startDownloading(model);
                        }}
                    />

                    <IconButton
                        size={32}
                        color="error"
                        variant="text"
                        iconSize={16}
                        icon="Trash2"
                        loading={downloadingInfo.status === 'DELETING'}
                        disabled={downloadingInfo.status === 'DOWNLOADING' || downloadingInfo.status === 'RESUMING'}
                        onPress={() => {
                            Confirm.error({
                                title: "Delete Model",
                                subtitle: "Are you sure you want to delete this model? This action cannot be undone.",
                                confirm: {title: 'Yes, Delete'},
                                onConfirm: () => modelHandlers.deleteModel(model.id)
                            })
                        }}
                    />
                </View>
            </View>

            <Show when={downloadingInfo.status !== 'DOWNLOADED'} >
                <View>
                    <View className="flex-row items-center justify-between gap-2" >
                        <ThemeText color="text-secondary" className="text-xs" >
                            {formatBytes(downloadingInfo.downloadedBytes)} / {formatBytes(downloadingInfo.totalBytes)}
                        </ThemeText>
                        <ThemeText color="text-secondary" className="text-xs" >
                            Downloaded: {downloadingInfo.progress.toFixed(2)}%
                        </ThemeText>
                    </View>

                    <ProgressBar
                        height={6} 
                        progress={downloadingInfo.progress} 
                        progressColor={downloadingInfo.status === 'FAILED' ? 'error' : 'success'} 
                    />
                </View>
            </Show>
            
            <Show when={width > 480} 
                otherwise={
                    <View className="gap-1" >
                        {
                            [
                                {
                                    when: true,
                                    label: 'Status',
                                    value: downloadingInfo.status,
                                    icon: (
                                        <Show when={!downloadingInfo.status.endsWith('ING')} 
                                            otherwise={<SpinnerLoader size={12} />}
                                        >
                                            <Icon name="Download" size={12} />
                                        </Show>
                                    )
                                },
                                {
                                    when: downloadingInfo.status === 'DOWNLOADING',
                                    label: 'Time',
                                    value: (() => {
                                        const speed = downloadingInfo.downloadingSpeedInBytes ?? 0;
                                        if(speed === 0) return 'N/A';
                                        
                                        const remainingBytes = (downloadingInfo.totalBytes ?? 0) - (downloadingInfo.downloadedBytes ?? 0);
                                        return formatSeconds(remainingBytes / speed) + ' remaining';
                                    })(),
                                    icon: <Icon name="Clock" size={12} />
                                },
                                {
                                    when: downloadingInfo.status === 'DOWNLOADING',
                                    label: 'Speed',
                                    value: formatBytes(downloadingInfo.downloadingSpeedInBytes) + '/s',
                                    icon: <Icon name="Wifi" size={12} />
                                }
                            ].map(({label, value, icon, when}, index) => (
                                <ShowWithAnimation 
                                    key={index} 
                                    when={when} 
                                    containerProps={{className: 'rounded-lg p-2'}}
                                    className="flex-row items-center gap-2"
                                >
                                    <ThemeText color="text-secondary" className="flex-1 pr-2 text-xs font-semibold" >
                                        {label}
                                    </ThemeText>
                                    <ThemeText className="text-xs">
                                        {value}
                                    </ThemeText>
                                    {icon}
                                </ShowWithAnimation>
                            ))
                        }
                    </View>
                }    
            >
                <View className="flex-row items-center flex-wrap gap-1" >
                    <Button
                        variant="outlined"
                        startIcon="Download"
                        fontSize={14}
                        title={downloadingInfo.status}
                        loading={downloadingInfo.status.endsWith('ING')}
                        color={downloadingInfo.status === 'FAILED' ? 'error' : 'text-secondary'}
                        disabled={true}
                    />

                    <ShowWithAnimation 
                        when={downloadingInfo.status === 'DOWNLOADING'}
                        >
                        <Button
                            fontSize={14}
                            startIcon="Clock"
                            variant="outlined"
                            title={(() => {
                                const speed = downloadingInfo.downloadingSpeedInBytes ?? 0;
                                if(speed === 0) return 'N/A';
                                
                                const remainingBytes = (downloadingInfo.totalBytes ?? 0) - (downloadingInfo.downloadedBytes ?? 0);
                                return formatSeconds(remainingBytes / speed) + ' remaining';
                            })()}
                            disabled={true}
                        />
                    </ShowWithAnimation>
                    
                    <ShowWithAnimation 
                        when={downloadingInfo.status === 'DOWNLOADING'}
                        >
                        <Button
                            fontSize={14}
                            startIcon="Wifi"
                            title={formatBytes(downloadingInfo.downloadingSpeedInBytes) + '/s'}
                            disabled={true}
                            />
                    </ShowWithAnimation>
                </View>
            </Show>
        </PressableView>
    )
}