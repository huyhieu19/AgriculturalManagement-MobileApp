import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AppColors } from "../../../../global/styles/AppColors";
import {
  getControlOnZone,
  getListFarm,
  getListZone,
} from "../../../../network/apis";
import { IFramDetails } from "../../../../types/farm.type";
import { AppStyles } from "../../../../global";
import { Dropdown } from "react-native-element-dropdown";
import { IZoneParams } from "../../../../types/zone.type";
import { IDeviceOnZone } from "../../../../types/device.type";
import { TimerCreateModel } from "../../../../network/models/setting_timer/TimerModel";
import { createTimer } from "../../../../network/apis/settings.api";

export const AddNewThresScreen = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [isFocusFarm, setIsForcusFarm] = useState(false);
  const [farms, setFarms] = useState<IFramDetails[]>([]);
  const [farmId, setFarmId] = useState<number>(0);
  const [isFocusZone, setIsFocusZone] = useState(false);
  const [zones, setZones] = useState<IZoneParams[]>([]);
  const [zoneId, setZoneId] = useState<number>(0);
  const [isFocusDevice, setIsForcusDevice] = useState(false);
  const [devices, setDevices] = useState<IDeviceOnZone[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");

  const [dateOn, setDateOn] = useState(new Date());
  const [dateOff, setDateOff] = useState(new Date());

  const [note, setNote] = useState<string>("");

  const FetchFarms = async () => {
    try {
      const res = await getListFarm();
      setFarms(res.data.Data);
      console.log("Fetch Farm" + farms);
    } catch (e) {
      console.log(e);
    }
  };
  const FetchZones = async () => {
    try {
      console.log("fetch zone");
      const res = await getListZone({ farmId });
      const zonesRes = res.data.Data;
      if (zonesRes.length == 0) {
        setZones([]);
      } else {
        setZones(zonesRes);
      }
      setDevices([]);
    } catch (e) {
      console.log(e);
    }
  };
  const FetchDevices = async () => {
    try {
      console.log("fetch devices");
      const res = await getControlOnZone(zoneId);
      const devicesRes = res.data.Data;
      if (devicesRes.length == 0) {
        setDevices([]);
      } else {
        setDevices(devicesRes);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleAddNewTimer = async () => {
    // Perform API request to add new item
    try {
      const params: TimerCreateModel = {
        deviceDriverId: deviceId,
        note: note,
        openTimer: dateOn.toISOString(),
        shutDownTimer: dateOff.toISOString(),
      };
      const res = await createTimer(params);
      if (res.data.Data != null && res.data.Data) {
        Alert.alert("Thành công", "Thành công thêm thời gian đóng mở", [
          { text: "OK", onPress: goBack },
        ]);
      } else {
        Alert.alert(
          "Lỗi thêm mới",
          `Thêm thời gian đóng mở cho thiết bị không thành công`,
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      Alert.alert("Lỗi thêm mới", `${error}`, [{ text: "OK" }]);
    }
  };
  React.useEffect(() => {
    if (isFocused) {
    }
    console.log("effect");
    console.log(isFocused);
  }, [isFocused]);

  return (
    <ScrollView style={AppStyles.appContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: AppColors.primaryColor,
          paddingTop: 7,
          height: 58,
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            left: 20,
            top: 20,
          }}
          onPress={goBack}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "600" }}>
          Thêm mới ngưỡng đóng mở
        </Text>
      </View>
      <View>
        <View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>Ngưỡng mở: </Text>
            <TextInput
              multiline={true}
              style={[styles.input]}
              onChangeText={(e) => setNote(e)}
              value={note}
              placeholder="Nhập ngưỡng mở"
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>Ngưỡng đóng: </Text>
            <TextInput
              multiline={true}
              style={[styles.input]}
              onChangeText={(e) => setNote(e)}
              value={note}
              placeholder="Nhập ngưỡng đóng"
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>
              Lớn hơn ngưỡng mở thiết bị mở, nhở hơn ngưỡng đóng thiết bị đóng:{" "}
            </Text>
            <TextInput
              multiline={true}
              style={[styles.input]}
              onChangeText={(e) => setNote(e)}
              value={note}
              placeholder="Nhập ghi chú"
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>Nông trại:</Text>
            <Dropdown
              style={[styles.input, isFocusFarm && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={farms}
              search
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder={!isFocusFarm ? "Select item" : "..."}
              searchPlaceholder="Search..."
              //value={farmId.toString()}
              onFocus={() => {
                setIsForcusFarm(true);
                FetchFarms();
              }}
              onBlur={() => setIsForcusFarm(false)}
              onChange={(item) => {
                setFarmId(item.id);
                setIsForcusFarm(false);
              }}
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>Khu:</Text>
            <Dropdown
              style={[styles.input, isFocusZone && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={zones}
              search
              maxHeight={300}
              labelField="zoneName"
              valueField="id"
              placeholder={!isFocusZone ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={farmId.toString()}
              onFocus={() => {
                setIsFocusZone(true);
                FetchZones();
              }}
              onBlur={() => setIsFocusZone(false)}
              onChange={(item) => {
                setZoneId(item.id);
                setIsFocusZone(false);
              }}
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>Thiết bị:</Text>
            <Dropdown
              style={[styles.input, isFocusDevice && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={devices}
              search
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder={!isFocusFarm ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={deviceId}
              onFocus={() => {
                setIsForcusDevice(true);
                FetchDevices();
              }}
              onBlur={() => setIsForcusDevice(false)}
              onChange={(item) => {
                setDeviceId(item.id);
                setIsForcusDevice(false);
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.fixToText}>
            <Button
              title="Thêm mới"
              color={AppColors.primaryColor}
              onPress={() => handleAddNewTimer()}
            />
            <Button title="Quay lại" color={"red"} onPress={() => goBack()} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  Inputcontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button_showTime: {
    marginTop: 10,
  },
  input: {
    width: "70%",
    marginRight: 27,
    marginTop: 10,
    minHeight: 50,
    maxHeight: 200,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  Inputlabel: {
    width: "26%",
    marginTop: 10,
    marginLeft: 5,
    fontWeight: "500",
  },
  fixToText: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
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
  inputFarmId: {
    padding: 10,
    backgroundColor: "gray",
    color: "white",
    width: "70%",
    marginRight: 27,
    marginTop: 20,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row", // Set flexDirection to 'row'
    alignItems: "center", // Align items vertically in the center
    marginTop: 20,
    marginBottom: 20,
  },
});
