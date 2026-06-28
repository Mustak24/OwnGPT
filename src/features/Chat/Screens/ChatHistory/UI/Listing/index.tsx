import { navigation } from "@/app/navigation";
import { chatHandlers, useChatStore } from "@/features/Chat/Store";
import { EmptyState, IconButton, PressableView } from "@funtools/native-ui";
import { ThemeText } from "@funtools/native-ui/core";
import { FlatList, View } from "react-native";

export default function ListingSection() {
    const chats = useChatStore(store => store.chats);

    function handleOpenChat(chatId: string) {
        chatHandlers.openChat(chatId);
        navigation.navigate('HomeStack', {
            screen: 'ChatScreen'
        })
    }

    return (
        <FlatList
            data={chats}
            contentContainerClassName="gap-2"
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <PressableView 
                className="flex-row items-center justify-between px-2 py-1 rounded-lg" 
                    onPress={() => handleOpenChat(item.id)}
                >
                    <ThemeText>
                        {item.name}
                    </ThemeText>

                    <IconButton
                        variant="text"
                        color="text"
                        icon="EllipsisVertical"
                        size={28}
                    />
                </PressableView>
            )}

            ListEmptyComponent={
                <EmptyState
                    title="No Chat History"
                    description="Start a new chat to get started"
                />
            }
        />
    )
}