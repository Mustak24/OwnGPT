import { useNavigation as useNavigationBase } from "@react-navigation/native";

export default function useNavigation() {
    const navigation = useNavigationBase()
    return {
        ...navigation,
        goBack: () => {
            if (navigation.canGoBack()) {
                navigation.goBack();
            }
        }
    }
}