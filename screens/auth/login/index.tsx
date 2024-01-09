import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { AppColors, AppStyles } from "../../../global";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../hooks/useAuth";
import { Helper } from "../../../network/helper";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../../network/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen: React.FC = () => {
  const { width: screenWidth } = useWindowDimensions();
  const [email, setEmail] = React.useState<string>("test@gmail.com");
  const [password, setPassword] = React.useState<string>("12345678");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState<boolean>(true);
  const [isBusy, setIsBusy] = React.useState<boolean>(false);
  const [loginError, setLoginError] = React.useState<string>("");

  const { signIn } = useAuth();
  const navigation = useNavigation<any>();

  const showPasswordIconName = React.useMemo(() => {
    return isPasswordHidden ? "eye" : "eye-off";
  }, [isPasswordHidden]);

  const loginHandler = async () => {
    try {
      setIsBusy(true);
      const loginPayload = {
        email: email,
        password: password,
      };
      const res = await login(loginPayload);
      if (Helper.isSuccess(res)) {
        await AsyncStorage.setItem(
          "access-token",
          res.data.Data.tokenModel.accessToken
        );
        signIn({
          user: res.data.Data.profile,
          token: res.data.Data.tokenModel.accessToken,
        });
      }
    } catch (e) {
      setLoginError("Error occurs. Please retry");
      console.log(e);
    } finally {
      setIsBusy(false);
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
        <Pressable
          onPress={async () => {
            await loginHandler();
          }}
        >
          <View
            style={[
              {
                paddingVertical: 14,
                borderRadius: 10,
                backgroundColor: AppColors.primaryColor,
                justifyContent: "center",
                alignItems: "center",
                width: screenWidth - 40,
                position: "relative",
              },
              {
                // opacity: isBusy ? 0.6 : 1
              },
            ]}
          >
            {isBusy ? (
              <ActivityIndicator size={"small"} color={AppColors.bgWhite} />
            ) : (
              <Text
                style={{
                  color: AppColors.bgWhite,
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Đăng nhập
              </Text>
            )}
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("RegisterScreen");
            console.log("register");
          }}
        >
          <Text>Chưa có tài khoản bấm vào đây.</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
});
