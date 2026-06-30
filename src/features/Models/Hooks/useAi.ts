import { useEffect, useRef } from "react";
import { initLlama, LlamaContext, TokenData } from "llama.rn";
import DeviceInfo from "react-native-device-info";
import { useModelStore } from "../Store";
import localStorage from "../Store/localStorage";

type UseAiOptions = {
    systemPrompt?: string;
    messages?: Array<{role: 'system' | 'user' | 'assistant', message: string}>
}

export default function useAi({
    systemPrompt = DEFAULT_PROMPT
}: UseAiOptions = {}) {
    const context = useRef<LlamaContext | null>(null);
    const model = useModelStore(store => store.selectedModel);

    async function initContext(configs?: Omit<Parameters<typeof initLlama>[0], 'model'>) {
        context.current = null;
        if(!model) {
            throw Error('Model is not loaded. Please load a model to continue')
        }

        const totalRam = (await DeviceInfo.getTotalMemory().catch(() => 4 * 1024 ** 3)) / (1024 ** 3);
        const usedRam = (await DeviceInfo.getUsedMemory().catch(() => 2 * 1024 ** 3)) / (1024 ** 3);
        const availableRam = totalRam - usedRam;
        
        const ctx = (() => {
            if(availableRam <= 2) return 512;
            if(availableRam <= 4) return 1024;
            if(availableRam <= 6) return 2048;
            if(availableRam <= 8) return 4096;
            return 8192;
        })();

        // const gpuLayers = totalRam < 6 ? 0 : 16;
        const cpuThreads = totalRam <= 8 ? 4 : 8;


        context.current = await initLlama({
            ...configs,
            n_ctx: ctx,
            n_parallel: 2,
            n_threads: cpuThreads,
            // n_gpu_layers: gpuLayers,
            model: localStorage.getFinalPath(model?.id, model?.fileName),
        });
    }

    async function releaseContext() {
        await context.current?.release();
        context.current = null;
    }

    async function generate(prompt: string, callback?: (content: TokenData) => void, messages: Array<{role: 'system' | 'user' | 'assistant', message: string}> = []) {
        if (!context.current) return;

        const res = await context.current.completion({
            messages: [
                {role: 'system', content: systemPrompt},
                ...(messages.length < 20 ? messages : messages.slice(-20)).map(m => ({
                    role: m.role, content: m.message
                })),
                {role: 'user', content: prompt}
            ],
        }, callback);

        return res;
    }

    async function generateChatName(query: string) {
        if(!context.current) return;
        
        const { text } = await context.current.completion({
            messages: [
                {role: 'system', content: NAME_GENRATION_PROMPT},
                {role: 'user', content: query}
            ],
            n_predict: 20,
            temperature: 0.0,
            stop: ['\n', 'User:']
        });

        return text;
    } 

    useEffect(() => {
        initContext();
        return () => {
            releaseContext();
        }
    }, [model?.id])

    return {
        generate,
        generateChatName
    }
}


const DEFAULT_PROMPT = `
    You are an expert, privacy-focused Local AI Assistant running entirely on the user's local machine by using OwnGPT application. Your primary goal is to provide high-utility, accurate, and direct assistance without unnecessary fluff.

    CRITICAL OPERATIONAL RULES:
    1. Local Context: You run completely offline. Never assume you have live internet access unless the user explicitly provides text data or logs to analyze.
    2. Directness First: Answer the user's question immediately in the first sentence. Avoid conversational filler like "Sure, I can help with that" or "Here is the information you requested."
    3. Absolute Honesty: If you do not know the answer or lack the context to solve a problem, state it plainly. Never hallucinate details.
    4. Privacy & Safety: Never suggest uploading sensitive local data, API keys, or personal files to external cloud services. Suggest secure, local alternatives first.

    TONE AND STYLE:
    - Speak like an efficient, highly capable engineering peer.
    - Keep your tone helpful, professional, and slightly casual but concise.
    - Use markdown formatting (bolding, headers, bullet points) extensively to ensure your responses are highly scannable.
    - Keep sentences short and punchy. Avoid dense paragraphs.
`.split(' ').map(word => word.trim()).join(' ');


const NAME_GENRATION_PROMPT = `
    You are a precise, single-purpose utility designed to generate a short, clean, and highly descriptive title for a chat thread based on the user's initial message.

    CRITICAL RULES:
    1. Output ONLY the plain text of the final title. 
    2. Do NOT include quotation marks, markdown formatting, colons, introduction text, or explanations.
    3. Maximum length: 4 words. Keep it strictly under 30 characters.
    4. Capitalize Title Case (e.g., "React Native Fix" not "react native fix").
    5. If the user's query is a simple greeting or lacks substance, output "New Conversation".

    EXAMPLES:
    User: "how do I fix a null activity error in android when opening a modal"
    Output: Android Activity Error Fix

    User: "give me a chocolate chip cookie recipe that uses brown butter"
    Output: Brown Butter Cookies

    User: "hello there, can you help me"
    Output: New Conversation

`.split(' ').map(word => word.trim()).join(' ');