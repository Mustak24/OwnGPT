import { ModelDetailsScreen, ModelDownloadsScreen, ModelListingScreen } from "@/features/Models";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export type ModelStackParams = {
    ListingScreen: undefined;
    DetailsScreen: { id: string };
    DownloadScreen: undefined;
}

const Stack = createNativeStackNavigator<ModelStackParams>()

const Screens: Array<Parameters<typeof Stack.Screen>[0]> = [
    { name: 'ListingScreen', component: ModelListingScreen },
    { name: 'DetailsScreen', component: ModelDetailsScreen },
    { name: 'DownloadScreen', component: ModelDownloadsScreen },
]

export function ModelStack() {
    return (
        <Stack.Navigator 
            initialRouteName="ListingScreen" 
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