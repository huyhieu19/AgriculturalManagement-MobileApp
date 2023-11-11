import React from "react";
import { AppColors } from "../../../../global";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Farm } from "../../../../network/models";
import { IFramDetails } from "../../../../types/farm.type";
import { IZoneParams } from "../../../../types/zone.type";
import { formatDateTime } from "../../../../utils";
import { greenhouseIcon } from "../../../../assets";

interface ListZonetemProps {
	zone: IZoneParams;
	onPress?: () => void;
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
						property={"Loại cây"}
						value={props.zone?.typeTreeId!}
					/>
					<CardInfor
						property={"Ngày tạo"}
						value={formatDateTime(props?.zone?.dateCreateFarm!)}
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
	value: string | number;
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
