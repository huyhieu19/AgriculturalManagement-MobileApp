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
import { calender } from "../../../../assets";
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

export const EditTimerScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ParamList, "Timer">>();
  const timer_item = route?.params ?? [];

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const isFocused = useIsFocused();

  const [dateOn, setDateOn] = useState(new Date());
  const [dateOff, setDateOff] = useState(new Date());

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
    if (selectedDate) {
      setDateOn(selectedDate);
    }
    console.log("chon time xong");
    setShowTimePickerOn(false);
    setShowDatePickerOn(true);
  };

  console.log("showTime", showTimePickerOn);

  const onChangeDateOn = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDateOn(selectedDate);
    }
    console.log(selectedDate);
    console.log("hoan thanh chon date xong");
    setShowDatePickerOn(false);
    setShowTimePickerOn(false);
  };
  // off
  const onChangeTimeOff = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDateOff(selectedDate);
    }
    setShowTimePickerOff(false);
    setShowDatePickerOff(true);
  };

  const onChangeDateOff = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDateOff(selectedDate);
    }
    console.log(selectedDate);
    console.log("hoan thanh chon off");
    setShowDatePickerOff(false);
    setShowTimePickerOff(false);
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
      const params: TimerUpdateModel = {
        deviceDriverId: timer_item.deviceId,
        id: timer_item.id,
        openTimer: dateOn.toISOString(),
        shutDownTimer: dateOff.toISOString(),
        note: note,
      };

      const res = await updateTimer(params);
      if (res.data.Data != null && res.data.Data) {
        Alert.alert(
          "Thành công",
          `Thành công chỉnh sửa hẹn giờ thiết bị ${timer_item.deviceName}`,
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
              borderBottomWidth: 0.5,
              paddingHorizontal: 20,
              height: 50,
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
                    source={calender}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
                <Text style={{ marginTop: 12, marginLeft: 15 }}>
                  {formatGetOnlyDateDisplay(dateOn)}
                </Text>

                {showTimePickerOn ? (
                  <RNDateTimePicker
                    testID="timePickerOn"
                    value={dateOn}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTimeOn}
                  />
                ) : null}

                {showDatePickerOn ? (
                  <RNDateTimePicker
                    testID="datePickerOn"
                    value={dateOn}
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
                    source={calender}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
                <Text style={{ marginTop: 12, marginLeft: 15 }}>
                  {formatGetOnlyDateDisplay(dateOff)}
                </Text>

                {showTimePickerOff && (
                  <RNDateTimePicker
                    testID="timePickerOff"
                    value={dateOff}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTimeOff}
                  />
                )}

                {showDatePickerOff && (
                  <RNDateTimePicker
                    testID="datePickerOff"
                    value={dateOff}
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
