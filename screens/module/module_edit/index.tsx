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
import { IModule } from "../../../types/module.type";
import { editModule, removeModuleFromUser } from "../../../network/apis";
import { AppColors } from "../../../global";

type ParamList = {
  Module: IModule;
};

export const EditModuleScreen = () => {
  const route = useRoute<RouteProp<ParamList, "Module">>();
  const navigation = useNavigation<any>();

  const [nameRef, setNameRef] = useState<string | undefined>(
    route.params.nameRef
  );
  const [note, setNote] = useState<string | undefined>(route.params?.note!);

  const goBack = () => {
    navigation.goBack();
  };

  const handleEditModule = async () => {
    try {
      const res = await editModule({
        id: route.params.id,
        nameRef: nameRef,
        note: note,
      });
      if (res.data.Data === null || res.data.Data === undefined) {
        Alert.alert("Lỗi", `Chỉnh sửa không thành công`, [{ text: "OK" }]);
      } else {
        Alert.alert("Thành công", "Thành công chỉnh sửa module", [
          { text: "OK", onPress: () => goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert("Lỗi", `${error}`, [{ text: "OK", onPress: () => goBack() }]);
    }
  };
  const handleDeleteModule = async () => {
    Alert.alert("Thông báo", `Bạn có chắc chắn muốn xóa ${route.params.name}`, [
      {
        text: "Cancel",
      },
      { text: "OK", onPress: async () => await RemoveModule() },
    ]);
  };
  const RemoveModule = async () => {
    Alert.alert("Xóa Module", "Bạn có chắc chắn muốn xóa?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            const res = await removeModuleFromUser(route.params.id);
            if (res.data.Data) {
              Alert.alert("Thành công", "Thành công xóa module", [
                { text: "OK", onPress: () => goBack() },
              ]);
            }
          } catch (error) {
            Alert.alert("Lỗi", `${error}`, [
              { text: "OK", onPress: () => goBack() },
            ]);
          }
        },
      },
    ]);
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
        <Text style={{ fontSize: 18, color: "white" }}>Chỉnh sửa module</Text>
      </View>
      <View>
        <View style={styles.container}>
          <Text style={styles.label}>Tên module:</Text>
          <TextInput
            style={styles.dropdown}
            onChangeText={(e) => setNameRef(e)}
            value={
              nameRef != undefined || nameRef != null ? nameRef.toString() : ""
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
              onPress={() => handleEditModule()}
            />
            <Button
              title="Xóa module này"
              color={"red"}
              onPress={() => handleDeleteModule()}
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
