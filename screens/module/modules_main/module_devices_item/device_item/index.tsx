import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { IDeviceOnModule } from '../../../../../types/device.type';
import { AppColors } from '../../../../../global';
import { deviceIot } from "../../../../../assets";


type DevicesProps = {
    device: IDeviceOnModule;
    onPress?: () => void;
};

const DevicesOnModulesItem = (props: DevicesProps) => {

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // marginHorizontal: 20,
                    paddingHorizontal: 20,
                    backgroundColor: AppColors.bgWhite,
                    paddingVertical: 16,
                    borderRadius: 15,
                    borderWidth: 0.5,
                    borderColor: AppColors.slate200,
                    elevation: 1,
                    marginBottom: 20,
                }}
            >
                <Image
                    source={deviceIot}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 5,
                    }}
                />
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
                        {props.device?.nameRef}
                    </Text>
                    <CardInfor
                        property={"Gate"}
                        value={props.device?.gate?.toString()!}
                    />

                    <CardInfor
                        property={"Hoat động"}
                        value={props.device?.isAction ? "Mở" : "Đóng"}
                    />
                    <CardInfor
                        property={"Tự động"}
                        value={props?.device.isAuto ? "Tự động" : "Thủ công"}
                    />
                    <CardInfor
                        property={"Loại:"}
                        value={props?.device.deviceType == "R" ? "Thiết bị đo" : "Thiết bị điều khiển"}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

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
                }}
            >
                {props.value}
            </Text>
        </View>
    );
};


export default DevicesOnModulesItem