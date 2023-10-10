//import liraries
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyle";
// home
const HomeTab = () => {
  return (
    <SafeAreaView>
      <View className={`${Platform.OS === "android" ? "bg-light flex" : ""}`}>
        <StatusBar style="dar" />
        <View className={`${Platform.OS === "android" ? "mt-8" : ""}  h-full`}>
          <View style={styles.trangChuser}>
            <View style={[styles.setting, styles.thngKLayout]}>
              <Text style={styles.ciT}>Cài đặt</Text>
              <View style={styles.thngChildShadowBox} />
              <Image
                style={styles.vectorIcon3}
                resizeMode="cover"
                source={require("../../../assets/icons/ic_settings.jpg")}
              />
            </View>
            <View style={[styles.thngK, styles.thngKLayout]}>
              <Text style={styles.ciT}>Thống kê</Text>
              <View style={styles.thngChildShadowBox} />
              <Image
                style={styles.vectorIcon4}
                resizeMode="cover"
                source={require("../../../assets/icons/ic_analytics.png")}
              />
            </View>
            <View style={[styles.nhimV1, styles.nhimV1Position]}>
              <Text style={styles.ciT}>Nhiệm vụ</Text>
              <View style={styles.thngChildShadowBox} />
              <Image
                style={[styles.vectorIcon5, styles.vectorIconPosition1]}
                resizeMode="cover"
                source={require("../../../assets/icons/ic_to-do-list.png")}
              />
            </View>
            <View style={[styles.thngBo, styles.nhimV1Position]}>
              <Text style={styles.ciT}>Thông báo</Text>
              <View style={styles.thngChildShadowBox} />
              <Image
                style={[styles.vectorIcon6, styles.vectorIconPosition]}
                resizeMode="cover"
                source={require("../../../assets/icons/ic_notification.png")}
              />
            </View>
            <View style={[styles.qunLThitB, styles.qunPosition]}>
              <Text style={styles.ciT}>Quản lý thiết bị</Text>
              <View style={styles.thngChildShadowBox} />
              <Image
                style={[styles.vectorIcon7, styles.vectorIconPosition1]}
                resizeMode="cover"
                source={require("../../../assets/icons/ic_growth.png")}
              />
            </View>
            <View style={[styles.qunLNngTri, styles.qunPosition]}>
              <Text style={styles.ciT}>{`Quản lý nông trại`}</Text>
              <View style={styles.thngChildShadowBox} />
              <Image
                style={[styles.vectorIcon8, styles.vectorIconPosition]}
                resizeMode="cover"
                source={require("../../../assets/icons/ic_farm.png")}
              />
            </View>
            <View style={[styles.userNameBar, styles.barLayout]}>
              <View style={[styles.bar, styles.barLayout]} />
              <View style={[styles.activeStatus, styles.image18IconLayout]} />
              <Image
                style={[styles.image18Icon, styles.image18IconLayout]}
                resizeMode="cover"
                source={require("../../../assets/icons/ic_user.png")}
              />
              <Text style={[styles.userName, styles.logoTopLayout]}>
                User name
              </Text>
            </View>
            <View style={[styles.logoTop, styles.logoTopLayout]}>
              <View
                style={[styles.logoTopChild, styles.logoPosition]}
                resizeMode="cover"
              />
              <Text
                style={[styles.agriculturalManagement, styles.logoTopLayout]}
              >
                Agricultural Management
              </Text>
              <Image
                style={styles.notification1Icon}
                resizeMode="cover"
                source={require("../../../assets/icons/ic_notification.png")}
              />
              <Image
                style={styles.agriculture1Icon}
                resizeMode="cover"
                source={require("../../../assets/icons/ic_agriculture.png")}
              />
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
  bottomLayout: {
    height: 70,
    width: 348,
    position: "absolute",
  },
  barBorder: {
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    left: 0,
    top: 0,
  },
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    top: "0%",
    position: "absolute",
    overflow: "hidden",
  },
  cNhn1Typo: {
    height: 24,
    color: Color.colorBlack,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBoldItalic,
    fontWeight: "600",
    fontStyle: "italic",
    lineHeight: 19,
    letterSpacing: 0.1,
    fontSize: FontSize.size_sm,
    left: 0,
    position: "absolute",
  },
  thngKLayout: {
    height: 163,
    top: 539,
    width: 125,
    position: "absolute",
  },
  nhimV1Position: {
    top: 328,
    height: 163,
    width: 125,
    position: "absolute",
  },
  vectorIconPosition1: {
    right: "26.4%",
    width: "48.2%",
    left: "26.4%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  vectorIconPosition: {
    top: "14.11%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  qunPosition: {
    top: 141,
    height: 163,
    width: 135,
    position: "absolute",
  },
  barLayout: {
    height: 53,
    width: 346,
    position: "absolute",
  },
  image18IconLayout: {
    borderRadius: Border.br_81xl,
    position: "absolute",
  },
  logoTopLayout: {
    height: 50,
    position: "absolute",
    color: "black",
  },
  logoPosition: {
    left: 0,
    top: 0,
    backgroundColor: "#5EBEE7",
  },
  trangCh1: {
    top: 28,
    color: Color.colorLightskyblue,
    width: 80,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBoldItalic,
    fontWeight: "600",
    fontStyle: "italic",
    lineHeight: 19,
    letterSpacing: 0.1,
    fontSize: FontSize.size_sm,
    left: 0,
    position: "absolute",
  },
  trangCh: {
    height: "81.43%",
    width: "22.99%",
    top: "18.57%",
    right: "73.28%",
    bottom: "0%",
    left: "3.74%",
    position: "absolute",
  },
  thiTit1: {
    top: 38,
    width: 74,
  },
  vectorIcon1: {
    height: "54.84%",
    width: "47.3%",
    right: "25.68%",
    bottom: "45.16%",
    left: "27.03%",
  },
  thiTit: {
    top: 6,
    left: 143,
    height: 62,
    width: 74,
    position: "absolute",
  },
  vectorIcon2: {
    height: "48.67%",
    width: "23.84%",
    right: "43.55%",
    bottom: "51.33%",
    left: "32.61%",
  },
  cNhn1: {
    top: 34,
    width: 92,
  },
  cNhn: {
    height: "82.86%",
    width: "26.44%",
    top: "12.86%",
    right: "0%",
    bottom: "4.29%",
    left: "73.56%",
    position: "absolute",
  },
  bottomBar: {
    top: 750,
    left: 21,
  },
  ciT: {
    top: 137,
    height: 26,
    width: 125,
    color: Color.colorBlack,
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBoldItalic,
    fontWeight: "600",
    fontStyle: "italic",
    lineHeight: 19,
    letterSpacing: 0.1,
    fontSize: FontSize.size_sm,
    left: 0,
    position: "absolute",
  },
  thngChildShadowBox: {
    height: 125,
    borderColor: Color.colorGray,
    borderRadius: Border.br_11xl,
    width: 125,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    left: 0,
    top: 0,
    position: "absolute",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  vectorIcon3: {
    height: "39.87%",
    width: "52%",
    right: "24%",
    left: "24%",
    bottom: "41.12%",
    top: "19.01%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  setting: {
    left: 238,
  },
  vectorIcon4: {
    height: "38.64%",
    width: "46.4%",
    right: "27.2%",
    left: "26.4%",
    bottom: "42.35%",
    top: "19.01%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  thngK: {
    left: 34,
  },
  vectorIcon5: {
    height: "41.09%",
    top: "17.79%",
    bottom: "41.12%",
  },
  nhimV1: {
    left: 238,
  },
  vectorIcon6: {
    height: "49.68%",
    width: "60.96%",
    right: "19.84%",
    bottom: "36.21%",
    left: "19.2%",
  },
  thngBo: {
    left: 34,
  },
  vectorIcon7: {
    height: "39.25%",
    top: "18.4%",
    bottom: "42.35%",
    right: "26.4%",
    width: "47.2%",
  },
  qunLThitB: {
    left: 238,
  },
  vectorIcon8: {
    height: "47.84%",
    width: "60%",
    right: "20%",
    bottom: "38.05%",
    left: "20%",
  },
  qunLNngTri: {
    left: 34,
  },
  bar: {
    borderRadius: 10,
    borderColor: Color.colorLightskyblue,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    left: 0,
    top: 0,
  },
  activeStatus: {
    top: 16,
    left: 309,
    backgroundColor: "#00fb37",
    width: 20,
    height: 20,
  },
  image18Icon: {
    left: 8,
    width: 50,
    height: 51,
    top: 1,
  },
  userName: {
    left: 60,
    width: 182,
    lineHeight: 20,
    letterSpacing: 2.9,
    fontSize: FontSize.size_mini,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBoldItalic,
    fontWeight: "600",
    fontStyle: "italic",
    top: 15,
    color: Color.colorBlack,
  },
  userNameBar: {
    top: 63,
    left: 21,
  },
  logoTopChild: {
    width: 491,
    height: 58,
    position: "absolute",
  },
  agriculturalManagement: {
    left: 60,
    color: Color.colorWhite,
    width: 270,
    lineHeight: 20,
    letterSpacing: 2.9,
    fontSize: FontSize.size_mini,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.poppinsSemiBoldItalic,
    fontWeight: "700",
    fontStyle: "italic",
    top: 15,
  },
  notification1Icon: {
    top: 13,
    left: 362,
    width: 25,
    height: 25,
    position: "absolute",
  },
  agriculture1Icon: {
    top: 5,
    left: 9,
    width: 40,
    height: 40,
    position: "absolute",
  },
  logoTop: {
    width: 490,
    left: 0,
    top: 0,
  },
  trangChuser: {
    backgroundColor: "#e7f2e7",
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
});
export default HomeTab;
