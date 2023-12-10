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
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppColors } from "../../../../global/styles/AppColors";
import { createZone } from "../../../../network/apis";
import { IFramDetails } from "../../../../types/farm.type";
import { AppStyles } from "../../../../global";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

type ParamList = {
  FarmDetailsScreen: IFramDetails;
};

export const AddNewTimerScreen = () => {
  const route = useRoute<RouteProp<ParamList, "FarmDetailsScreen">>();
  const navigation = useNavigation<any>();
  const farm = route?.params ?? [];
  const [selectedDate, setSelectedDate] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const handleAddNew = async () => {
    // Perform API request to add new item
    try {
      const res = await createZone({});
      if (res.data.Data.isSuccess) {
        Alert.alert("Thành công", "Thành công thêm khu mới", [{ text: "OK" }]);
        goBack();
      } else {
        Alert.alert("Lỗi thêm mới", `Thêm mới khu không thành công`, [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      Alert.alert("Lỗi thêm mới", `${error}`, [{ text: "OK" }]);
      goBack();
    }
  };

  return (
    <ScrollView style={AppStyles.appContainer}>
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
          onPress={goBack}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "600" }}>
          Thêm mới hẹn giờ thiết bị
        </Text>
      </View>
      <View>
        <View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>Nông trại:</Text>
            {/* <DateTimePickerModal
              date={selectedDate}
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            /> */}
            <RNDateTimePicker
              value={new Date()}
              maximumDate={new Date(2030, 10, 20)}
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Text style={styles.Inputlabel}>Tên khu:</Text>
            <TextInput
              multiline={true}
              style={styles.input}
              onChangeText={(e) => e}
              value={"ascd"}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.fixToText}>
            <Button
              title="Thêm mới"
              color={AppColors.primaryColor}
              onPress={() => handleAddNew()}
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
