import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
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

// type ScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "DeviceAddScreen"
// >;

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
  const [deviceId, setDeviceId] = React.useState<string>("");
  const [moduleId, setModuleId] = useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFocusModule, setIsFocusModule] = useState<boolean>(false);
  const [isFocusDevice, setIsFocusDevice] = useState<boolean>(false);

  const renderLabelModule = () => {
    return (
      <Text style={[styles.label, isFocusModule && { color: "blue" }]}>
        Tên Module
      </Text>
    );
  };
  const renderLabelDevice = () => {
    return (
      <Text style={[styles.label, isFocusDevice && { color: "blue" }]}>
        Thiết bị - Chân cắm
      </Text>
    );
  };

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
      fetchListModule().then(() => {});
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

  const handleAddNew = async () => {
    if (deviceId.length == 36) {
      try {
        setIsLoading(true);
        const res = await AddDeviceToZone(deviceId, routeParams?.id!);
        if (res.data.Data) {
          Alert.alert("Thành công", `Thêm mới thiết bị thành công`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        } else {
          Alert.alert("Lỗi thêm mới", `Thêm mới thiết bị không thành công`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      } catch (e) {
        console.log(e);
        Alert.alert("Lỗi thêm mới", `Thêm mới thiết bị không thành công`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } finally {
        navigation.goBack();
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
          Thêm thiết bị vào Zone
        </Text>
      </View>

      <View style={styles.container}>
        {renderLabelModule()}
        <Dropdown
          style={[styles.dropdown, isFocusModule && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={modules}
          search
          maxHeight={300}
          labelField="name"
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
        {renderLabelDevice()}
        <Dropdown
          style={[styles.dropdown, isFocusDevice && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={devices}
          search
          maxHeight={300}
          labelField="gate"
          valueField="id"
          placeholder={!isFocusDevice ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={deviceId}
          onFocus={() => setIsFocusDevice(true)}
          onBlur={() => setIsFocusDevice(false)}
          onChange={(item) => {
            setDeviceId(item.id);
            setIsFocusDevice(false);
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
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
  },
});

export default DeviceAddScreen;
