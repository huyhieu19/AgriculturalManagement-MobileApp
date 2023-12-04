import {
  View,
  Text,
  Pressable,
  Alert,
  TextInput,
  StyleSheet,
  Button
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppColors } from "../../../../global/styles/AppColors";
import { createZone } from "../../../../network/apis";
import { IFramDetails } from "../../../../types/farm.type";

type ParamList = {
	FarmDetailsScreen: IFramDetails;
};


export const AddNewZoneScreen = () => {
  const route = useRoute<RouteProp<ParamList, "FarmDetailsScreen">>();
  const navigation = useNavigation<any>();
  const farm = route?.params ?? [];
  const [zoneName, setZoneName] = useState("Khu");
  const [function1, setFunction1] = useState("Trồng");
  const [area, setArea] = useState(0);
  const [description, setDescription] = useState("Đây là khu trong farm");
  const [note, setNote] = useState("Chú ý");

  const handleAddNew = async () => {
    // Perform API request to add new item
    try {
      const res = await createZone({
        zoneName: zoneName,
        farmId: farm.id,
        area: area,
        description: description,
        note: note,
        function : function1
      });
      if (res.data.Data.isSuccess) {
        Alert.alert("Thành công", "Thành công thêm khu mới", [
          { text: "OK"},
        ]);
      } else {
        Alert.alert("Lỗi thêm mới", `Thêm mới khu không thành công`, [
          { text: "OK"},
        ]);
      }
    } catch (error) {
      Alert.alert("Lỗi thêm mới", `${error}`, [
        { text: "OK"},
      ]);
    }
  };

  const GoBack = () => {
    navigation.navigate("ListFarmScreen");
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
          onPress={GoBack}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text style={{ fontSize: 18, color: "white" }}>
          Thêm mới khu trong nông trại
        </Text>
      </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Id Nông trại:</Text>
          <TextInput
            style={styles.inputFarmId}
            value= {farm.id.toString()}
            editable={false}
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Tên khu:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setZoneName(e)}
            value={zoneName}
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Chi tiết:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setDescription(e)}
            value={description}
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Diện tích (m2):</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setArea(Number(e))}
            value = {String(area)}
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Chức năng:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setFunction1(e)}
            value={function1}
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Chú ý:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setNote(e)}
            value={note}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.fixToText}>
              <Button
                  title="Thêm mới"
                  color={AppColors.primaryColor}
                  onPress={() => handleAddNew()}
              />
              <Button
                  title="Quay lại"
                  color={"red"}
                  onPress={() => GoBack()}
              />
          </View>
        </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fixToText: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
  inputFarmId: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: "65%",
    backgroundColor: 'gray',
    color: 'white'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: "65%"
  },
  Inputcontainer: {
    flexDirection: 'row', // Set flexDirection to 'row'
    alignItems: 'center', // Align items vertically in the center

    marginBottom: 10,
  },
  Inputlabel: {
    minWidth: '25%', // Fixed width for labels
    marginRight: 5, // Add some margin between the label and input
  },
  buttonContainer: {
    flexDirection: 'row', // Set flexDirection to 'row'
    alignItems: 'center', // Align items vertically in the center
  }
});
