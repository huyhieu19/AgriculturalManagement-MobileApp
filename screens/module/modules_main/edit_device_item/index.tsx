import {
  View,
  Text,
  Pressable,
  Alert,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppColors } from "../../../../global/styles/AppColors";
import { editDevice } from "../../../../network/apis";
import { IDeviceOnModule, IDeviceOnZone } from "../../../../types/device.type";
import { RootStackParamList } from "../../../../AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dropdown } from "react-native-element-dropdown";

type ParamList = {
  device: IDeviceOnModule | IDeviceOnZone;
};

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditDeviceScreen"
>;

const dataAction = [
  { label: "Mở", value: "true" },
  { label: "Đóng", value: "false" },
];
const datUsed = [
  { label: "Sử dụng", value: "true" },
  { label: "Không sử dụng", value: "false" },
];
const dataAuto = [
  { label: "Tự động", value: "true" },
  { label: "Thủ công", value: "false" },
];

export const EditDeviceScreen = () => {
  const route = useRoute<RouteProp<ParamList, "device">>();
  const navigation = useNavigation<ScreenNavigationProp>();
  const [isFocusAction, setFocusAction] = useState<boolean>(false);
  const [isFocusAuto, setFocusAuto] = useState<boolean>(false);
  const [isFocusUsed, setFocusUsed] = useState<boolean>(false);

  const [name, setName] = useState(route.params.name);
  const [description, setDescription] = useState(route.params.description);

  const [isAction, setIsAction] = useState(route.params.isAction);
  const [isAuto, setIsAuto] = useState(route.params.isAuto);
  const [isUsed, setIsUsed] = useState(route.params.isUsed);

  const GoBack = () => {
    navigation.goBack();
  };

  const handleEditDevice = async () => {
    // Perform API request to add new item
    try {
      const res = await editDevice({
        id: route.params.id,
        name: name,
        description: description,
        isAction: isAction,
        isUsed: isUsed,
        isAuto: isAuto,
      });
      if (res.data.Data) {
        Alert.alert("Thành công", "Thành công cập nhật thết bị", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        GoBack();
      } else {
        Alert.alert("Lỗi", `Không thể cập nhật thiết bị`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (error) {
      Alert.alert("Lỗi", `${error}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      GoBack();
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: AppColors.primaryColor,
          paddingVertical: 12,
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            left: 20,
          }}
          onPress={GoBack}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text style={{ fontSize: 18, color: "white" }}>Chỉnh sửa thiết bị</Text>
      </View>

      <View>
        <View style={styles.container}>
          <Text style={styles.label}>Tên thiết bị:</Text>
          <TextInput
            style={styles.dropdown}
            onChangeText={(e) => setName(e)}
            value={name ?? ""}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Chi tiết:</Text>
          <TextInput
            style={styles.dropdown}
            onChangeText={(e) => setDescription(e)}
            value={description ?? ""}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Tự động:</Text>
          <Dropdown
            style={[styles.dropdown, isFocusAction && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataAuto}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={isAuto ? "true" : "false"}
            placeholder={!isFocusAction ? "Select item" : "..."}
            searchPlaceholder="Search..."
            onFocus={() => setFocusAction(true)}
            onBlur={() => setFocusAction(false)}
            onChange={(item) => {
              setIsAuto(item.value === "true");
              setFocusAction(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocusAction ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Hoạt động: </Text>
          <Dropdown
            style={[styles.dropdown, isFocusAuto && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataAction}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusAuto ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={isAction ? "true" : "false"}
            onFocus={() => setFocusAuto(true)}
            onBlur={() => setFocusAuto(false)}
            onChange={(item) => {
              setIsAction(item.value === "true");
              setFocusAuto(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocusAuto ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Sử dụng: </Text>
          <Dropdown
            style={[styles.dropdown, isFocusUsed && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={datUsed}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusUsed ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={isUsed ? "true" : "false"}
            onFocus={() => setFocusUsed(true)}
            onBlur={() => setFocusUsed(false)}
            onChange={(item) => {
              setIsUsed(item.value == "true");
              setFocusUsed(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocusUsed ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.fixToText}>
          <Button
            title="Lưu thay đổi"
            color={AppColors.primaryColor}
            onPress={() => handleEditDevice()}
          />
          <Button title="Quay lại" color={"red"} onPress={() => GoBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dropdown: {
    width: "65%",
    marginRight: 27,
    marginTop: 20,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    width: "30%",
    marginTop: 20,
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  fixToText: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: "65%",
  },
  Inputlabel: {
    minWidth: "25%", // Fixed width for labels
    marginRight: 5, // Add some margin between the label and input
  },
  buttonContainer: {
    flexDirection: "row", // Set flexDirection to 'row'
    alignItems: "center", // Align items vertically in the center
    marginTop: 50,
  },
});
