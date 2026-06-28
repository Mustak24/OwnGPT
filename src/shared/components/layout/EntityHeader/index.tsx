import { Icon, RippleContainer, ThemeText, ThemeView, ThemeViewProps } from "@funtools/native-ui/core";
import { useNavigation } from "@/shared/hooks";


export type EntityHeaderProps = ThemeViewProps & {
    label: string
}

export function EntityHeader({ label, children, className, ...props }: EntityHeaderProps) {
    const navigation = useNavigation();

    return (
        <ThemeView {...props} className={`w-full py-5 flex-row items-center gap-2 ${className}`} >
            <RippleContainer 
                className="flex-row items-center gap-1 rounded-lg pr-2" 
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Icon name="ChevronLeft" strokeWidth={3} size={20} />
                <ThemeText className='text-xl font-bold'>
                    {label}
                </ThemeText>
            </RippleContainer>

            {children}
        </ThemeView>
    )
}