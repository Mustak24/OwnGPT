import {ChatScreen, ChatHistoryScreen} from '@/features/Chat/Screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type HomeStackParams = {
  ChatScreen: undefined;
  ChatHistory: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParams>();

const Screens: Array<Parameters<typeof Stack.Screen>[0]> = [
  { name: 'ChatScreen', component: ChatScreen },
  { name: 'ChatHistory', component: ChatHistoryScreen }

];

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="ChatScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {Screens.map((screen, index) => (
        <Stack.Screen key={index} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
