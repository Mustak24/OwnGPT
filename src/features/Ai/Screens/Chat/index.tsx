import { ThemeView } from "@funtools/native-ui/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { ChatStoreProvider } from "./Store";
import Header from "./UI/Header";
import MainSection from "./UI/Main";
import ChatInput from "./UI/ChatInput";

export default function ChatScreen() {
    return (
        <ChatStoreProvider>
            <ThemeView className="flex-1">
                <SafeAreaView className="flex-1 pt-2 gap-2" >
                    <View className="flex-1 w-full px-2" >
                        <Header/>
                        <MainSection/>
                    </View>
                    <ChatInput/>
                </SafeAreaView>
            </ThemeView>
        </ChatStoreProvider>
    )
}