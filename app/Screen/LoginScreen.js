import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';



const LoginFireBase = ({ username, pass, navigation }) => {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(username)) {
        alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
        return false;
    }
    else {

        auth()
            .signInWithEmailAndPassword(username, pass)
            .then(async () => {
                var token = await auth().currentUser.uid;
                console.log(token)
                try {
                    await AsyncStorage.setItem('token', token);
                } catch (error) {
                    alert(error)
                }

                Alert.alert(
                    "Đã đăng nhập",
                    "Quay về Home",
                    [
                        { text: "OK", onPress: () => { navigation.goBack() } }
                    ]
                )
            })
            .catch(error => {
                alert(error);
            });
    }



}
const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    return (
        <>
            <ImageBackground style={styles.container} source={{ uri: 'https://bom.to/dfL755ancSbki' }} >
                <View style={styles.boxLogin} >
                    <Text children={"Đăng nhập"} style={styles.txtLogin} />
                    <Input
                        value={username}
                        style={styles.styInputUsername}
                        placeholder={"Tên đăng nhập"}
                        onChangeText={setUsername}
                    />
                    <Input
                        value={pass}
                        style={styles.styInputPass}
                        placeholder={"Mật khẩu"}
                        onChangeText={setPass}
                    />
                    <Button
                        title={"Đăng nhập"}
                        style={styles.btLogin}
                        onPress={() => LoginFireBase({ username, pass, navigation })}
                    />
                </View>
            </ImageBackground>
        </>
    )
}
const styles = StyleSheet.create({
    btLogin: {
        paddingHorizontal: '30%',
        marginTop: 50
    },
    styInputPass: {
        paddingHorizontal: 10,
        width: '90%'
    },
    txtLogin: {
        alignSelf: 'center',
        fontSize: 26,
        marginTop: 20,
        color: "#434343"
    },
    boxLogin: {
        width: '90%',
        height: 400,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        opacity: .9
    },
    styInputUsername: {
        marginTop: 15,
        paddingHorizontal: 10,
        width: '90%'
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
})
export default LoginScreen