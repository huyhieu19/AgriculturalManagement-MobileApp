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
  const [name, setName] = useState("Nông trại");
  const [area, setArea] = useState(0);
  const [description, setDescription] = useState("Thông tin chi tiết");
  const [address, setAddress] = useState("Ha Noi");
  const [note, setNote] = useState("Ghi chú");

  const GoBack = () => {
    navigation.navigate("ListFarmScreen");
  };

  const handleAddNew = async () => {
    // Perform API request to add new item
    try {
      const res = await createFarm({
        name: name,
        area: area,
        description: description,
        address: address,
        note: note,
      });
      if (res.data.Data.isSuccess) {
        Alert.alert("Thành công", "Thành công thêm farm mới", [{ text: "OK" }]);
      } else {
        Alert.alert("Lỗi thêm mới", `Thêm mới farm không thành công`, [
          { text: "OK" },
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: AppColors.primaryColor,
          paddingTop: 10,
          height: 60,
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            left: 20,
            paddingTop: 10,
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
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Chi tiết:</Text>
          <TextInput
            multiline={true}
            style={styles.dropdown}
            onChangeText={(e) => setDescription(e)}
            value={description}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Diện tích (m2):</Text>
          <TextInput
            multiline={true}
            style={styles.dropdown}
            onChangeText={(e) => setArea(Number(e))}
            value={String(area)}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <TextInput
            multiline={true}
            style={styles.dropdown}
            onChangeText={(e) => setAddress(e)}
            value={address}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Ghi chú:</Text>
          <TextInput
            multiline={true}
            style={styles.dropdown}
            onChangeText={(e) => setNote(e)}
            value={note}
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
