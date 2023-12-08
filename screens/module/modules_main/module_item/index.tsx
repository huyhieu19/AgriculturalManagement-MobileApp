import { Alert, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import React from 'react'
import { AppColors } from '../../../../global';
import { formatDateTime } from "../../../../utils";
import { IModule } from "../../../../types/module.type";
import { closeIcon, esp8266 } from "../../../../assets";
import { removeModuleFromUser } from "../../../../network/apis";

interface ModulesItemProps {
	modules: IModule;
	onPress?: () => void;
	isBorderRadius?: boolean;
	isBgPrimary?: boolean;
}

const ModulesItem = (props: ModulesItemProps) => {

	const RemoveModule = async () => {
		Alert.alert('Xóa Module', 'Bạn có chắc chắn muốn xóa?', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'OK', onPress: async () => {
					try {
						const res = await removeModuleFromUser(props.modules.id);
						console.log(res);
						console.log("Xoa thanh cong")
					} catch (e) {
						console.log(e);
					}
				}
			},
		]);

	};

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
					source={esp8266}
					style={{
						width: 70,
						height: 70,
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
						{props.modules?.nameRef}
					</Text>
					<CardInfor
						property={"Loại"}
						value={props.modules?.name!}
					/>
					<CardInfor
						property={"Ngày tạo"}
						value={String(formatDateTime(props?.modules?.dateCreated!))}
					/>
				</View>
				<Pressable onPress={() => RemoveModule()}> 
					<Image source={closeIcon}
						style={{
							width: 15,
							height: 15,
							right: -12,
							top: -7
						}} />
				</Pressable>
			</View>
		</TouchableOpacity >
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
					maxWidth: "60%"
				}}
			>
				{props.value}
			</Text>
		</View>
	);
};

export default ModulesItem