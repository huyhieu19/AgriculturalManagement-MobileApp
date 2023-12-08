import {
  View,
  Text,
  Pressable,
  Alert,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppColors } from "../../../../global/styles/AppColors";
import { createZone, deleteFarm, editFarm } from "../../../../network/apis";
import { IFramDetails } from "../../../../types/farm.type";

type ParamList = {
  FarmDetailsScreen: IFramDetails;
};

export const EditFarmScreen = () => {
  const route = useRoute<RouteProp<ParamList, "FarmDetailsScreen">>();
  const navigation = useNavigation<any>();
  const [name, setName] = useState<string | undefined>(route.params.name);
  const [note, setNote] = useState<string | undefined>(route.params.note);
  const [area, setArea] = useState<number | undefined>(route.params.area);
  const [description, setDescription] = useState(route.params.description);
  const [address, setAddress] = useState<string | undefined>(
    route.params.address
  );

  const goBack = () => {
    navigation.goBack();
  };

  const handleEditFarm = async () => {
    try {
      const res = await editFarm({
        id: route.params.id,
        name: name,
        area: area,
        description: description,
        note: note,
        address: address,
      });
      if (res.data.Data.isSuccess) {
        Alert.alert("Thành công", "Thành công chỉnh sửa nông trại", [
          { text: "OK", onPress: () => goBack() },
        ]);
      } else {
        Alert.alert("Lỗi", `Chỉnh sửa không thành công`, [{ text: "OK" }]);
      }
    } catch (error) {
      Alert.alert("Lỗi", `${error}`, [{ text: "OK", onPress: () => goBack() }]);
    }
  };
  const handleDeleteFarm = async () => {
    Alert.alert("Thông báo", `Bạn có chắc chắn muốn xóa ${route.params.name}`, [
      {
        text: "Cancel",
      },
      { text: "OK", onPress: async () => await handleDeleteFarm1() },
    ]);
  };
  const handleDeleteFarm1 = async () => {
    try {
      const res = await deleteFarm(route.params.id);
      if (res.data.Data.isSuccess) {
        Alert.alert("Thành công", "Thành công xóa nông trại", [
          { text: "OK", onPress: () => goBack() },
        ]);
      } else {
        Alert.alert("Lỗi", `Xóa nông trại không thành công`, [{ text: "OK" }]);
      }
    } catch (error) {
      Alert.alert("Lỗi", `${error}`, [{ text: "OK", onPress: () => goBack() }]);
    }
  };

  return (
    <SafeAreaView>
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
        <Text style={{ fontSize: 18, color: "white" }}>
          Chỉnh sửa nông trại
        </Text>
      </View>
      <View>
        <View style={styles.container}>
          <Text style={styles.label}>Tên nông trại:</Text>
          <TextInput
            style={styles.dropdown}
            onChangeText={(e) => setName(e)}
            value={name != undefined || name != null ? name.toString() : ""}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Chi tiết:</Text>
          <TextInput
            style={styles.dropdown}
            onChangeText={(e) => setDescription(e)}
            value={
              description != undefined || description != null
                ? description.toString()
                : ""
            }
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Diện tích (m2):</Text>
          <TextInput
            style={styles.dropdown}
            onChangeText={(e) => setArea(Number(e))}
            value={area != undefined || area != null ? String(area) : ""}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <TextInput
            style={styles.dropdown}
            onChangeText={(e) => setAddress(e)}
            value={
              address != undefined || address != null ? address.toString() : ""
            }
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Ghi chú:</Text>
          <TextInput
            style={styles.dropdown}
            onChangeText={(e) => setNote(e)}
            value={note != undefined || note != null ? note.toString() : ""}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.fixToText}>
            <Button
              title="Lưu chỉnh sửa"
              color={AppColors.primaryColor}
              onPress={() => handleEditFarm()}
            />
            <Button
              title="Xóa nông trại"
              color={"red"}
              onPress={() => handleDeleteFarm()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    marginTop: 15,
    height: 50,
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
  },
});
