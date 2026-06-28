import { ThemeView } from "@funtools/native-ui/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ModelDetailsContextProvider } from "./Context";
import Header from "./UI/Header";
import { ScrollView, View } from "react-native";
import MainSection from "./UI/MainSection";
import Footer from "./UI/Footer";

export default function ModelDetailsScreen() {
    const {top, bottom} = useSafeAreaInsets()
    return (
        <ModelDetailsContextProvider>
            <ThemeView 
                style={{paddingTop: top, paddingBottom: bottom}} 
                className="w-full h-full flex-1 px-2"
            >
                <Header/>

                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    className="flex-1 w-full" 
                >
                    <MainSection/>
                    <View style={{minHeight: bottom + 100}} />
                </ScrollView>

                <Footer/>
            </ThemeView>
        </ModelDetailsContextProvider>
    )
}