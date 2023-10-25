import React from 'react';
import { AppColors } from '../../../../global';
import { Image, Text, View } from 'react-native';
import { Farm } from '../../../../network/models';

const fakeFarm =
	'https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,h_256,dpr_3/https://assets.app.engoo.com/images/QKVwutsxMHDrNur49p0IxFhxQRqCgYldwxT5Keeq0SQ.jpeg';

interface ListFarmItemProps {
	farm: Farm;
}

export const ListFarmItem = (props: ListFarmItemProps) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'flex-start',
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
				source={{
					uri: fakeFarm,
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
				}}
			>
				<Text
					style={{
						fontSize: 18,
						fontWeight: '700',
						marginBottom: 8,
					}}
				>
					{props.farm?.name}
				</Text>
				<CardInfor
					property={'Diện tích'}
					value={props.farm?.area?.toString()}
				/>
				<CardInfor property={'Số lượng khu'} value={props.farm?.countZone} />
				<CardInfor property={'Ngày tạo'} value={props?.farm?.createDate} />
			</View>
		</View>
	);
};

interface CardInforProps {
	property: string;
	value: string;
}

const CardInfor = (props: CardInforProps) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Text
				style={{
					color: AppColors.slate600,
					fontSize: 16,
					fontWeight: '400',
					marginBottom: 5,
					fontStyle: 'italic',
				}}
			>
				{props.property}:{' '}
			</Text>
			<Text
				style={{
					color: 'black',
					fontSize: 16,
					fontWeight: '500',
					fontStyle: 'normal',
				}}
			>
				{props.value}
			</Text>
		</View>
	);
};
