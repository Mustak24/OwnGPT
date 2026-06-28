import { View } from "react-native";
import AccountOptions from "./Account";
import AIModelOptions from "./AiModels";
import AppOptions from "./App";

export default function Options() {
    return (
        <View className="w-full gap-6" >
            <AccountOptions/>
            <AIModelOptions/>
            <AppOptions/>
        </View>
    )
}