//import liraries
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyle";
import {
  IC_NOTIFICATION,
  IC_FARM,
  IC_AGRICULTURE,
  IC_PROFILE,
  IC_USER,
} from "../../../assets/icons/index";
// home
const HomeTab = () => {
  const params = useRoute();
  const Email = params?.params?.email ?? "abc";
  return (
    <SafeAreaView>
      <View
        style={
          Platform.OS === "android" ? styles.containerAndroid : styles.container
        }
      >
        <StatusBar style="dar" />
        <View style={styles.body}>
          <View style={styles.container1}>
            <Image
              style={styles.icon1}
              resizeMode="cover"
              source={IC_AGRICULTURE}
            />
            <Text style={styles.title}>Agricultural Management</Text>
            <Image
              style={styles.icon2}
              resizeMode="cover"
              source={IC_NOTIFICATION}
            />
          </View>
          <View style={styles.boxUserName}>
            <Text style={styles.boxUserName_text}>Xin chào</Text>
            <Image
              style={styles.boxUserName_icon}
              resizeMode="cover"
              source={IC_USER}
            />
          </View>
          <View style={styles.List}>
            <View style={styles.List_Farm_Device}>
              <View style={styles.List_child}></View>
              <View style={styles.List_child}></View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
function getIcon(focus, source) {
  return (
    <Image
      style={[
        {
          width: 48,
          height: 48,
        },
        {
          tintColor: focus ? "#38bdf8" : "gray",
        },
      ]}
      source={source}
    />
  );
}
const styles = StyleSheet.create({
  containerAndroid: {
    marginTop: 27,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  container: {},

  body: {
    flexDirection: "column",
  },
  container1: {
    width: "100%",
    height: 48,
    backgroundColor: "#2c94de",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  icon1: {
    width: 40,
    height: 40,
    position: "absolute",
    left: 9,
    top: 5,
  },
  title: {
    width: 250,
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
    position: "absolute",
    left: 70,
    top: 10,
  },
  icon2: {
    width: 24,
    height: 24,
    position: "absolute",
    left: 352,
    top: 13,
    borderWidth: 1,
  },

  boxUserName: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    top: 30,
    borderColor: "#000",
  },
  boxUserName_icon: {
    width: 40,
    height: 40,
  },
  boxUserName_text: {
    color: "blue",
    fontSize: 10,
  },
  List: {
    marginTop: 80,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  List_Farm_Device: {
    flexDirection: "row",
  },
  List_child: {
    width: "45%",
    height: 150,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeTab;
