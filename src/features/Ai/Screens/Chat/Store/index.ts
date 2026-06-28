import { createStoreProvider } from "@funtools/store";

const { useStore, useHandlers, Provider } = createStoreProvider({
    states: {
        chat: [] as {
            id: string;
            text: string;
            isUser: boolean;
        }[],
    }
})

export {
    useStore as useChatStore,
    useHandlers as useChatHandlers,
    Provider as ChatStoreProvider
}