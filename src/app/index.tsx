import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigation } from "./navigation";
import { ThemeView } from "@funtools/native-ui/core";
import { FuntoolsNativeUIProvider } from "@funtools/native-ui";

export default function App() {
    return (
        <SafeAreaProvider className="flex-1 w-full h-full" >
            <FuntoolsNativeUIProvider>
                <ThemeView className="flex-1 w-full h-full" >
                    <AppNavigation/>
                </ThemeView>
            </FuntoolsNativeUIProvider>
        </SafeAreaProvider>
    )
}