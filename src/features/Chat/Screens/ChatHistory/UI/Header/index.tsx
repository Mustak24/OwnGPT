import { chatHandlers } from "@/features/Chat/Store";
import { EntityHeader } from "@/shared/components";
import { useNavigation } from "@/shared/hooks";
import { Button } from "@funtools/native-ui";
import { View } from "react-native";

export default function Header() {
    const navigation = useNavigation();

    function handleOpenNewChat() {
        chatHandlers.newChat();
        navigation.navigate('HomeStack', {
            screen: 'ChatScreen'
        })
    }

    return (
        <EntityHeader 
            label="Chat History"
        >
            <View className="flex-1 flex-row items-center justify-end" >
                <Button
                    height={32}
                    title="New Chat"
                    startIcon="Plus"
                    rounded={100}
                    onPress={handleOpenNewChat}
                />
            </View>
        </EntityHeader>
    )
}