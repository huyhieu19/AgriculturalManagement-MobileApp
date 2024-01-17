import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AppColors, AppStyles } from "../../../../global";
import { calender, calendercancel } from "../../../../assets";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatGetOnlyDateDisplay } from "../../../../utils";
import {
  TimerDisplayModel,
  TimerUpdateModel,
} from "../../../../network/models/setting_timer/TimerModel";
import {
  removeTimer,
  updateTimer,
} from "../../../../network/apis/settings.api";
import { SafeAreaView } from "react-native-safe-area-context";

type ParamList = {
  Timer: TimerDisplayModel;
};

// chuyến sang giờ +7 Viet Nam
function formatGetOnlyDateDisplayLocalTime(date: any) {
  if (date == null) {
    return null;
  } else {
    const dateString = date;
    const dateObject = new Date(dateString);
    return new Date(dateObject.getTime() + 7 * 60 * 60 * 1000);
  }
}

export const EditTimerScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ParamList, "Timer">>();
  const timer_item = route?.params ?? [];

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const isFocused = useIsFocused();

  const [dateOn, setDateOn] = useState<Date | null>(
    formatGetOnlyDateDisplayLocalTime(timer_item.openTimer)
  );
  const [dateOff, setDateOff] = useState<Date | null>(
    formatGetOnlyDateDisplayLocalTime(timer_item.shutDownTimer)
  );
  const [isDateOn, setIsDateOn] = useState(true);
  const [isDateOff, setIsDateOff] = useState(true);
  const toggleSwitchOn = () => setIsDateOn((previousState) => !previousState);
  const toggleSwitchOff = () => setIsDateOff((previousState) => !previousState);

  const [showTimePickerOn, setShowTimePickerOn] = useState(false);
  const [showDatePickerOn, setShowDatePickerOn] = useState(false);
  const [showTimePickerOff, setShowTimePickerOff] = useState(false);
  const [showDatePickerOff, setShowDatePickerOff] = useState(false);
  const [note, setNote] = useState<string>(timer_item.note ?? "");

  const showTimepickerOn = () => {
    setShowTimePickerOn(true);
  };
  const showTimepickerOff = () => {
    setShowTimePickerOff(true);
  };

  // on
  const onChangeTimeOn = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowTimePickerOn(false);
    setShowDatePickerOn(true);
    if (selectedDate) {
      setDateOn(selectedDate);
    }
    console.log("chon time xong");
  };

  const onChangeDateOn = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePickerOn(false);
    setShowTimePickerOn(false);
    if (selectedDate) {
      setDateOn((prevState: any) => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const day = selectedDate.getDate();
        const hours = prevState.getHours();
        const minutes = prevState.getMinutes();
        return new Date(year, month, day, hours, minutes);
      });
    }
    console.log(selectedDate);
    console.log("hoan thanh chon date xong");
  };
  // off
  const onChangeTimeOff = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowTimePickerOff(false);
    setShowDatePickerOff(true);
    if (selectedDate) {
      setDateOff(selectedDate);
    }
  };

  const onChangeDateOff = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePickerOff(false);
    setShowTimePickerOff(false);
    if (selectedDate) {
      setDateOff((prevState: any) => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const day = selectedDate.getDate();
        const hours = prevState.getHours();
        const minutes = prevState.getMinutes();
        return new Date(year, month, day, hours, minutes);
      });
    }
    console.log(selectedDate);
    console.log("hoan thanh chon off");
  };

  React.useEffect(() => {
    if (isFocused) {
      setShowDatePickerOff(false);
      setShowTimePickerOff(false);
      setShowDatePickerOn(false);
      setShowTimePickerOn(false);
    }
    console.log("effect");
    console.log(isFocused);
  }, [isFocused]);

  const handleEditTimer = async () => {
    setIsLoading(true);
    try {
      let isOk = true;
      if (!isDateOff && !isDateOn) {
        Alert.alert(
          "Lỗi",
          "Vui lòng nhập it nhất một trong hai thời gian đóng/mở",
          [{ text: "OK" }]
        );
        isOk = false;
      } else if (isDateOn && dateOff != null && dateOff < new Date()) {
        Alert.alert("Lỗi", "Vui lòng không nhập thời gian trong  quá khứ", [
          { text: "OK" },
        ]);
        isOk = false;
      } else if (isDateOff && dateOn != null && dateOn < new Date()) {
        Alert.alert("Lỗi", "Vui lòng không nhập thời gian trong  quá khứ", [
          { text: "OK" },
        ]);
        isOk = false;
      }
      const params: TimerUpdateModel = {
        deviceDriverId: timer_item.deviceId,
        id: timer_item.id,
        openTimer: dateOn != null && isDateOn ? dateOn.toISOString() : null,
        shutDownTimer:
          dateOff != null && isDateOff ? dateOff.toISOString() : null,
        note: note,
      };

      if (params.openTimer == null && params.shutDownTimer == null) {
        Alert.alert(
          "Lỗi",
          "Vui lòng nhập it nhất một trong hai thời gian đóng/mở",
          [{ text: "OK" }]
        );
        isOk = false;
      }

      if (isOk) {
        const res = await updateTimer(params);
        if (res.data.Data != null && res.data.Data) {
          Alert.alert(
            "Thành công",
            `Thành công chỉnh sửa hẹn giờ thiết bị ${timer_item.deviceName}`,
            [{ text: "OK", onPress: () => navigation.goBack() }]
          );
        }
      }
    } catch (error) {
      Alert.alert("Lõi", `${error}`, [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveTimer = () => {
    Alert.alert(
      "Chắc chắn xóa",
      `Chắc chắn xóa hẹn giờ thiết bị ${timer_item.deviceName}`,
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              setIsLoading(true);
              const res = await removeTimer(timer_item.id, timer_item.deviceId);
              if (res.data.Data != null && res.data.Data) {
                Alert.alert(
                  "Thành công",
                  `Thành công xóa một hẹn giờ thiết bị ${timer_item.deviceName}`,
                  [{ text: "OK", onPress: () => navigation.goBack() }]
                );
              }
            } catch (error) {
              Alert.alert("Lõi", `${error}`, [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView>
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
        <ScrollView>
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
                fontWeight: "600",
              }}
            >
              Chỉnh sửa hẹn giờ thiết bị
            </Text>
          </View>
          <View>
            <View>
              <View style={styles.Inputcontainer}>
                <Text style={styles.Inputlabel}>Thời gian mở:</Text>
                <TouchableOpacity
                  onPress={showTimepickerOn}
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
                  {isDateOn
                    ? formatGetOnlyDateDisplay(dateOn) ?? "Hãy chọn ngày"
                    : "Không cài đặt"}
                </Text>

                {showTimePickerOn ? (
                  <RNDateTimePicker
                    testID="timePickerOn"
                    value={dateOn ?? new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTimeOn}
                  />
                ) : null}

                {showDatePickerOn ? (
                  <RNDateTimePicker
                    testID="datePickerOn"
                    value={dateOn ?? new Date()}
                    mode="date"
                    display="default"
                    onChange={onChangeDateOn}
                  />
                ) : null}
              </View>
              <View style={styles.Inputcontainer}>
                <Text style={styles.Inputlabel}>Thời gian đóng:</Text>
                <TouchableOpacity
                  onPress={showTimepickerOff}
                  style={styles.button_showTime}
                >
                  <Image
                    source={isDateOff ? calender : calendercancel}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ marginLeft: 10, marginTop: 10 }}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDateOff ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchOff}
                    value={isDateOff}
                  />
                </View>
                <Text style={{ marginTop: 12, marginLeft: 15 }}>
                  {isDateOff
                    ? formatGetOnlyDateDisplay(dateOff) ?? "Hãy chọn ngày"
                    : "Không cài đặt"}
                </Text>

                {showTimePickerOff && (
                  <RNDateTimePicker
                    testID="timePickerOff"
                    value={dateOff ?? new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTimeOff}
                  />
                )}

                {showDatePickerOff && (
                  <RNDateTimePicker
                    testID="datePickerOff"
                    value={dateOff ?? new Date()}
                    mode="date"
                    display="default"
                    onChange={onChangeDateOff}
                  />
                )}
              </View>
              <View style={styles.Inputcontainer}>
                <Text style={styles.Inputlabel}>Note: </Text>
                <TextInput
                  multiline={true}
                  style={[styles.input]}
                  onChangeText={(e) => setNote(e)}
                  value={note ?? ""}
                  placeholder="Nhập ghi chú"
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.fixToText}>
                <Button
                  title="Lưu chỉnh sửa"
                  color={AppColors.primaryColor}
                  onPress={() => {
                    handleEditTimer();
                  }}
                />
                <Button
                  title="Xóa hẹn giờ"
                  color={"red"}
                  onPress={() => {
                    handleRemoveTimer();
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
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
