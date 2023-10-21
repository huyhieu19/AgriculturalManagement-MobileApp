import React from "react";
import {Text, SafeAreaView, Button} from "react-native";
import {useAuth} from "../../../../hooks/useAuth";


const ProfileTab: React.FC = () => {
    const {signOut, authData: {user, token}} = useAuth();
    return <SafeAreaView style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Text>Profile Tab</Text>
        <Text>Username: {user?.userName}</Text>
        <Text>Token: {token}</Text>
        <Button title={"Sign out"} onPress={() => signOut()}/>
    </SafeAreaView>
}

export default ProfileTab
