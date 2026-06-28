import { useEffect, useRef } from "react";
import { initLlama, LlamaContext, TokenData } from "llama.rn";
import { modelLocalStorage, useModelStore } from "@/features/Models";
import DeviceInfo from "react-native-device-info";

export default function useAi() {
    const context = useRef<LlamaContext | null>(null);
    const model = useModelStore(store => store.selectedModel);
    // const activeTone = useToneStore(store => {
    //     const tones = [...store.builtInTones, ...store.customTones];
        
    //     for(let i=0; i<tones.length; i++) {
    //         if(tones[i].id === store.selectedToneId) return tones[i];
    //     }
        
    //     return tones[0];
    // });

    async function initContext() {
        context.current = null;
        if(!model) return;

        const totalRam = (await DeviceInfo.getTotalMemory().catch(() => 4 * 1024 ** 3)) / (1024 ** 3);
        
        const ctx = (() => {
            if(totalRam <= 4) return 512;
            if(totalRam <= 8) return 1024;
            if(totalRam <= 12) return 2048;
            return 4096;
        })();

        const gpuLayers = totalRam < 6 ? 0 : 16;
        const cpuThreads = totalRam <= 8 ? 4 : 8;


        context.current = await initLlama({
            model: modelLocalStorage.getFinalPath(model?.id, model?.fileName),
            n_ctx: ctx,
            // n_gpu_layers: gpuLayers,
            n_threads: cpuThreads,
        });

        console.log(context.current.reasonNoGPU, context.current.gpu)
    }

    async function releaseContext() {
        await context.current?.release();
        context.current = null;
    }

    async function generate(prompt: string, callback?: (content: TokenData) => void) {
        if (!context.current) return;

        let tokens: string[] = [];
        await context.current.completion({
            messages: [
                // {role: 'system', content: activeTone.systemPrompt},
                {role: 'user', content: prompt}
            ],
        }, callback);

        return tokens.join(' ');
        
    }

    useEffect(() => {
        initContext();
        return () => {
            releaseContext();
        }
    }, [model?.id])

    return {generate}
}