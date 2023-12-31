import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    carts: [],
    quantity: 0,
    err: null,
    isSuccess: null,
}
const cartSystem = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddCart: (state, action) => {
            const find = state.carts?.find(item => item.id === action.payload.id);
            if(action.payload.amount === 0 ){
                state.err = "Sản phẩm hết hàng !";
            }else {
                if (find) {
                    if(find.amount){
                        if ( action.payload.amount === find.quantity || action.payload.amount < (find.quantity - find.inDb) ) {
                            state.err = "Sản phẩm hết hàng !";
                        } else {
                            find.quantity += 1;
                            state.isSuccess = "Đặt món thành công "
                        }
                    }else{
                        find.quantity += 1;
                        state.isSuccess = "Đặt món thành công "
                    }
                } else {
                        const newProduct = { ...action.payload, quantity: 1 };
                        state.carts.push(newProduct);
                        state.isSuccess = "Đặt món thành công "
                }
            }
            return state;
        },
        setErr: (state, action) => {
            state.err = action.payload;
        },
        setSuccess: (state, action) => {
            state.isSuccess = action.payload;
        },
        AddCartUpdate: (state, action) => {
            const tempvar = { ...action.payload, quantity: action.payload.quantity };
            state.carts.push(tempvar);
        },
        RemoveCart: (state, action) => {
            const itemIndex = state.carts.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
            if (state.carts[itemIndex].inDb) {
                state.err = "Không thể xóa sản phẩm trong đơn hàng cũ !";
            } else {
                state.carts.splice(itemIndex, 1);
            }

        },
        RemoveAllCart: (state, action) => {
            if (state.carts.some((item) => (item.inDb && true)) && action.payload == false) {
                state.err = "Không thể xóa sản phẩm trong đơn hàng cũ !";
            } else {
                state.carts = [];
            }

        },
        RemoveReduxCart: (state) => {
            state.carts = [];
        },
        DecreaseCart: (state, action) => {
            const itemIndex = state.carts.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
            if (state.carts[itemIndex].quantity >= 1) {
                if (state.carts[itemIndex].inDb && state.carts[itemIndex].inDb === state.carts[itemIndex].quantity) {
                    state.carts[itemIndex].quantity = state.carts[itemIndex].inDb;
                    state.err = "Không thể xóa sản phẩm trong đơn hàng cũ !";
                } else if (state.carts[itemIndex].quantity === 1) {
                    state.carts[itemIndex].quantity = 1

                } else {
                    state.carts[itemIndex].quantity -= 1;
                }

            }
        },
        getTotal: (state) => {
            let { total, quantity } = state.carts.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += quantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }

            )
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
})

export const { AddCart, AddCartUpdate, RemoveCart, RemoveAllCart, RemoveReduxCart, DecreaseCart, getTotal, setErr ,setSuccess} = cartSystem.actions;
export default cartSystem.reducer;