import { Image, Text, TouchableOpacity, View } from "react-native";
import React from 'react'
import { IModule } from '../../../../types/module.type';
import { AppColors } from '../../../../global';
import { formatDateTime } from "../../../../utils";

interface ModulesItemProps {
	modules: IModule;
	onPress?: () => void;
	isBorderRadius?: boolean;
	isBgPrimary?: boolean;
}

const ModulesItem = (props: ModulesItemProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-start",
					// marginHorizontal: 20,
					paddingHorizontal: 20,
					backgroundColor: props?.isBgPrimary
						? "#C7E8C7"
						: AppColors.bgWhite,
					paddingVertical: 16,
					borderRadius: props?.isBorderRadius ? 0 : 15,
					borderWidth: 0.5,
					borderColor: AppColors.slate200,
					elevation: 1,
					marginBottom: 20,
				}}
			>
				<Image
					source={{
						uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnshopvn.com%2Fproduct%2Fmodule-thu-phat-wifi-esp8266-nodemcu-lua-cp2102%2F&psig=AOvVaw2c_wco9di3Jta18-rr3Bza&ust=1701712082009000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDFwtLp84IDFQAAAAAdAAAAABAE",
					}}
					style={{
						width: 100,
						height: 100,
						borderRadius: 5,
					}}
				/>
				<View
					style={{
						marginLeft: 12,
						flex: 1,
					}}>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "700",
							marginBottom: 8,
						}}
					>
						{props.modules?.name}
                  </Text>
					<CardInfor
						property={"Loại module"}
						value={props.modules?.name!}
					/>
					<CardInfor
						property={"Ngày tạo"}
						value={String(formatDateTime(props?.modules?.dateCreated!))}
					/>
				</View>
			</View>
		</TouchableOpacity>
  )
}

interface CardInforProps {
	property: string;
	value: string | number;
}

const CardInfor = (props: CardInforProps) => {
	return (
		<View style={{
			flexDirection: "row",
				flex: 1,
				alignItems: "center",
            justifyContent: "space-between",
			}}>
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
					fontSize: 15,
					fontWeight: "500",
                    fontStyle: "normal",
				}}
			>
				{props.value}
			</Text>
		</View>
	);
};

export default ModulesItem