import { View, Text, Pressable, Alert, TextInput, StyleSheet } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { AppColors } from '../../../../global/styles/AppColors';
import { Button} from 'antd';
import { createFarm } from '../../../../network/apis';


export const CreateFarmScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState(String);
  const [area, setArea] = useState(Number);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

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
          Tên nông trại
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setName(e)}
          value={name}
         />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>
          Chi tiết
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setDescription(e)}
          value={description}
         />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>
          Diện tích (m2)
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setArea(Number(e))}
         />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>
          Địa chỉ
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setAddress(e)}
          value={address}
         />
        </View>
        <View style={styles.Inputcontainer}>
          <Text style={styles.Inputlabel}>
          Chú ý
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => setNote(e)}
          value={note}
         />
        </View>
        <View style = {styles.buttonContainer}>
          <Button style={{flex: 1,width: 120, marginRight: 10, color: 'white', backgroundColor: AppColors.primaryColor }} onClick={handleAddNew} title="Submit" >Lưu</Button>
         <Button style={{flex: 1,width: 120, marginRight: 10,color: 'white', backgroundColor: 'red' }} onClick={GoBack} title="Cancel" >Hủy Bỏ</Button>
         </View>
       </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
