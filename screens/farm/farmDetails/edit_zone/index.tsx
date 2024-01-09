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
import { deleteZone, editZone } from "../../../../network/apis";
import { IZoneParams, IZoneUpdateModel } from "../../../../types/zone.type";
import { AppStyles } from "../../../../global";

type ParamList = {
  Zone: IZoneParams;
};

export const EditZoneScreen = () => {
  const routeZone = useRoute<RouteProp<ParamList, "Zone">>();
  const navigation = useNavigation<any>();

  const [name, setName] = useState<string | undefined>(
    routeZone.params.zoneName
  );
  const [note, setNote] = useState<string | undefined>(routeZone.params.note);
  const [funct, setFunct] = useState<string | undefined>(
    routeZone.params.function
  );
  const [area, setArea] = useState<string | undefined>(
    String(routeZone.params.area)
  );
  const [description, setDescription] = useState(routeZone.params.description);

  const goBack = () => {
    navigation.goBack();
  };

  const handleEditZone = async () => {
    try {
      const paramsUpdate: IZoneUpdateModel = {
        id: routeZone.params.id,
        zoneName: name!,
        area: Number(area),
        description: description!,
        note: note!,
        timeToStartPlanting: routeZone.params.timeToStartPlanting!,
        dateCreateFarm: routeZone.params.dateCreateFarm!,
        function: funct!,
        typeTreeId: null,
        farmId: routeZone.params.farmId!,
      };
      const res = await editZone(paramsUpdate);
      if (res.data.Data.isSuccess) {
        Alert.alert("Thành công", "Thành công chỉnh sửa khu", [
          {
            text: "OK",
            onPress: () => goBack(),
          },
        ]);
      } else {
        Alert.alert("Lỗi", `Chỉnh sửa khu không thành công`, [
          { text: "OK", onPress: () => goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert("Lỗi", `${error}`, [{ text: "OK", onPress: () => goBack() }]);
    }
  };
  const handleDeleteZone = async () => {
    try {
      const res = await deleteZone(
        routeZone.params.id,
        routeZone.params?.farmId!
      );
      if (res.data.Data.isSuccess) {
        Alert.alert("Thành công", "Thành công xóa khu", [{ text: "OK" }]);
      } else {
        Alert.alert("Lỗi", `Xóa khu không thành công`, [{ text: "OK" }]);
      }
    } catch (error) {
      Alert.alert("Lỗi", `${error}`, [{ text: "OK" }]);
    } finally {
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
        <Text style={{ fontSize: 18, color: "white" }}>
          Chỉnh sửa khu trong nông trại
        </Text>
      </View>

      <View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Tên khu:</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            onChangeText={(e) => setName(e)}
            value={name != undefined || name != null ? name.toString() : ""}
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
            value={
              description != undefined || description != null
                ? description.toString()
                : ""
            }
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
            value={area != undefined || area != null ? String(area) : ""}
            placeholder="Nhập diện tích khu"
            inputMode="decimal"
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Chức năng:</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            onChangeText={(e) => {
              setFunct(e);
            }}
            value={funct != undefined || funct != null ? funct.toString() : ""}
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
            value={note != undefined || note != null ? note.toString() : ""}
            placeholder="Nhập ghi chú của khu"
            inputMode="text"
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.fixToText}>
            <Button
              title="Lưu chỉnh sửa"
              color={AppColors.primaryColor}
              onPress={() => handleEditZone()}
            />
            <Button
              title="Xóa khu này"
              color={"red"}
              onPress={() => handleDeleteZone()}
            />
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
    margin: 12,
    padding: 10,
    backgroundColor: "gray",
    color: "white",
    width: "70%",
    marginRight: 27,
    marginTop: 10,
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
  },
});
