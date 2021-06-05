import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { launchImageLibrary } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct } from '../redux/productSlice'


const chooseImage = ({ setImg }) => {
    const options = {}
    launchImageLibrary(options, (res) => {
        setImg(res.uri)
    })
}
const handleAdd = ({ name, price, img, dataPro, dispatch }) => {
    if (name != '' && price != '') {
        const check = dataPro.find((item) => item.name == name)
        if (check == undefined) {
            const value = {
                name: name,
                price: price,
                img: img
            }
            const action = addNewProduct(value)
            dispatch(action)
            alert("Đã thêm")
        }
        else alert("Sản phẩm này đã có")
    }
    else alert("Nhập thông tin")
}
const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('https://bitly.com.vn/axlf5h')
    const dispatch = useDispatch()
    const dataPro = useSelector((state) => state.product.dataPro)
    return (

        <View style={styles.container} >
            <View style={styles.boxAdd} >
                <Input
                    placeholder={"Tên sản phẩm"}
                    onChangeText={(txt) => setName(txt)} />
                <Input
                    placeholder={"Giá sản phẩm"}
                    onChangeText={(txt) => setPrice(txt)} />
                <TouchableOpacity onPress={() => chooseImage({ setImg })} >
                    <FastImage
                        source={{ uri: img }}
                        style={styles.chooseImage}
                    />
                </TouchableOpacity>

                <Button
                    title={"Thêm sản phẩm"}
                    buttonStyle={styles.butAdd}
                    onPress={() => handleAdd({ name, price, img, dataPro, dispatch })}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boxEdit: {
        width: '100%',
        height: 500,
    },
    chooseImage: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    butAdd: {
        marginTop: 10,
        height: 40,
        width: '40%',
        alignSelf: 'center'
    },
    boxAdd: {
        width: '100%',
        height: 300,
    },
    container: {
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center'
    },
})
export default AddProduct
