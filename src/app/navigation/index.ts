import { navigationRef } from './provider'

export {
    navigationRef,
    AppNavigation,
    type RootStackParams
} from './provider'


export const navigation = {
    ...navigationRef,
    goBack() {
        if(navigationRef.canGoBack()) {
            navigationRef.goBack()
        }
    }
} as typeof navigationRef