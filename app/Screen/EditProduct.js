import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { launchImageLibrary } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { editProduct } from '../redux/productSlice';


const chooseImage = ({ setImg }) => {
    const options = {}
    launchImageLibrary(options, (res) => {
        setImg(res.uri)
    })
}
const handleUpdate = ({ id, name, price, img, dispatch }) => {
    const data = {
        id: id,
        name: name,
        price: price,
        img: img
    }
    dispatch(editProduct(data))
    alert("Đã cập nhập thành công")
}
const EditProduct = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const data = route.params;
    const id = data.id
    const [name, setName] = useState(data.name)
    const [price, setPrice] = useState(data.price)
    const [img, setImg] = useState(data.img)
    return (
        <View style={styles.container} >
            <Input
                placeholder={"Tên sản phẩm"}
                value={name}
                onChangeText={(txt) => setName(txt)}
            />
            <Input
                placeholder={"Giá tiền"}
                value={price}
                onChangeText={(txt) => setPrice(txt)}
            />
            <TouchableOpacity onPress={() => chooseImage({ setImg })} >
                <FastImage
                    source={{ uri: img }}
                    style={styles.chooseImage}
                />
            </TouchableOpacity>
            <Button
                title={"Cập nhập"}
                buttonStyle={styles.butUpdate}
                onPress={() => handleUpdate({ id, name, price, img, dispatch })}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    butUpdate: {
        width: 200,
        height: 40,
        alignSelf: 'center',
        marginTop: 20
    },
    chooseImage: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        backgroundColor: 'red'
    },
    container: {
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center'
    },
})
export default EditProduct
