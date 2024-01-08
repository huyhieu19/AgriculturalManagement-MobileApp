import React from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
  useWindowDimensions,
  StyleSheet,
  Text,
  Alert,
  Button,
} from "react-native";
import { AppColors, AppStyles } from "../../../global";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { UserRegisterationModel } from "../../../network/models/RegisterModel";
import { UserRegister } from "../../../network/apis/register.api";
import { useNavigation } from "@react-navigation/native";
const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { width: screenWidth } = useWindowDimensions();
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [fname, setFname] = React.useState<string>("");
  const [lname, setLname] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [role, setRole] = React.useState<string[]>([
    "Manager",
    "Administrator",
  ]);
  const [password, setPassword] = React.useState<string>("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState<boolean>(true);
  const showPasswordIconName = React.useMemo(() => {
    return isPasswordHidden ? "eye" : "eye-off";
  }, [isPasswordHidden]);
  const [isBusy, setIsBusy] = React.useState<boolean>(false);

  const RegisterHandler = async () => {
    try {
      const params: UserRegisterationModel = {
        email: email,
        firstName: fname,
        lastName: lname,
        password: password,
        phoneNumber: phoneNumber,
        roles: role,
        userName: name,
      };
      const res = await UserRegister(params);
      if (res.data.Success) {
        Alert.alert("Lỗi đăng ký", `Đăng ký tài khoản không thành công`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        navigation.navigate("LoginScreen");
      } else {
        Alert.alert("Lỗi đăng ký", `Đăng ký tài khoản không thành công`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (ex) {
      Alert.alert("Lỗi đăng ký", `Đăng ký tài khoản không thành công`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <SafeAreaView
      style={[
        AppStyles.appContainer,
        {
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <View style={styles.textFieldContainer}>
          <Feather name="mail" size={24} color={AppColors.slate300} />
          <TextInput
            placeholder={"Email"}
            style={styles.textField}
            value={email}
            onChangeText={(newValue) => setEmail(newValue)}
          />
        </View>
        <View style={styles.textFieldContainer}>
          <AntDesign name="user" size={24} color={AppColors.slate300} />
          <TextInput
            placeholder={"Name"}
            style={styles.textField}
            value={name}
            onChangeText={(newValue) => setName(newValue)}
          />
        </View>
        <View style={styles.textFieldContainer}>
          <Feather name="lock" size={24} color={AppColors.slate300} />
          <TextInput
            secureTextEntry={isPasswordHidden}
            placeholder={"Mật khẩu"}
            style={styles.textField}
            value={password}
            onChangeText={(newValue) => setPassword(newValue)}
          />
          <Pressable onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
            <Feather
              name={showPasswordIconName}
              size={24}
              color={AppColors.slate300}
            />
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.fixToText}>
            <Button
              title="Đăng ký"
              color={AppColors.primaryColor}
              onPress={() => RegisterHandler()}
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
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  textFieldContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.bgWhite,
    borderWidth: 0.5,
    borderColor: AppColors.slate300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  textField: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 15,
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
