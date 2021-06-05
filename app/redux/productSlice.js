import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        value: 10,
        name: 'bach',
        dataPro: [
            {
                name: 'Sản phẩm 1',
                price: '100.000đ',
                img: 'https://bitly.com.vn/axlf5h'
            },
            {
                name: 'Sản phẩm 2',
                price: '100.000đ',
                img: 'https://bitly.com.vn/axlf5h'
            },
            {
                name: 'Sản phâm 3',
                price: '100.000đ',
                img: 'https://bitly.com.vn/axlf5h'
            },
        ]
    },
    reducers: {
        addNewProduct: (state, action) => {
            state.dataPro.push(action.payload)
        },
        deleteProduct: (state, action) => {
            state.dataPro.map((item, index) => {
                if (item.name == action.payload) {
                    state.dataPro.splice(index, 1)
                }
            })
        },
        editProduct: (state, action) => {
            state.dataPro[action.payload.id] = {
                name: action.payload.name,
                price: action.payload.price,
                img: action.payload.img
            }
        },
    },
})


export const { addNewProduct, deleteProduct, editProduct } = productSlice.actions

export default productSlice.reducer