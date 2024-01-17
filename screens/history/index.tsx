import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { LogOnOffDeviceControl } from "../../network/apis/logDevice.api";
import {
  LogDeviceDataQueryModel,
  LogDeviceStatusEntity,
  TypeOnOff,
} from "../../network/models/log_display/LogDevice";
import { AppColors, AppStyles } from "../../global";
import LogDevicesControlItem from "./historyItem";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Modal } from "../Modal";
import { calender, calendercancel } from "../../assets";
import { formatGetOnlyDate } from "../../utils";
import { Dropdown } from "react-native-element-dropdown";

const LogDeviceControlScreen = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const navigation = useNavigation<any>();
  const [pageNumber, SetPageNumber] = useState<number>(1);
  const [pageSize, SetPageSize] = useState<number>(50);
  const [valueDate, setValueDate] = useState<Date>(new Date());
  const [typeOnOff, setTypeOnOff] = useState<TypeOnOff | null>(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isDateOn, setIsDateOn] = useState(true);
  const toggleSwitchOn = () => setIsDateOn((previousState) => !previousState);

  const [logDevice, setLogDevice] = useState<LogDeviceStatusEntity[]>();
  const isFocused = useIsFocused();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

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
      setValueDate(selectedDate);
    }
    console.log(selectedDate);
    console.log("hoan thanh chon date xong");
  };

  const getDevices = async () => {
    setIsLoading(true);
    try {
      const params: LogDeviceDataQueryModel = {
        pageNumber: pageNumber,
        pageSize: pageSize,
        typeOnOff: typeOnOff,
        valueDate: valueDate.toISOString(),
      };
      const res = await LogOnOffDeviceControl(params);
      if (res.data.Success) {
        setLogDevice(res.data.Data.data);
      }
    } catch (e) {
      Alert.alert("Lỗi", `Lỗi lấy dữ liệu log device`, [{ text: "OK" }]);
      console.log("Error on log device screen" + e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      getDevices();
    } else {
      setIsLoading(true);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={AppStyles.appContainer}>
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
            paddingTop: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "500" }}>
          Lịch sử đóng mở thiết bị
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => getDevices()}
            />
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
        >
          {logDevice != null && logDevice?.length > 0 ? (
            logDevice.map((item) => (
              <LogDevicesControlItem key={item?.id} logsDevice={item} />
            ))
          ) : (
            <Text>Không có lịch sử thiết bị, hãy chọn ngày khác</Text>
          )}
        </ScrollView>
      )}

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
            {showDatePicker && isDateOn ? (
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
                    source={isDateOn ? calender : calendercancel}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ marginLeft: 10, marginTop: 10 }}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDateOn ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchOn}
                    value={isDateOn}
                  />
                </View>
                <Text style={{ marginTop: 12, marginLeft: 15 }}>
                  {isDateOn ? formatGetOnlyDate(date) : "Hãy chọn ngày"}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.fixToText}>
                  <Button
                    title="Chọn"
                    color={AppColors.primaryColor}
                    onPress={() => {
                      if (isDateOn) {
                        handleModal();
                        getDevices();
                      }
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
      </View>
    </SafeAreaView>
  );
};

export default LogDeviceControlScreen;
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
