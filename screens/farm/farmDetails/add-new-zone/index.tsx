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

type ParamList = {
  FarmDetailsScreen: IFramDetails;
};

export const AddNewZoneScreen = () => {
  const route = useRoute<RouteProp<ParamList, "FarmDetailsScreen">>();
  const navigation = useNavigation<any>();
  const farm = route?.params ?? [];
  const [zoneName, setZoneName] = useState("");
  const [function1, setFunction1] = useState("");
  const [area, setArea] = useState<string>("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const handleAddNew = async () => {
    // Perform API request to add new item
    try {
      const res = await createZone({
        zoneName: zoneName,
        farmId: farm.id,
        area: Number(area),
        description: description,
        note: note,
        function: function1,
      });
      if (res.data.Data.isSuccess) {
        Alert.alert("Thành công", "Thành công thêm khu mới", [
          { text: "OK", onPress: () => goBack() },
        ]);
      } else {
        Alert.alert("Lỗi thêm mới", `Thêm mới khu không thành công`, [
          { text: "OK", onPress: () => goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert("Lỗi thêm mới", `${error}`, [
        { text: "OK", onPress: () => goBack() },
      ]);
    }
  };

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
          }}
          onPress={goBack}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text style={{ fontSize: 18, color: "white" }}>
          Thêm mới khu trong nông trại
        </Text>
      </View>
      <View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Nông trại:</Text>
          <TextInput
            style={styles.inputFarmId}
            value={farm.name != null ? farm.name?.toString() : ""}
            editable={false}
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Tên khu:</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            onChangeText={(e) => setZoneName(e)}
            value={zoneName}
            placeholder="Nhập tên khu"
            inputMode="text"
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Chi tiết:</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            onChangeText={(e) => setDescription(e)}
            value={description}
            placeholder="Nhập thông tin chi tiết"
            inputMode="text"
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Diện tích (m2):</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            onChangeText={(e) => setArea(e)}
            value={area}
            placeholder="Nhập diện tích khu"
            inputMode="decimal"
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Chức năng:</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            onChangeText={(e) => setFunction1(e)}
            value={function1}
            placeholder="Nhập chức năng của khu"
            inputMode="text"
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Ghi chú:</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            onChangeText={(e) => setNote(e)}
            value={note}
            placeholder="Nhập ghi chú của khu"
            inputMode="text"
          />
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
