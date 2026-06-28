import { navigationRef } from "@/app/navigation";
import { useNavigation as useNavigationBase } from "@react-navigation/native";

export default function useNavigation() {
    const navigation = useNavigationBase()
    return {
        // ...navigation,
        ...navigationRef,
        goBack: () => {
            if (navigationRef.canGoBack()) {
                navigationRef.goBack();
            }
        }
    }
}