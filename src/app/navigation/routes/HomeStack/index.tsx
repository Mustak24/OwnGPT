import ChatScreen from "@/features/Ai/Screens/Chat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export type HomeStackParams = {
    ChatScreen: undefined;
    CreateToneScreen: undefined;
    PdfConvert: { recordId?: string };
    PdfHistory: undefined;
}

const Stack = createNativeStackNavigator<HomeStackParams>()

const Screens: Array<Parameters<typeof Stack.Screen>[0]> = [
    { name: 'ChatScreen', component: ChatScreen },
]

export function HomeStack() {
    return (
        <Stack.Navigator 
            initialRouteName="ChatScreen" 
            screenOptions={{
                headerShown: false
            }}
        >
            {
                Screens.map((screen, index) => (
                    <Stack.Screen key={index} {...screen} />
                ))
            }
        </Stack.Navigator>
    )
}