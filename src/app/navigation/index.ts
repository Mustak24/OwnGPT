import { navigationRef, RootStackParams } from './provider'
import { StackActions } from '@react-navigation/native'

export {
    navigationRef,
    AppNavigation,
    type RootStackParams
} from './provider'


const customServices = {
    goBack() {
        if(navigationRef.canGoBack()) {
            navigationRef.goBack()
        }
    },
    replace<RouteName extends keyof RootStackParams>(
        name: RouteName,
        params: RootStackParams[RouteName]
    ) {
        if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
        }
    },
}

export const navigation = {
    ...navigationRef,
    ...customServices
} as typeof navigationRef & typeof customServices