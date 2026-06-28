import { Confirm } from "@funtools/native-ui/core";
import { Linking } from "react-native";

export async function openLink(link: string) {
    if (!await Linking.canOpenURL(link)) {
        Confirm.error({
            title: 'Unable to Open Link',
            subtitle: 'Your device couldn\'t verify this link. Do you want to try opening it anyway?',
            confirm: {title: 'Try Anyway'},
            onConfirm: () => {
                Linking.openURL(link);
            },
        })

        return;
    }

    Linking.openURL(link);
}