import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { IDeviceOnModule } from '../../../../types/device.type';
import { AppColors } from '../../../../global';
import { offDevcie, onDevcie } from '../../../../assets';



type DevicesProps = {
    device: IDeviceOnModule;
    onPress?: () => void;
};

const DevicesControlItem = (props: DevicesProps) => {

    const [isOn, setIsOn] = useState<boolean>(props.device.isAction);

    const pressOnOff = () => {
        setIsOn(isOn => !isOn);
    }
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
                <TouchableOpacity onPress={pressOnOff}>
                    <Image
                        source={isOn ? onDevcie : offDevcie}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 5,
                        }}
                    />
                </TouchableOpacity>
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
                        {props.device?.name}
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
                        property={"Sử dụng"}
                        value={props?.device.isUsed ? "Có" : "Không"}
                    />
                    <CardInfor
                        property={"Loại"}
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
                    marginBottom: 5,
                }}
            >
                {props.value}
            </Text>
        </View>
    );
};


export default DevicesControlItem