import React from "react";
import {
	Text,
	SafeAreaView,
	Button,
	View,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { useAuth } from "../../../../hooks/useAuth";
import {
	profileBackground,
	homeLeftIcon,
	avatar,
	mapIcon,
	gmailIcon,
	smartphoneIcon,
	resumeIcon,
} from "../../../../assets";
import { AppColors } from "../../../../global";
import { Ionicons } from "@expo/vector-icons";

const ProfileTab: React.FC = () => {
	const {
		signOut,
		authData: { user, token },
	} = useAuth();
	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 20,
					backgroundColor: AppColors.primaryColor,
					paddingVertical: 10,
					justifyContent: "space-between",
				}}
			>
				<Image source={homeLeftIcon} style={{ width: 30 }} />
				<Text style={{ fontSize: 18, color: "white" }}>
					Thông tin cá nhân
				</Text>
				<Ionicons
					name="notifications-outline"
					size={24}
					color="white"
				/>
			</View>
			<ScrollView>
				<View style={{ position: "relative" }}>
					<Image
						source={profileBackground}
						style={{
							height: 200,
							width: "100%",
							objectFit: "cover",
						}}
					/>
					<View
						style={{
							position: "absolute",
							bottom: "-20%",
							left: 10,
						}}
					>
						<Image
							source={avatar}
							// style={{ width: 100, height: 100 }}
						/>
					</View>
				</View>
				<View style={{ marginTop: 50, paddingHorizontal: 20 }}>
					<Text style={{ fontSize: 16 }}>Nguyen Huy Hieu</Text>
					<View
						style={{
							backgroundColor: "white",
							borderRadius: 10,
							borderWidth: 1,
							borderColor: "#5EBEE7",
							paddingHorizontal: 20,
							paddingVertical: 20,
							marginTop: 20,
						}}
					>
						<View style={styles.cardItem}>
							<Image source={mapIcon} style={styles.imageIcon} />
							<Text style={{ fontSize: 16 }}>Ha Noi</Text>
						</View>
						<View style={styles.cardItem}>
							<Image
								style={styles.imageIcon}
								source={smartphoneIcon}
							/>
							<Text style={{ fontSize: 16 }}>0395311258</Text>
						</View>
						<View style={styles.cardItem}>
							<Image
								style={styles.imageIcon}
								source={gmailIcon}
							/>
							<Text style={{ fontSize: 16 }}>
								levubaotrung0311@gmail.com
							</Text>
						</View>
						<View style={styles.lastCardItem}>
							<Image
								style={styles.lastCardItem}
								source={resumeIcon}
							/>
							<Text style={{ fontSize: 16 }}>
								Thông tin chi tiết
							</Text>
						</View>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-around",
							marginTop: 30,
						}}
					>
						<TouchableOpacity
							style={[
								styles.buttonStyle,
								{ backgroundColor: "#F48562" },
							]}
						>
							<Text style={{ fontSize: 16 }}>Huỷ</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.buttonStyle,
								{ backgroundColor: AppColors.primaryColor },
							]}
						>
							<Text style={{ fontSize: 16 }}>Lưu</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export const styles = StyleSheet.create({
	cardItem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 30,
		marginBottom: 20,
	},
	lastCardItem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 30,
	},
	imageIcon: {
		width: 30,
		height: 30,
		objectFit: "contain",
	},
	buttonStyle: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		width: "40%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
});

export default ProfileTab;
