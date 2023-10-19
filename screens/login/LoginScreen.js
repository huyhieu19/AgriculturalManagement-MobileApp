import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { login } from "../../apis/login";

export default function LoginScreen() {
  const navigation = useNavigation();
  const params = useRoute();

  const [loginValue, setLoginValue] = useState({
    email: params?.params?.email ?? "",
    password: params?.params?.password ?? "",
  });

  const [error, setError] = useState("");

  const handleLogin = () => {
    login({
      email: loginValue.email,
      password: loginValue.password,
    }).then((response) => {
      const success = response.data.Success;
      const error = response.data.ErrorMessage;
      if (success == true) {
        navigation.push("Home");
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

  const handleChangeForm = (name) => (value) => {
    setLoginValue({
      ...loginValue,
      [name]: value,
    });
  };
  const disableButton = loginValue.email == "" || loginValue.password == "";

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={require("../../assets/images/background.png")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />

      {/* Lights */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          position: "absolute",
        }}
      ></View>

      {/* Title and Form */}
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          paddingTop: 40,
          paddingBottom: 10,
        }}
      >
        {/* Title */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
            Đăng Nhập
          </Text>
        </View>

        {/* Form */}
        <View
          style={{
            alignItems: "center",
            marginHorizontal: 5,
            marginVertical: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              padding: 10,
              borderRadius: 10,
              width: "90%",
              height: 50,
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              value={loginValue.email}
              onChangeText={(text) => handleChangeForm("email")(text)}
            />
          </View>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              padding: 10,
              borderRadius: 10,
              width: "90%",
              marginBottom: 10,
              marginTop: 10,
              height: 50,
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Mật khẩu"
              placeholderTextColor="gray"
              secureTextEntry
              value={loginValue.password}
              onChangeText={(text) => handleChangeForm("password")(text)}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#00c4ff",
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
              width: 150,
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Đăng Nhập
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity
              onPress={() => navigation.push("Signup")}
              disabled={disableButton}
            >
              <Text style={{ color: "#00c4ff" }}>Đăng kí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
