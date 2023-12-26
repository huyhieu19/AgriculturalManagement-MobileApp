import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  ThresholdDisplayModel,
  ThresholdUpdateModel,
} from "../../../../network/models/setting_threshold/ThresholdModel";
import { AppColors } from "../../../../global";
import { FontAwesome } from "@expo/vector-icons";
import {
  removeThres,
  updateThres,
} from "../../../../network/apis/settings.api";
import { DeviceInfo } from "../../../../network/apis/device.api";
import { DeviceInformationDisplayModel } from "../../../../network/models/device_display/deviceInfor";
import { useIsFocused } from "@react-navigation/native";
interface ListThresItemProps {
  thres: ThresholdDisplayModel;
  onPressHandelModel: () => void;
  onPressRefresh: () => void;
}

export default function UpdateThresholdModal(
  props: Readonly<ListThresItemProps>
) {
  const [openValue, setOpenValue] = useState<string | null>(
    String(props.thres.thresholdValueOn)
  );
  const [closeValue, setCloseValue] = useState<string | null>(
    String(props.thres.thresholdValueOff)
  );
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [deviceDriverInfor, setDeviceDriverInfo] =
    useState<DeviceInformationDisplayModel>();
  const [deviceInstrumentationInfor, setDeviceInstrumentationInfo] =
    useState<DeviceInformationDisplayModel>();

  const isFocus = useIsFocused();
  const UpdateThreshold = async () => {
    const params: ThresholdUpdateModel = {
      deviceDriverId: props.thres.deviceDriverId,
      id: props.thres.id,
      instrumentationId: props.thres.instrumentationId,
      typeDevice: props.thres.typeDevice,
      onInUpperThreshold: props.thres.onInUpperThreshold,
      thresholdValueOff: Number(closeValue),
      thresholdValueOn: Number(openValue),
    };
    try {
      const res = await updateThres(params);
      if (res.data.Success && res.data.Data) {
        Alert.alert("Thành công", `Cập nhật thành công giá trị ngưỡng`, [
          {
            text: "OK",
            onPress: () => {
              props.onPressHandelModel();
              props.onPressRefresh();
            },
          },
        ]);
      }
    } catch (ex) {
      Alert.alert("Lỗi", `Lỗi cập nhật dữ liệu ngưỡng`, [
        { text: "OK", onPress: props.onPressHandelModel },
      ]);
    }
  };
  const RemoveThreshold = async () => {
    try {
      const Id = props.thres.id;
      const res = await removeThres({ Id });
      if (res.data.Success && res.data.Data) {
        Alert.alert("Thành công", `Xóa thành công cặp giá trị ngưỡng`, [
          {
            text: "OK",
            onPress: () => {
              props.onPressHandelModel();
              props.onPressRefresh();
            },
          },
        ]);
      }
    } catch (ex) {
      Alert.alert("Lỗi", `Lỗi xóa dữ liệu ngưỡng`, [
        { text: "OK", onPress: props.onPressHandelModel },
      ]);
    }
  };
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
  };

  const GetInforDevice = async () => {
    handleModal();
    setIsLoading(true);
    try {
      let deviceId = props.thres.deviceDriverId;
      const res1 = await DeviceInfo({ deviceId });
      deviceId = props.thres.instrumentationId;
      const res2 = await DeviceInfo({ deviceId });
      if (res1.data.Success && res2.data.Success) {
        setDeviceDriverInfo(res1.data.Data);
        setDeviceInstrumentationInfo(res2.data.Data);
      }
    } catch (ex) {
    } finally {
      setIsLoading(false);
    }
  };
  const GetTypeDevice = (typeDevice: string | null) => {
    if (typeDevice === "ND") {
      return "Nhiệt độ";
    } else if (typeDevice === "DA") {
      return "Độ ẩm";
    }
    return "Phát hiện mưa";
  };
  React.useEffect(() => {
    if (isFocus) {
      GetInforDevice();
    }
  }, [isFocus]);

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: AppColors.modalTop,
            paddingVertical: 12,
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              right: 20,
            }}
            onPress={() => {
              props.onPressHandelModel();
            }}
          >
            <FontAwesome name="close" size={24} color="black" />
          </Pressable>
          <Text style={{ fontSize: 18, color: "black", fontWeight: "500" }}>
            Chỉnh sửa giá trị ngưỡng
          </Text>
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Ngưỡng mở: </Text>
          <TextInput
            multiline={true}
            style={[styles.input]}
            onChangeText={(e) => setOpenValue(e)}
            value={openValue!}
            placeholder="Nhập ngưỡng mở"
            inputMode="decimal"
          />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Ngưỡng đóng: </Text>
          <TextInput
            multiline={true}
            style={[styles.input]}
            onChangeText={(e) => setCloseValue(e)}
            value={closeValue!}
            placeholder="Nhập ngưỡng đóng"
            inputMode="decimal"
          />
        </View>

        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>Kiểu đóng/mở: </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: AppColors.slate600,
              marginTop: 10,
            }}
          >
            {props.thres?.onInUpperThreshold ? "Kiểu 1" : "Kiểu 2"}
          </Text>
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
          <View>
            <View style={styles.horizontalLine} />
            <View style={styles.Inputcontainer}>
              <Text style={styles.Inputlabel}>Thiết bị đo: </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: AppColors.slate600,
                  marginTop: 10,
                }}
              >
                {props.thres.deviceInstrumentationName}
              </Text>
            </View>
            <View style={styles.Inputcontainer}>
              <Text style={styles.Inputlabel}>Nông trại: </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                {deviceDriverInfor?.farmName}
              </Text>
            </View>
            <View style={styles.Inputcontainer}>
              <Text style={styles.Inputlabel}>Khu: </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                {deviceDriverInfor?.zoneName}
              </Text>
            </View>
            <View style={styles.Inputcontainer}>
              <Text style={styles.Inputlabel}>Loại thiết bị: </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                {GetTypeDevice(props.thres.typeDevice)}
              </Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.Inputcontainer}>
              <Text style={styles.Inputlabel}>Thiết bị điều khiển: </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: AppColors.slate600,
                  marginTop: 15,
                }}
              >
                {props.thres.deviceDriverName}
              </Text>
            </View>
            <View style={styles.Inputcontainer}>
              <Text style={styles.Inputlabel}>Trạng thái: </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                {props.thres.deviceDriverAction
                  ? "Hoạt dộng"
                  : "Không hoạt động"}
              </Text>
            </View>
            <View style={styles.Inputcontainer}>
              <Text style={styles.Inputlabel}>Nông trại: </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                {deviceInstrumentationInfor?.farmName}
              </Text>
            </View>
            <View style={styles.Inputcontainer}>
              <Text style={styles.Inputlabel}>Khu: </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                {deviceInstrumentationInfor?.zoneName}
              </Text>
            </View>
            <View style={styles.horizontalLine} />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <View style={styles.fixToText}>
            <Button
              title="Lưu chỉnh sửa"
              color={AppColors.primaryColor}
              onPress={() => {
                UpdateThreshold();
              }}
            />
            <Button
              title="Xóa cài đặt"
              color="red"
              onPress={() => RemoveThreshold()}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    height: 1, // Đặt chiều cao của đường kẻ ngang
    backgroundColor: "black", // Đặt màu sắc của đường kẻ ngang
    marginVertical: 10, // Đặt khoảng cách giữa đường kẻ và các phần tử khác (nếu cần)
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  dropdown: {
    width: "70%",
    marginRight: 27,
    marginTop: 15,
    minHeight: 50,
    maxHeight: 200,
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
    paddingBottom: 20,
  },
  Inputcontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button_showTime: {
    marginTop: 10,
  },
  input: {
    width: "60%",
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
    width: "35%",
    marginTop: 10,
    marginLeft: 5,
    fontWeight: "500",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
