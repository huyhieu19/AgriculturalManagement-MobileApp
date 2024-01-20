import {
  View,
  Text,
  Pressable,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../../../global";
import { AntDesign } from "@expo/vector-icons";
import { RootStackParamList } from "../../../AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { createModule } from "../../../network/apis";

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ModuleAddScreen"
>;

const ModuleAddScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [moduleId, setModuleId] = React.useState<string>("");
  const [nameRef, setNameRef] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleAddNew = async () => {
    if (moduleId.length == 36) {
      try {
        setIsLoading(true);
        const res = await createModule({ moduleId, nameRef });
        if (res.data.ErrorMessage == null || res.data.Data != null) {
          setIsLoading(false);
          Alert.alert("Lỗi thêm mới", `Thêm mới module thành công`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          navigation.goBack();
        } else {
          setIsLoading(false);
          Alert.alert("Lỗi thêm mới", `Thêm mới module không thành công`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        Alert.alert("Lỗi thêm mới", `Thêm mới module không thành công`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } finally {
        navigation.navigate("ModulesScreen");
      }
    } else {
      Alert.alert("Lỗi thêm mới", `Mã số cần đủ 36 ký tự`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };
  return (
    <SafeAreaView>
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
          onPress={() => {
            navigation.navigate("ModulesScreen");
          }}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Thêm mới Module
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Mã module:</Text>
        <TextInput
          multiline={true}
          style={styles.dropdown}
          onChangeText={(e) => setModuleId(e)}
          value={moduleId}
          placeholder="Nhập mã module (36 ký tự)"
          inputMode="text"
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Tên module:</Text>
        <TextInput
          multiline={true}
          style={styles.dropdown}
          onChangeText={(e) => setNameRef(e)}
          value={nameRef}
          placeholder="Nhập tên mudule"
          inputMode="text"
        />
      </View>
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
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      )}
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
    width: "73%",
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
    width: "23%",
    marginTop: 20,
    marginLeft: 5,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: "65%",
  },
  Inputlabel: {
    minWidth: "25%", // Fixed width for labels
    marginRight: 15,
  },
  buttonContainer: {
    flexDirection: "row", // Set flexDirection to 'row'
    alignItems: "center", // Align items vertically in the center
  },
});

export default ModuleAddScreen;
