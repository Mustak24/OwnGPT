import { ThemeView } from "@funtools/native-ui/core"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Header from "./UI/Header"
import ListingSection from "./UI/ListingSection"

export default function ModelListingScreen() {
    const {top, bottom} = useSafeAreaInsets()
    return (
        <>
            <ThemeView
                style={{paddingTop: top, paddingBottom: bottom}} 
                className="flex-1 px-2"
            >
                <Header/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1 w-full" 
                >
                    <ListingSection/>
                    <View style={{minHeight: bottom + 100}} />
                </ScrollView>
            </ThemeView>
        </>
    )
}