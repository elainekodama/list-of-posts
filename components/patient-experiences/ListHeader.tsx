import React from "react";
import { patientPostStrings } from "@/constants/Strings";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { IconButton } from "../IconButton";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

type ListHeaderProps = {
    filterValue1: string | undefined,
    filterValue2: string | undefined,
    filters1: { label: string, value: string }[];
    filters2: { label: string, value: string }[];
    filter1ChangeHandler: (item: any) => void;
    filter2ChangeHandler: (item: any) => void;
    clearFilterHandler: () => void;
}
export function ListHeader({ filters1, filters2, filterValue1, filterValue2, filter1ChangeHandler, filter2ChangeHandler, clearFilterHandler }: ListHeaderProps) {
    return (
        <View>
            <ThemedText
                style={styles.marginVertical}
                type="pageHeader"
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}>
                {patientPostStrings.patientExperience}
            </ThemedText>
            <View style={styles.marginVertical}>
                <View style={styles.filterContainer}>
                    <View style={{
                        flex: 1
                    }}>
                        <ThemedText type="defaultSemiBold">
                            {patientPostStrings.ageGroup}
                        </ThemedText>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.dropdownTextStyle}
                            selectedTextStyle={styles.dropdownTextStyle}
                            mode="auto"
                            data={filters1}
                            labelField="label"
                            valueField="value"
                            placeholder={patientPostStrings.selectAge}
                            value={filterValue1}
                            onChange={filter1ChangeHandler}
                            activeColor="#4933FF25"
                        />
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <ThemedText type="defaultSemiBold">
                            {patientPostStrings.gender}
                        </ThemedText>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.dropdownTextStyle}
                            selectedTextStyle={styles.dropdownTextStyle}
                            mode="auto"
                            data={filters2}
                            labelField="label"
                            valueField="value"
                            placeholder={patientPostStrings.selectGender}
                            value={filterValue2}
                            onChange={filter2ChangeHandler}
                            activeColor={`${Colors.light.purpleAccent}25`}
                        />
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <IconButton
                            title={""}
                            iconName="trash-can-outline"
                            buttonTextColor={{
                                dark: Colors.dark.purpleAccent,
                                light: Colors.light.purpleAccent
                            }}
                            onPress={clearFilterHandler} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        width: "100%",
        gap: 24
    },
    marginVertical: {
        marginVertical: '2%'
    },
    dropdown: {
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginBottom: 14,
    },
    dropdownTextStyle: {
        fontSize: 16,
        marginVertical: 8,
    },
})