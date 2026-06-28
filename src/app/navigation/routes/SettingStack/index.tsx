import { SettingScreen } from '@/features/Settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type SettingStackParams = {
  Setting: undefined;
};

const Stack = createNativeStackNavigator<SettingStackParams>();

const Screens: Array<Parameters<typeof Stack.Screen>[0]> = [
  { name: 'Setting', component: SettingScreen },
  // { name: 'AiListing', component: AiListingScreen },
  // { name: 'AiDownload', component: AiDownloadScreen },
];

export function SettingStack() {
  return (
    <Stack.Navigator
      initialRouteName="Setting"
      screenOptions={{ headerShown: false }}
    >
      {Screens.map((screen, index) => (
        <Stack.Screen key={index} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
