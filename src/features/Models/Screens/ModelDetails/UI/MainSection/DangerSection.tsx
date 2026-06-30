import { Confirm, Icon, ShowWithAnimation, ThemeText } from "@funtools/native-ui/core";
import { useModelDetailsContext } from "../../Context";
import { Button } from "@funtools/native-ui";
import { modelHandlers } from "@/features/Models";
import { Alert, View } from "react-native";
import { navigation, navigationRef } from "@/app/navigation";

export default function DangerSection() {
    const { model, downloadingInfo } = useModelDetailsContext();
    return (
        <ShowWithAnimation
            containerProps={{className: "w-full"}}
            when={downloadingInfo.status === 'DOWNLOADED'}
            className="gap-2 items-start"
        >
            <View className="flex-row items-center gap-2" >
                <Icon color="error" name="AlertTriangle" size={16} />
                <ThemeText color='error' className="text-md font-bold" >Danger Zone</ThemeText>
            </View>

            <ThemeText color='text-secondary' className="text-xs" >
                Deleting this model will remove it from your device and you will need to re-download it if you want to use it again. This action cannot be undone.
            </ThemeText>
            
            <Button 
                startIcon="Trash2"
                title="Delete Model"
                color="error"
                variant="solid"
                onPress={() => {
                    Confirm.error({
                        title: "Delete Model",
                        subtitle: "Are you sure you want to delete this model? This action cannot be undone.",
                        confirm: {title: "Delete"},
                        onConfirm: () => {
                            modelHandlers.deleteModel(model.id);
                            navigation.replace('ModelStack', {screen: 'ListingScreen'});
                        }
                    })
                }}
            />
        </ShowWithAnimation>
    )
}