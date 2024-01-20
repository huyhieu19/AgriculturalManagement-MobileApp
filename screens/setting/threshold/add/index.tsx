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
  deviceDriverByFarmZone,
  getControlOnZone,
  getInstrumentationOnZone,
  getListFarm,
  getListZone,
} from "../../../../network/apis";
import { AppStyles } from "../../../../global";
import { Dropdown } from "react-native-element-dropdown";
import { IZoneParams } from "../../../../types/zone.type";
import { IDeviceOnZone } from "../../../../types/device.type";
import { createThres } from "../../../../network/apis/settings.api";
import RadioForm from "react-native-simple-radio-button";
import { ThresholdCreateModel } from "../../../../network/models/setting_threshold/ThresholdModel";
import {
  FunctionDeviceType,
  KeyValueForDevice,
  KeyValueForFarm,
  KeyValueForZone,
} from "../../../../network/models";

export const AddNewThresScreen = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [openValue, setOpenValue] = useState<string>("");
  const [closeValue, setCloseValue] = useState<string>("");

  // Using for choose device instrumentation
  const [isFocusFarm, setIsForcusFarm] = useState(false);
  const [farms, setFarms] = useState<KeyValueForFarm[]>([]);
  const [isFocusZone, setIsFocusZone] = useState(false);
  const [zones, setZones] = useState<KeyValueForZone[]>([]);
  const [isFocusDevice, setIsForcusDevice] = useState(false);
  const [devices, setDevices] = useState<KeyValueForDevice[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");
  const [isFocusIndex, setIsForcusIndex] = useState(false);
  const [indexDevice, setIndexDevice] = useState<string>("");

  // using for choose device driver
  const [isFocusFarm1, setIsForcusFarm1] = useState(false);
  const [farms1, setFarms1] = useState<KeyValueForFarm[]>([]);
  const [isFocusZone1, setIsFocusZone1] = useState(false);
  const [zones1, setZones1] = useState<KeyValueForZone[]>([]);
  const [isFocusDevice1, setIsForcusDevice1] = useState(false);
  const [devices1, setDevices1] = useState<KeyValueForDevice[]>([]);
  const [deviceId1, setDeviceId1] = useState<string>("");
  const [deviceType, setDeviceType] = useState<FunctionDeviceType>(
    FunctionDeviceType.AirTemperature
  );

  const [note, setNote] = useState<string>("");
  const [chosenType, setChosenType] = useState(true); //will store our current user options

  const options = [
    { label: "Kiểu 1", value: "true" },
    { label: "Kiểu 2", value: "false" },
  ]; //create our options for radio group

  const FetchDeviceDriverByFarmZone = async () => {
    try {
      const res1 = await deviceDriverByFarmZone(1);
      const res = await deviceDriverByFarmZone(2);
      setFarms(res1.data.Data.farms);
      setZones(res1.data.Data.zone);
      setDevices(res1.data.Data.device);
      setFarms1(res.data.Data.farms);
      setZones1(res.data.Data.zone);
      setDevices1(res.data.Data.device);
    } catch (e) {
      console.log(e);
    }
  };

  const FetchZones = (farmId1: number) => {
    try {
      console.log("fetch zone");
      const result = zones.filter(({ farmId }) => farmId == farmId1);
      if (result.length > 0) {
        setZones(result);
      } else {
        setZones([]);
        setDevices([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const FetchZones1 = (farmId1: number) => {
    try {
      console.log("fetch zone");
      const result = zones1.filter(({ farmId }) => farmId == farmId1);
      if (result.length > 0) {
        setZones1(result);
      } else {
        setZones1([]);
        setDevices1([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const FetchDevicesDriver = async (zoneId1: number) => {
    try {
      console.log("fetch devices");
      const result = devices.filter(({ zoneId }) => zoneId == zoneId1);
      if (result.length > 0) {
        setDevices(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const FetchDevicesInstrumentation = async (zoneId1: number) => {
    try {
      console.log("fetch devices");
      const result = devices1.filter(({ zoneId }) => zoneId == zoneId1);
      if (result.length > 0) {
        setDevices1(result);
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
        thresholdValueOff: Number(closeValue),
        thresholdValueOn: Number(openValue),
      };
      const res = await createThres(params);
      if (res.data.Data != null && res.data.Data) {
        Alert.alert(
          "Thành công",
          "Thành công thêm liên kết thiết bị,đóng mở theo giá trị ngưỡng. Thiết bị được cài thành tự động!",
          [{ text: "OK", onPress: goBack }]
        );
      } else {
        Alert.alert(
          "Lỗi thêm mới",
          "Hai thiết bị đã được cài đặt, hãy xem lại trên giao diện",
          [{ text: "OK", onPress: goBack }]
        );
      }
    } catch (error) {
      Alert.alert("Lỗi thêm mới", `${error}`, [
        { text: "OK", onPress: goBack },
      ]);
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      FetchDeviceDriverByFarmZone();
    }
    console.log("effect");
    console.log(isFocused);
  }, [isFocused]);

  return (
    <ScrollView style={AppStyles.appContainer}>
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
            width: 60,
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
              }}
              onBlur={() => setIsForcusFarm(false)}
              onChange={(item) => {
                FetchZones(item.id);
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
              labelField="name"
              valueField="id"
              placeholder={!isFocusZone ? "Select item" : "..."}
              searchPlaceholder="Search..."
              //value={farmId.toString()}
              onFocus={() => {
                setIsFocusZone(true);
              }}
              onBlur={() => setIsFocusZone(false)}
              onChange={(item) => {
                FetchDevicesDriver(item.id);
                setIsFocusZone(false);
              }}
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Text style={[styles.Inputlabel]}>Thiết bị đo </Text>
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
              }}
              onBlur={() => setIsForcusDevice(false)}
              onChange={(item) => {
                setDeviceId(item.id);
                setIsForcusDevice(false);
              }}
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
            }}
            onBlur={() => setIsForcusFarm1(false)}
            onChange={(item) => {
              FetchZones1(item.id);
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
            labelField="name"
            valueField="id"
            placeholder={!isFocusZone ? "Select item" : "..."}
            searchPlaceholder="Search..."
            //value={farmId.toString()}
            onFocus={() => {
              setIsFocusZone1(true);
            }}
            onBlur={() => setIsFocusZone1(false)}
            onChange={(item) => {
              FetchDevicesInstrumentation(item.id);
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
            }}
            onBlur={() => setIsForcusDevice1(false)}
            onChange={(item) => {
              setDeviceId1(item.id);
              setDeviceType(item.nameRef ?? FunctionDeviceType.AirTemperature);
              setIsForcusDevice1(false);
            }}
          />
        </View>
        {deviceType !== FunctionDeviceType.RainDetection ? (
          <View>
            <View style={styles.Inputcontainer}>
              <Text style={styles.Inputlabel}>Ngưỡng mở: </Text>
              <TextInput
                style={[styles.input]}
                onChangeText={(e) => setOpenValue(e)}
                value={openValue}
                placeholder="Nhập ngưỡng mở"
                inputMode="decimal"
              />
            </View>
            <View style={styles.Inputcontainer}>
              <Text style={styles.Inputlabel}>Ngưỡng đóng: </Text>
              <TextInput
                style={[styles.input]}
                onChangeText={(e) => setCloseValue(e)}
                value={closeValue}
                placeholder="Nhập ngưỡng đóng"
                inputMode="decimal"
              />
            </View>
          </View>
        ) : null}
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
          {deviceType === FunctionDeviceType.RainDetection ? (
            <View>
              <Text>
                Kiểu 1: Phát hiện mưa thì thiết bị đóng, hết mưa thì thiết bị mở
              </Text>
              <Text>
                Kiểu 2: Phát hiện mưa thì thiết bị mở, hết mưa thì thiết bị đóng
              </Text>
            </View>
          ) : (
            <View>
              <Text>
                Kiểu 1: Giá trị thiết bị đo lớn hơn ngưỡng mở thì mở thiết bị
                điều khiển, Giá trị thiết bị đo nhỏ ngưỡng đóng thì đóng thiết
                bị điều khiển
              </Text>
              <Text>
                Kiểu 2: Giá trị thiết bị đo lớn hơn ngưỡng đóng thì đóng thiết
                bị điều khiển, Giá trị thiết bị đo nhỏ ngưỡng mở thì mở thiết bị
                điều khiển
              </Text>
            </View>
          )}
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
    width: "65%",
    marginRight: 15,
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
