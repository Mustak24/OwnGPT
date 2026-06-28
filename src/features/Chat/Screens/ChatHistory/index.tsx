import { ThemeView } from "@funtools/native-ui/core";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./UI/Header";
import ListingSection from "./UI/Listing";
import { View } from "react-native";

export default function ChatHistory() {
    return (
        <ThemeView className="flex-1 w-full">
            <SafeAreaView className="flex-1 gap-2 w-full">
                <View className="flex-1 w-full px-2">
                    <Header/>
                    <ListingSection/>
                </View>
            </SafeAreaView>
        </ThemeView>
    )
}