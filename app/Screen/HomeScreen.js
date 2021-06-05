import React, { useEffect } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../redux/productSlice';
import AsyncStorage from '@react-native-community/async-storage';

const Logout = async () => {
    try {
        await AsyncStorage.removeItem('token');
        alert("Đã đăng xuất")
    } catch (error) {
        alert(error)
    }
}
const handleDele = ({ item, dispatch }) => {
    const action = deleteProduct(item.name)
    dispatch(action)
    alert(`Đã xoá sản phẩm ${item.name}`)
}
const renderItem = ({ item, index, dispatch, navigation }) => {
    return (
        <View style={styles_product.container} >
            <TouchableOpacity
                onPress={() => navigation.navigate("Edit", {
                    name: item.name,
                    price: item.price,
                    img: item.img,
                    id: index

                })}
                onLongPress={() => handleDele({ item, dispatch })}>
                <FastImage style={styles_product.imgProduct} source={{ uri: item.img }} />
                <Text style={styles_product.txtNameProduct} >{item.name}</Text>
                <Text style={styles_product.txtPriceProduct}>{item.price}</Text>
            </TouchableOpacity>
        </View>
    )
}
const HomeScreen = ({ navigation }) => {
    const dataPro = useSelector((state) => state.product.dataPro)
    const dispatch = useDispatch()
    const retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                // alert("Chào mừng quay trở lại")
            }
            else (
                Alert.alert("Đăng nhập", "Hãy đăng nhập",
                    [
                        { text: "OK", onPress: () => { navigation.navigate("Login") } }
                    ]
                )
            )
        } catch (error) {
            alert(error)
        }
    };
    useEffect(() => {
        retrieveData()
    }, [])
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'pink', opacity: .95 }}>
                <View style={styles.styBanner} >
                    <Swiper
                        autoplay={true}
                        autoplayTimeout={5}
                    >
                        <FastImage style={styles.imgBanner}
                            source={{ uri: 'https://bitly.com.vn/ephiek' }}
                        />
                        <FastImage style={styles.imgBanner}
                            source={{ uri: 'https://bitly.com.vn/c0qpeg' }}
                        />
                    </Swiper>
                </View>
                <View style={styles.boxLabel} >
                    <Text children={"Sản phẩm"} style={styles.txtProduct} />
                    <TouchableOpacity onPress={() => navigation.navigate("Add")} >
                        <Text style={styles.txtAddProduct}>Tuỳ chỉnh</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
                <FlatList
                    style={styles.styBoxView}
                    data={dataPro}
                    renderItem={({ item, index }) => renderItem({ item, index, dispatch, navigation })}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={index => { index }}
                />
                <Button title={"Đăng xuất"} onPress={() => Logout()} />



            </SafeAreaView>
        </>
    )
}
const styles_product = StyleSheet.create({
    txtPriceProduct: {
        color: 'red',
        fontSize: 16,
        marginTop: 5
    },
    txtNameProduct: {
        fontSize: 16,
        marginTop: 5
    },
    imgProduct: {
        width: '100%',
        height: 130,
        backgroundColor: 'gray',
        borderRadius: 10
    },
    container: {
        width: 170,
        height: 200,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 20,
        padding: 10
    },
})
const styles = StyleSheet.create({
    imgBanner: {
        width: '100%',
        height: '100%'
    },
    boxLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtAddProduct: {
        fontSize: 18,
        marginTop: 17,
        marginRight: 20
    },
    line: {
        width: 100,
        height: 5,
        backgroundColor: '#29b5e8',
        borderRadius: 15,
        marginLeft: 10
    },
    txtProduct: {
        fontSize: 22,
        marginTop: 15,
        marginLeft: 10
    },
    styBoxView: {
        paddingHorizontal: '5%',
    },
    styBanner: {
        width: '100%',
        height: 180,
        backgroundColor: 'green'
    }
})
export default HomeScreen