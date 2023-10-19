import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../apis/register";

function SignupScreen() {
  const navigation = useNavigation();
  const [registerValue, setRegisterValue] = useState({
    userName: "",
    email: "",
    password: "",
    re_enterPassword: "",
  });

  const handleChangeForm = (name) => (value) => {
    setRegisterValue({
      ...registerValue,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    register({
      firstName: "",
      lastName: "",
      userName: registerValue.userName,
      password: registerValue.password,
      email: registerValue.email,
      phoneNumber: "",
      roles: ["Administrator"],
    }).then((response) => {
      const success = response.data.Success;
      const error = response.data.ErrorMessage;
      if (success == true) {
        navigation.push("Login", {
          email: registerValue.email,
          password: registerValue.password,
        });
      } else {
        Alert.alert(
          "Error",
          `${error}`,
          [
            {
              text: "OK",
              style: "cancel", // Đánh dấu lựa chọn này như lựa chọn hủy
            },
          ],
          { cancelable: false } // Ngăn chặn người dùng đóng thông báo bằng cách bấm nút Back
        );
      }
    });
  };

  const disableButton =
    registerValue.email == "" ||
    registerValue.userName == "" ||
    registerValue.password == "" ||
    registerValue.re_enterPassword == "" ||
    registerValue.password != registerValue.re_enterPassword;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />

      {/* Title and Form */}
      <View style={styles.titleAndFormContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Đăng kí</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tên người dùng"
              placeholderTextColor="gray"
              onChangeText={handleChangeForm("userName")}
              value={registerValue.userName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              textContentType="emailAddress"
              placeholderTextColor="gray"
              onChangeText={handleChangeForm("email")}
              value={registerValue.email}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor="gray"
              secureTextEntry
              onChangeText={handleChangeForm("password")}
              value={registerValue.password}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="gray"
              secureTextEntry
              onChangeText={handleChangeForm("re_enterPassword")}
              value={registerValue.re_enterPassword}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={disableButton}
            >
              <Text style={styles.buttonText}>Đăng kí</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linkContainer}>
            <Text>Bạn đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.push("Login")}>
              <Text style={styles.linkText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
  },

  titleAndFormContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 48,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  formContainer: {
    flex: 3,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 15,
  },
  input: {
    color: "#2f3023",
  },
  buttonContainer: {
    width: 150,
  },
  button: {
    backgroundColor: "#33C3F0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  linkText: {
    color: "#33C3F0",
  },
});
export default SignupScreen;
