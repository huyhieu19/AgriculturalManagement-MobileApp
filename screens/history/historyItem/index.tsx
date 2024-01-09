import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { LogDeviceStatusEntity } from "../../../network/models/log_display/LogDevice";
import { AppColors } from "../../../global";

type LogDevicesProps = {
    logsDevice: LogDeviceStatusEntity;
    onPress?: () => void;
};

const LogDevicesControlItem = (props: LogDevicesProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const GetTypeLog = (type: number) => {
        if (type === 1) {
            return "Thời gian"
        } else if (type === 2) {
            return "Giá trị ngưỡng"
        } else {
            return "Thủ Công"
        }
    }

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    backgroundColor: AppColors.bgWhite,
                    borderRadius: 15,
                    borderWidth: 0.5,
                    paddingVertical: 10,
                    borderColor: AppColors.slate200,
                    elevation: 1,
                    marginBottom: 20,
                }}
            >
                <View
                    style={{
                        marginLeft: 12,
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            marginBottom: 8,
                        }}
                    >
                        {props.logsDevice?.deviceName}
                    </Text>
                    <CardInfor
                        property={"Trạng thái chuyển"}
                        value={props.logsDevice?.requestOn! ? "Mở" : "Đóng"}
                    />
                    <CardInfor property={"Thời gian"} value={props.logsDevice?.valueDate} />
                    <CardInfor
                        property={"Tự động"}
                        value={props?.logsDevice.typeOnOff ? "Tự động" : "Thủ công"}
                    />
                    <CardInfor
                        property={"Loại"}
                        value={GetTypeLog(props.logsDevice?.typeOnOff!)}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

interface CardInforProps {
    property: string;
    value: string | number | null;
}

const CardInfor = (props: CardInforProps) => {
    return (
        <View
            style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                gap: 10,
            }}
        >
            <Text
                style={{
                    color: AppColors.slate600,
                    fontSize: 16,
                    fontWeight: "400",
                    marginBottom: 5,
                    fontStyle: "italic",
                }}
            >
                {props.property}:{" "}
            </Text>
            <Text
                style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: "500",
                    fontStyle: "normal",
                    marginBottom: 5,
                }}
            >
                {props.value}
            </Text>
        </View>
    );
};

export default LogDevicesControlItem;
