import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, ButtonProps, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";

type IconButtonProps = ButtonProps & {
    title: string;
    iconName: any;
    hasBackground?: boolean;
    buttonTextColor: { dark: string; light: string };
};

export function IconButton({ title, iconName, hasBackground, buttonTextColor, ...otherProps }: IconButtonProps) {
    const colorScheme = useColorScheme() ?? 'light';
    return (
        <TouchableOpacity style={[styles.buttonStyle,
        hasBackground ? {
            backgroundColor: `${buttonTextColor[colorScheme]}25`,
        } : null]}
            onPress={otherProps.onPress}>
            <MaterialCommunityIcons
                name={iconName}
                color={buttonTextColor[colorScheme]}
                size={24}
            />
            <ThemedText type="defaultSemiBold" lightColor={buttonTextColor['light']} darkColor={buttonTextColor['dark']}>
                {title}
            </ThemedText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        borderRadius: 8,
        padding: 8
    }
})