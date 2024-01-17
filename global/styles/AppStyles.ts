import {Platform, StyleSheet} from "react-native";
import {AppColors} from "./AppColors";

export const AppStyles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: AppColors.bgSlate50,
        marginTop: Platform.OS === "android" ? 30 : 0 
    }
})
