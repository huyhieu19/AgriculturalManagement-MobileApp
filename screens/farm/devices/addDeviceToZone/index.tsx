import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AppColors } from "../../../../global";
import {
  AddDeviceToZone,
  getListModulesDeviceUsed,
} from "../../../../network/apis";
import { Dropdown } from "react-native-element-dropdown";
import { IModule } from "../../../../types/module.type";
import { IDeviceOnZone } from "../../../../types/device.type";
import { IZoneParams } from "../../../../types/zone.type";

type ParamList = {
  zone: IZoneParams;
};

const DeviceAddScreen = () => {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<ParamList, "zone">>();
  const routeParams = route?.params ?? [];

  const isFocused = useIsFocused();
  const [modules, setModules] = React.useState<IModule[]>([]);
  const [devices, setDevices] = React.useState<IDeviceOnZone[]>([]);
  const [device, setDevice] = React.useState<IDeviceOnZone | null>(null);
  const [nameDeviceRef, setNameDeviceRef] = useState<string>();
  const [deviceId, setDeviceId] = React.useState<string>("");
  const [moduleId, setModuleId] = useState<string | null>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFocusModule, setIsFocusModule] = useState<boolean>(false);
  const [isFocusDevice, setIsFocusDevice] = useState<boolean>(false);

  const fetchListModule = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getListModulesDeviceUsed();
      console.log(res);
      setModules(res.data.Data as unknown as IModule[]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      fetchListModule();
      setDevice(null);
    }
  }, [isFocused]);

  const deviceOnModule = (idModule: string) => {
    const module = modules.find((element) => element.id === idModule);
    if (module?.devices?.length! > 0) {
      setDevices(module?.devices!);
    } else {
      setDevices([]);
    }
  };
  const deviceOfGate = (id: string) => {
    const de = devices?.find((element) => element.id === id);
    console.log(de);
    if (de != null) {
      setDevice(de);
    } else {
      setDevice(null);
    }
  };

  const ReturnDeviceType = (DType: string | undefined) => {
    if (DType != undefined) {
      if (DType.toLowerCase() === "r") {
        return "Thiết bị đo";
      } else if (DType.toLowerCase() === "w") {
        return "Thiết bị điều khiển";
      }
    } else {
      return "";
    }
  };

  const handleAddNew = async () => {
    if (deviceId.length == 36) {
      try {
        setIsLoading(true);
        const res = await AddDeviceToZone(deviceId, routeParams.id);
        if (res.data.Data) {
          Alert.alert("Thành công", `Thêm mới thiết bị thành công`, [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        } else {
          Alert.alert("Lỗi thêm mới", `Thêm mới thiết bị không thành công`, [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        }
      } catch (e) {
        console.log(e);
        Alert.alert("Lỗi thêm mới", `Thêm mới thiết bị không thành công`, [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert("Lỗi thêm mới", `Mã số cần đủ 36 ký tự`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingVertical: 12,
          borderBottomWidth: 0.5,
          paddingHorizontal: 20,
          backgroundColor: AppColors.primaryColor,
          position: "relative",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            left: 20,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Thêm thiết bị vào khu
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Tên Module: </Text>
        <Dropdown
          style={[styles.dropdown, isFocusModule && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={modules}
          search
          maxHeight={300}
          labelField="nameRef"
          valueField="id"
          placeholder={!isFocusModule ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={moduleId}
          onFocus={() => setIsFocusModule(true)}
          onBlur={() => setIsFocusModule(false)}
          onChange={(item) => {
            setModuleId(item.id);
            setIsFocusModule(false);
            deviceOnModule(item.id);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusModule ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Tên thiết bị: </Text>
        <Dropdown
          style={[styles.dropdown, isFocusDevice && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={devices}
          search
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder={!isFocusDevice ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={deviceId}
          onFocus={() => setIsFocusDevice(true)}
          onBlur={() => setIsFocusDevice(false)}
          onChange={(item) => {
            setDeviceId(item.id);
            setIsFocusDevice(false);
            deviceOfGate(item.id);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusDevice ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <View style={styles.Inputcontainer}>
        <Text style={styles.label}>Ghi chú: </Text>
        <TextInput
          multiline={true}
          style={[styles.dropdown]}
          onChangeText={(e) => setNameDeviceRef(e)}
          value={nameDeviceRef}
          placeholder="Nhập ghi chú"
          inputMode="text"
        />
      </View>
      {moduleId != null || devices != null ? (
        <View style={styles.container}>
          <Text style={styles.label}>Loại thiết bị:</Text>
          <TextInput
            style={styles.dropdown1}
            placeholder="Loại thiết bị"
            value={ReturnDeviceType(device?.deviceType)}
            editable={false}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 10, marginLeft: 5, color: `red` }}>
          Hãy chọn đủ tên module và chân cắm
        </Text>
      )}
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={AppColors.primaryColor} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <View style={styles.fixToText}>
            <Button
              title="Thêm mới"
              color={AppColors.primaryColor}
              onPress={() => handleAddNew()}
            />
            <Button
              title="Quay lại"
              color={"red"}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      )}
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
    minHeight: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdown1: {
    width: "65%",
    marginRight: 27,
    marginTop: 20,
    minHeight: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: "white",
    backgroundColor: "#808080",
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
  Inputcontainer: {
    flexDirection: "row", // Set flexDirection to 'row'
    alignItems: "center", // Align items vertically in the center
    fontSize: "40px",
    marginBottom: 10,
  },
  Inputlabel: {
    minWidth: "25%", // Fixed width for labels
    marginRight: 15,
  },
  buttonContainer: {
    flexDirection: "row", // Set flexDirection to 'row'
    alignItems: "center", // Align items vertically in the center
    marginTop: 20,
    marginBottom: 20,
  },
});

export default DeviceAddScreen;
