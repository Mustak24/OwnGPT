import { createNavigationContainerRef, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStack, HomeStackParams, ModelStack, ModelStackParams, SettingStack, SettingStackParams } from "../routes";

// Add this at the bottom of your types.ts file
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}


export type RootStackParams = {
    HomeStack: NavigatorScreenParams<HomeStackParams>;
    SettingStack: NavigatorScreenParams<SettingStackParams>;
    ModelStack: NavigatorScreenParams<ModelStackParams>;
}

const Stack = createNativeStackNavigator<RootStackParams>();

const Screens: Array<Parameters<typeof Stack.Screen>[0]> = [
    { name: 'HomeStack', component: HomeStack },
    { name: 'SettingStack', component: SettingStack },
    { name: 'ModelStack', component: ModelStack },
]


export const navigationRef = createNavigationContainerRef<RootStackParams>();

export function AppNavigation() {
    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator 
                initialRouteName="HomeStack" 
                screenOptions={{headerShown: false, animation: 'fade'}} 
            >
                {
                    Screens.map((screen, index) => (
                        <Stack.Screen key={index} {...screen} />
                    ))
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}