import {
  View,
  Text,
  Pressable,
  Alert,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "../../../../global/styles/AppColors";
import { createFarm } from "../../../../network/apis";
import { AppStyles } from "../../../../global";

export const CreateFarmScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const GoBack = () => {
    navigation.navigate("ListFarmScreen");
  };

  const handleAddNew = async () => {
    // Perform API request to add new item
    try {
      const res = await createFarm({
        name: name,
        area: Number(area),
        description: description,
        address: address,
        note: note,
      });
      if (res.data.Data.isSuccess) {
        Alert.alert("Thành công", "Thành công thêm farm mới", [
          { text: "OK", onPress: () => GoBack() },
        ]);
      } else {
        Alert.alert("Lỗi thêm mới", `Thêm mới farm không thành công`, [
          { text: "OK", onPress: () => GoBack() },
        ]);
      }
    } catch (error) {
      Alert.alert("Lỗi thêm mới", `${error}`, [
        { text: "OK", onPress: () => GoBack() },
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
            width: 60,
          }}
          onPress={GoBack}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text style={{ fontSize: 18, color: "white" }}>Thêm mới nông trại</Text>
      </View>

      <View>
        <View style={styles.container}>
          <Text style={styles.label}>Tên nông trại:</Text>
          <TextInput
            multiline={true}
            style={styles.dropdown}
            onChangeText={(e) => setName(e)}
            value={name}
            placeholder="Nhập tên nông trại"
            inputMode="text"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Chi tiết:</Text>
          <TextInput
            multiline={true}
            style={styles.dropdown}
            onChangeText={(e) => setDescription(e)}
            value={description}
            placeholder="Nhập thông tin chi tiết"
            inputMode="text"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Diện tích (m2):</Text>
          <TextInput
            multiline={true}
            style={styles.dropdown}
            onChangeText={(e) => setArea(e)}
            value={String(area)}
            placeholder="Nhập diện tích (đơn vị mét vuông)"
            inputMode="decimal"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <TextInput
            multiline={true}
            style={styles.dropdown}
            onChangeText={(e) => setAddress(e)}
            value={address}
            placeholder="Nhập địa chỉ nông trại"
            inputMode="text"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Ghi chú:</Text>
          <TextInput
            multiline={true}
            style={styles.dropdown}
            onChangeText={(e) => setNote(e)}
            value={note}
            placeholder="Nhập ghi chú cho nông trại"
            inputMode="text"
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
          <Button title="Quay lại" color={"red"} onPress={() => GoBack()} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dropdown: {
    width: "70%",
    marginRight: 27,
    marginTop: 20,
    minHeight: 50,
    maxHeight: 200,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    width: "26%",
    marginTop: 20,
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
  },
  buttonContainer: {
    flexDirection: "row", // Set flexDirection to 'row'
    alignItems: "center", // Align items vertically in the center
    marginTop: 20,
    marginBottom: 20,
  },
});
