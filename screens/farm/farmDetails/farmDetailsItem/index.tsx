import React from "react";
import { AppColors } from "../../../../global";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { IZoneParams } from "../../../../types/zone.type";
import { greenhouseIcon } from "../../../../assets";

interface ListZonetemProps {
	zone: IZoneParams;
	onPress?: () => void;
	isBorderRadius?: boolean;
	isBgPrimary?: boolean;
}

export const ListZoneItem = (props: ListZonetemProps) => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
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
					source={greenhouseIcon}
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
						{props.zone?.zoneName}
					</Text>
					<CardInfor
						property={"Diện tích"}
						value={props.zone?.area?.toString()!}
					/>

					<CardInfor
						property={"Chức năng"}
						value={props.zone?.function!}
					/>
					<CardInfor
						property={"Số lượng thiết bị đo"}
						value={props?.zone.countInstrumentation!}
					/>
					<CardInfor
						property={"Số lượng khiển"}
						value={props?.zone.countDeviceDriver!}
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
