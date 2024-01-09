import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "../../global";
import { Modal } from "../Modal";
import { Dropdown } from "react-native-element-dropdown";
import { IFramDetails } from "../../types/farm.type";
import { IZoneParams } from "../../types/zone.type";
import { IDeviceOnZone } from "../../types/device.type";
import {
  getControlOnZone,
  getInstrumentationOnZone,
  getListFarm,
  getListZone,
} from "../../network/apis";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { calender } from "../../assets";
import { formatGetOnlyDate } from "../../utils";
import { LineChart } from "react-native-chart-kit";

const StatisticsScreen = () => {
  const navigation = useNavigation<any>();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isFocusFarm, setIsForcusFarm] = useState(false);
  const [farms, setFarms] = useState<IFramDetails[]>([]);
  const [farmId, setFarmId] = useState<number>(0);
  const [isFocusZone, setIsFocusZone] = useState(false);
  const [zones, setZones] = useState<IZoneParams[]>([]);
  const [zoneId, setZoneId] = useState<number>(0);
  const [isFocusDevice, setIsForcusDevice] = useState(false);
  const [devices, setDevices] = useState<IDeviceOnZone[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());
  // Tạo mảng labels từ 0h đến 23h
  const labels = Array.from({ length: 24 }, (_, i) => `${i}h`);

  const data = {
    labels: labels,
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  };
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
    setShowDatePicker(false);
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
    console.log(selectedDate);
    console.log("hoan thanh chon date xong");
  };

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
      const res = await getInstrumentationOnZone(zoneId);
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

  const FetchStatistic = async () => {
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          Thống kê
        </Text>

        <Pressable
          style={{
            position: "absolute",
            right: 20,
            paddingTop: 10,
          }}
          onPress={() => {
            handleModal();
          }}
        >
          <Ionicons name="options" size={24} color="white" />
        </Pressable>
      </View>
      <View style={styles.container}>
        <View style={styles.separator} />
        <Modal isVisible={isModalVisible} title="Chỉnh sửa module">
          <View
            style={{
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                backgroundColor: AppColors.modalTop,
                paddingVertical: 12,
                justifyContent: "center",
              }}
            >
              <Pressable
                style={{
                  position: "absolute",
                  right: 20,
                }}
                onPress={handleModal}
              >
                <FontAwesome name="close" size={24} color="black" />
              </Pressable>
              <Text style={{ fontSize: 18, color: "black", fontWeight: "500" }}>
                Chọn thiết bị
              </Text>
            </View>
            {showDatePicker ? (
              <RNDateTimePicker
                testID="datePickerOff"
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            ) : null}
            <View>
              <View style={styles.Inputcontainer}>
                <Text style={styles.Inputlabel}>Chọn ngày:</Text>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.button_showTime}
                >
                  <Image
                    source={calender}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
                <Text style={{ marginTop: 12, marginLeft: 15 }}>
                  {formatGetOnlyDate(date)}
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
                  style={[
                    styles.input,
                    isFocusDevice && { borderColor: "blue" },
                  ]}
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
              <View style={styles.buttonContainer}>
                <View style={styles.fixToText}>
                  <Button
                    title="Xong"
                    color={AppColors.primaryColor}
                    onPress={() => {
                      FetchStatistic();
                      handleModal();
                    }}
                  />
                  <Button
                    title="Quay lại"
                    color={AppColors.back}
                    onPress={() => handleModal()}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "500" }}
            >
              Nhiệt độ
            </Text>
          </View>
          <ScrollView horizontal>
            <LineChart
              data={data}
              width={Dimensions.get("window").width * 2} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix="*C"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#65B741",
                backgroundGradientTo: "#BED754",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `#191919`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </ScrollView>
          <View style={styles.horizontalLine} />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "500" }}
            >
              Độ ẩm
            </Text>
          </View>
          <ScrollView horizontal>
            <LineChart
              data={data}
              width={Dimensions.get("window").width * 2} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix="%"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#C1F2B0",
                backgroundGradientFrom: "#5FBDFF",
                backgroundGradientTo: "#96EFFF",
                decimalPlaces: 2, // optional, defaults to 2dp
                // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                color: (opacity = 1) => `rgba(69, 41, 57, ${opacity})`,
                labelColor: (opacity = 1) => `#191919`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  horizontalLine: {
    height: 1, // Đặt chiều cao của đường kẻ ngang
    backgroundColor: "black", // Đặt màu sắc của đường kẻ ngang
    marginVertical: 10, // Đặt khoảng cách giữa đường kẻ và các phần tử khác (nếu cần)
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  dropdown: {
    width: "70%",
    marginRight: 27,
    marginTop: 15,
    minHeight: 50,
    maxHeight: 200,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    width: "26%",
    marginTop: 15,
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
  buttonContainer: {
    flexDirection: "row", // Set flexDirection to 'row'
    alignItems: "center", // Align items vertically in the center
    marginTop: 20,
    paddingBottom: 20,
  },
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
});
