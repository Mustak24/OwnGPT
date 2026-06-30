import { modelHandlers, useModelStore } from "@/features/Models/Store";
import { Slider, SliderProps } from "@funtools/native-ui";
import { Icon, ShowWithAnimation, ThemeText, ThemeView } from "@funtools/native-ui/core";
import { Fragment } from "react";
import { View } from "react-native";
import { useModelDetailsContext } from "../../Context";
import { MODEL_INFERENCE_SETTINGS } from "@/features/Models/Types";

export default function InferenceSettings() {

    const { model } = useModelDetailsContext();

    const {inferenceSettings, downloadingInfo} = useModelStore(store => {
        return {
            inferenceSettings: store.inferenceSettings[model.id],
            downloadingInfo: store.downloadingInfo[model.id]
        };
    });

    return (
        <ShowWithAnimation 
            containerProps={{className: "w-full"}}
            when={!!inferenceSettings && downloadingInfo.status === 'DOWNLOADED'}
            className="gap-2"
        >
            <View className="flex-row items-center gap-2">
                <Icon name="Settings" size={16} />
                <ThemeText className="text-md font-bold">Inference Settings</ThemeText>
            </View>

            <View className="gap-2" >
                {
                    SETTINGS.map((setting) => (
                        <ThemeView key={setting.key} color='bg-secondary' alpha={30} className="gap-2 p-2 rounded-xl" >
                            <View className="flex-row items-center gap-2" >
                                <View className="flex-1" >
                                    <ThemeText className="text-sm font-semibold capitalize" >
                                        {setting.key.split('_').join(' ')}
                                    </ThemeText>
                                    <ThemeText color="text-secondary" className="text-xs" >{setting.title}</ThemeText>
                                </View>
                                <ThemeView color='primary' alpha={20} className="px-2 py-1 rounded-lg" >
                                    <ThemeText color="primary" className="text-xs" >
                                        {inferenceSettings[setting.key]}
                                    </ThemeText>
                                </ThemeView>
                            </View>

                            <Slider
                                height={4}
                                rounded={4}
                                thumbProps={{size: 12, rounded: 12, borderWidth: 0}}
                                step={setting.step}
                                minmax={setting.minmax}
                                value={inferenceSettings[setting.key]}
                                onSelectValue={(value) => {
                                    modelHandlers.updateInferenceSettings(model.id, {
                                        [setting.key]: value
                                    });
                                }}
                                renderLabel={value => (
                                    <ThemeView color='bg-secondary' className="px-2 py-1 rounded-lg" >
                                        <ThemeText className='text-xs' >{value}</ThemeText>
                                    </ThemeView>
                                )}
                            />
                            
                            <ThemeText color="text-secondary" className="text-xs" >{setting.description}</ThemeText>
                        </ThemeView>
                    ))
                }
            </View>
        </ShowWithAnimation>
    )
}


const SETTINGS: Array<{
    key: keyof MODEL_INFERENCE_SETTINGS;
    title: string;
    description: string;
} & SliderProps> = [
    {
        key: "n_predict",
        title: "Max Generation Tokens",
        description: "The strict cap threshold monitoring the absolute maximum tokens to be produced by a single execution call.",
        step: 1,
        minmax: [1, 2048],
    },
    {
        key: "temperature",
        title: "Sampling Temperature",
        description: "Creativity controls mapping deterministic text choices (0.0) up to wild, highly random text ranges (2.0).",
        step: 0.1,
        minmax: [0.0, 2.0],
    },
    {
        key: "top_p",
        title: "Nucleus Sampling (Top P)",
        description: "Filters output generation selection strictly down to tokens within the target cumulative probability percentage range.",
        step: 0.1,
        minmax: [0.0, 1.0],
    },
    {
        key: "top_k",
        title: "Top K Vocabulary Limit",
        description: "A solid integer restraint restricting active text token choice pools strictly to the top K ranking items.",
        step: 1,
        minmax: [1, 200],
    },
    {
        key: "min_p",
        title: "Minimum Probability (Min P)",
        description: "Discards options scoring beneath a relative scaling probability benchmark compared against the leading option.",
        step: 0.1,
        minmax: [0.0, 1.0],
    },
    {
        key: "repeat_penalty",
        title: "Sequence Repetition Penalty",
        description: "Applies math penalization modifiers to prevent the core generation pipeline from looping vocabulary items.",
        step: 0.1,
        minmax: [0.0, 2.0],
    },
    {
        key: "frequency_penalty",
        title: "Frequency Usage Penalty",
        description: "Applies proportional restrictions against vocabulary items matching against their historical runtime totals.",
        step: 0.1,
        minmax: [0.0, 2.0],
    },
    {
        key: "presence_penalty",
        title: "Presence History Penalty",
        description: "Applies a linear static penalization penalty to words simply for existing at least once inside history paths.",
        step: 0.1,
        minmax: [0.0, 2.0],
    },
]