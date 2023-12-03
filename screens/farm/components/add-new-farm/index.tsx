import { View, Text, Pressable, Alert, TextInput,Button, StyleSheet } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { AppColors } from '../../../../global/styles/AppColors';
import { createFarm } from '../../../../network/apis';


export const CreateFarmScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('Nông trại');
  const [area, setArea] = useState(1);
  const [description, setDescription] = useState('Thông tin chi tiết');
  const [address, setAddress] = useState('Ha Noi');
  const [note, setNote] = useState('Chú ý');

  const handleAddNew = async () => {
    // Perform API request to add new item
    try {
      const res = await createFarm({
        name: name,
        area: area,
        description: description,
        address: address,
        note: note
      });
      if (res.data.Data.isSuccess) {
        Alert.alert('Thành công', 'Thành công thêm farm mới', [
        {text: 'OK', onPress: () => console.log('OK Pressed')}]);
      } else {
        Alert.alert('Lỗi thêm mới', `Thêm mới farm không thành công`, [
          { text: 'OK', onPress: () => console.log('OK Pressed')}]);
      }
    } catch (error) {
      Alert.alert('Lỗi thêm mới', `${error}`, [
        { text: 'OK', onPress: () => console.log('OK Pressed') }]);
    };
  };

  const GoBack = () => {
    navigation.navigate("ListFarmScreen");
  }

  return (
    <SafeAreaView>
      <View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 20,
					backgroundColor: AppColors.primaryColor,
					paddingVertical: 12,
					justifyContent: "center",
				}}
			>
				<Pressable
					style={{
						position: "absolute",
						left: 20,
					}}
					onPress={GoBack}
				>
					<AntDesign name="left" size={24} color="white" />
				</Pressable>
				<Text style={{ fontSize: 18, color: "white" }}>
					Thêm mới nông trại
				</Text>
      </View>

      <View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>
            Tên nông trại:
          </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setName(e)}
          value={name}
         />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>
            Chi tiết:
          </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setDescription(e)}
          value={description}
         />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>
            Diện tích (m2):
          </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setArea(Number(e))}
         />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>
            Địa chỉ:
          </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setAddress(e)}
          value={address}
         />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>
            Chú ý:
          </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setNote(e)}
          value={note}
         />
        </View>
        
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.fixToText}>
            <Button
                title="Thêm mới"
                color={AppColors.primaryColor}
                onPress={() => handleAddNew()}
            />
            <Button
                title="Quay lại"
                color={"red"}
                onPress={() => GoBack()}
            />
        </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  fixToText: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: "65%"
  },
  Inputcontainer: {
    flexDirection: 'row', // Set flexDirection to 'row'
    alignItems: 'center', // Align items vertically in the center

    marginBottom: 10,
  },
  Inputlabel: {
    minWidth: '25%', // Fixed width for labels
    marginRight: 5, // Add some margin between the label and input
  },
  buttonContainer: {
    flexDirection: 'row', // Set flexDirection to 'row'
    alignItems: 'center', // Align items vertically in the center
  }
});
