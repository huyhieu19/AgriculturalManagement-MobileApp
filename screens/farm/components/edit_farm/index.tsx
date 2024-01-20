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
import { deleteFarm, editFarm } from "../../../../network/apis";
import { IFramDetails } from "../../../../types/farm.type";
import { AppStyles } from "../../../../global";

type ParamList = {
  FarmDetailsScreen: IFramDetails;
};

export const EditFarmScreen = () => {
  const route = useRoute<RouteProp<ParamList, "FarmDetailsScreen">>();
  const navigation = useNavigation<any>();
  const [name, setName] = useState<string | undefined>(route.params.name);
  const [note, setNote] = useState<string | undefined>(route.params.note);
  const [area, setArea] = useState<string | undefined>(
    String(route.params.area)
  );
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
        area: Number(area),
        description: description,
        note: note,
        address: address,
      });
      if (res.data.Data.isSuccess) {
        Alert.alert("Thành công", "Thành công chỉnh sửa nông trại", [
          { text: "OK", onPress: () => goBack() },
        ]);
      } else {
        Alert.alert("Lỗi", `Chỉnh sửa không thành công`, [
          { text: "OK", onPress: () => goBack() },
        ]);
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
      {
        text: "OK",
        onPress: async () => {
          await handleDeleteFarm1();
        },
      },
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
        Alert.alert("Lỗi", `Xóa nông trại không thành công`, [
          { text: "OK", onPress: () => goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert("Lỗi", `${error}`, [{ text: "OK", onPress: () => goBack() }]);
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
            placeholder="Nhập tên nông trại"
            inputMode="text"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Chi tiết:</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.dropdown}
            onChangeText={(e) => setDescription(e)}
            value={
              description != undefined || description != null
                ? description.toString()
                : ""
            }
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
            value={area != undefined || area != null ? String(area) : ""}
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
            value={
              address != undefined || address != null ? address.toString() : ""
            }
            placeholder="Nhập địa chỉ nông trại"
            inputMode="text"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Ghi chú:</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.dropdown}
            onChangeText={(e) => setNote(e)}
            value={note != undefined || note != null ? note.toString() : ""}
            placeholder="Nhập ghi chú cho nông trại"
            inputMode="text"
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
    marginBottom: 20,
  },
});
