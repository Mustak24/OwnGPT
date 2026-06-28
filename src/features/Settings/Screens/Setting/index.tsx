import { ThemeView } from "@funtools/native-ui/core";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./UI/Header";
import Options from "./UI/Options";

export default function SettingScreen() {
    const {top, bottom} = useSafeAreaInsets();
    return (
        <ThemeView className="flex-1 w-full px-2" >
            <View style={{minHeight: top}} />
            <Header/>
            
            <ScrollView
                className="flex-1 w-full"
            >
                <Options/>
                <View style={{minHeight: 120 + bottom}} />
            </ScrollView>
        </ThemeView>
    )
}