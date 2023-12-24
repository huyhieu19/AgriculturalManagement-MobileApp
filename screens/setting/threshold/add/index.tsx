import {
  View,
  Text,
  Pressable,
  Alert,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AppColors } from "../../../../global/styles/AppColors";
import {
  getControlOnZone,
  getInstrumentationOnZone,
  getListFarm,
  getListZone,
} from "../../../../network/apis";
import { IFramDetails } from "../../../../types/farm.type";
import { AppStyles } from "../../../../global";
import { Dropdown } from "react-native-element-dropdown";
import { IZoneParams } from "../../../../types/zone.type";
import { IDeviceOnZone } from "../../../../types/device.type";
import { createThres } from "../../../../network/apis/settings.api";
import RadioForm from "react-native-simple-radio-button";
import { ThresholdCreateModel } from "../../../../network/models/setting_threshold/ThresholdModel";
import { AppFontSize } from "../../../../global/styles/AppFontSize";

export const AddNewThresScreen = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [openValue, setOpenValue] = useState<number>(0);
  const [closeValue, setCloseValue] = useState<number>(0);

  // Using for choose device instrumentation
  const [isFocusFarm, setIsForcusFarm] = useState(false);
  const [farms, setFarms] = useState<IFramDetails[]>([]);
  const [farmId, setFarmId] = useState<number>(0);
  const [isFocusZone, setIsFocusZone] = useState(false);
  const [zones, setZones] = useState<IZoneParams[]>([]);
  const [zoneId, setZoneId] = useState<number>(0);
  const [isFocusDevice, setIsForcusDevice] = useState(false);
  const [devices, setDevices] = useState<IDeviceOnZone[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");
  const [isFocusIndex, setIsForcusIndex] = useState(false);
  const [indexDevice, setIndexDevice] = useState<string>("");
  const [typeDevice, setTypeDevice] = useState<string>("");

  // using for choose device driver
  const [isFocusFarm1, setIsForcusFarm1] = useState(false);
  const [farms1, setFarms1] = useState<IFramDetails[]>([]);
  const [farmId1, setFarmId1] = useState<number>(0);
  const [isFocusZone1, setIsFocusZone1] = useState(false);
  const [zones1, setZones1] = useState<IZoneParams[]>([]);
  const [zoneId1, setZoneId1] = useState<number>(0);
  const [isFocusDevice1, setIsForcusDevice1] = useState(false);
  const [devices1, setDevices1] = useState<IDeviceOnZone[]>([]);
  const [deviceId1, setDeviceId1] = useState<string>("");
  const [typeDevice1, setTypeDevice1] = useState<string>("");

  const [note, setNote] = useState<string>("");
  const [chosenType, setChosenType] = useState(true); //will store our current user options

  const options = [
    { label: "Type 1", value: "true" },
    { label: "Type 2", value: "false" },
  ]; //create our options for radio group

  const indexDevices = [
    { label: "Nhiệt độ", value: "ND" },
    { label: "Độ ẩm", value: "DA" },
  ];

  const FetchFarms = async () => {
    try {
      const res = await getListFarm();
      if (res.data.Success) {
        setFarms(res.data.Data);
      }
      console.log("Fetch Farm" + farms);
    } catch (e) {
      console.log(e);
    }
  };
  const FetchFarms1 = async () => {
    try {
      const res = await getListFarm();
      if (res.data.Success) {
        setFarms1(res.data.Data);
      }
      console.log("Fetch Farm" + farms);
    } catch (e) {
      console.log(e);
    }
  };

  const FetchZones = async () => {
    try {
      console.log("fetch zone");
      const res = await getListZone({ farmId });
      if (res.data.Success) {
        setZones(res.data.Data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const FetchZones1 = async () => {
    try {
      console.log("fetch zone");
      const res = await getListZone({ farmId });
      if (res.data.Success) {
        setZones1(res.data.Data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const FetchDevicesDriver = async () => {
    try {
      console.log("fetch devices driver");
      const res = await getControlOnZone(zoneId);
      const devicesRes = res.data.Data;
      if (res.data.Success) {
        setDevices1(devicesRes);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const FetchDevicesInstrumentation = async () => {
    try {
      console.log("fetch devices instrumentation");
      const res = await getInstrumentationOnZone(zoneId);
      const devicesRes = res.data.Data;
      if (res.data.Success) {
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
      const params: ThresholdCreateModel = {
        deviceDriverId: deviceId1,
        instrumentationId: deviceId,
        onInUpperThreshold: chosenType,
        thresholdValueOff: closeValue,
        thresholdValueOn: openValue,
        typeDevice: indexDevice,
      };
      const res = await createThres(params);
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
      setFarms([]);
      setZones([]);
      setDevices([]);
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
              onChangeText={(e) => setOpenValue(Number(e))}
              value={String(openValue)}
              placeholder="Nhập ngưỡng mở"
              inputMode="decimal"
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>Ngưỡng đóng: </Text>
            <TextInput
              multiline={true}
              style={[styles.input]}
              onChangeText={(e) => setCloseValue(Number(e))}
              value={String(closeValue)}
              placeholder="Nhập ngưỡng đóng"
              inputMode="decimal"
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>Kiểu đóng/mở: </Text>
            <View style={{ marginTop: 20 }}>
              <RadioForm
                radio_props={options}
                initial={0} //initial value of this group
                onPress={(value: any) => {
                  setChosenType(value === "true");
                }} //if the user changes options, set the new value
              />
            </View>
          </View>

          {/* Chọn thiết bị đo */}
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Chọn Thiết bị đo
            </Text>
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
              value={farmId.toString()}
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
            <Text style={styles.Inputlabel}>Thiết bị đo:</Text>
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
              placeholder={!isFocusDevice ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={deviceId}
              onFocus={() => {
                setIsForcusDevice(true);
                FetchDevicesInstrumentation();
              }}
              onBlur={() => setIsForcusDevice(false)}
              onChange={(item) => {
                setDeviceId(item.id);
                setIsForcusDevice(false);
              }}
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>Loại chỉ số:</Text>
            <Dropdown
              style={[styles.input, isFocusIndex && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={indexDevices}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusIndex ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={indexDevice}
              onFocus={() => setIsForcusIndex(true)}
              onBlur={() => setIsForcusIndex(false)}
              onChange={(item) => {
                setIndexDevice(item.value);
                setIsForcusIndex(false);
              }}
            />
          </View>
        </View>

        {/* Chọn thiết bị điều khiển */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            Chọn Thiết bị điều khiển
          </Text>
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Nông trại:</Text>
          <Dropdown
            style={[styles.input, isFocusFarm && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={farms1}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={!isFocusFarm1 ? "Select item" : "..."}
            searchPlaceholder="Search..."
            //value={farmId.toString()}
            onFocus={() => {
              setIsForcusFarm1(true);
              FetchFarms1();
            }}
            onBlur={() => setIsForcusFarm1(false)}
            onChange={(item) => {
              setFarmId(item.id);
              setIsForcusFarm(false);
            }}
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Khu:</Text>
          <Dropdown
            style={[styles.input, isFocusZone1 && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={zones1}
            search
            maxHeight={300}
            labelField="zoneName"
            valueField="id"
            placeholder={!isFocusZone ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={farmId.toString()}
            onFocus={() => {
              setIsFocusZone1(true);
              FetchZones1();
            }}
            onBlur={() => setIsFocusZone1(false)}
            onChange={(item) => {
              setZoneId(item.id);
              setIsFocusZone1(false);
            }}
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Thiết bị điều khiển:</Text>
          <Dropdown
            style={[styles.input, isFocusDevice1 && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={devices1}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={!isFocusDevice1 ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={deviceId1}
            onFocus={() => {
              setIsForcusDevice1(true);
              FetchDevicesDriver();
            }}
            onBlur={() => setIsForcusDevice1(false)}
            onChange={(item) => {
              setDeviceId1(item.id);
              setIsForcusDevice1(false);
            }}
          />
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
        <View>
          <Text style={{ color: "red" }}>* Chú thích: </Text>
          <Text>
            Type 1: Giá trị thiết bị đo lớn hơn ngưỡng mở thì mở thiết bị điều
            khiển, Giá trị thiết bị đo nhỏ ngưỡng đóng thì đóng thiết bị điều
            khiển
          </Text>
          <Text>
            Type 2: Giá trị thiết bị đo lớn hơn ngưỡng đóng thì đóng thiết bị
            điều khiển, Giá trị thiết bị đo nhỏ ngưỡng mở thì mở thiết bị điều
            khiển
          </Text>
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
