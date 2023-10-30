import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    carts: [],
    quantity: 0
}
const cartSystem = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddCart: (state, action) => {
            const find = state.carts.findIndex(item => item.id === action.payload.id);

            if (find >= 0) {
                if (action.payload.amount === 0 || action.payload.amount === state.carts[find].quantity) {
                    alert('Sản phẩm hết hàng!');
                } else {
                    state.carts[find].quantity += 1;
                }
            } else {
                if (action.payload.amount === 0) {
                    alert('Sản phẩm hết hàng!');
                }
                else {
                    const newProduct = { ...action.payload, quantity: 1 };
                    state.carts.push(newProduct);
                }
            }

            return state;
        }

        ,
        AddCartUpdate: (state, action) => {
            const tempvar = { ...action.payload, quantity: action.payload.quantity };
            state.carts.push(tempvar);
        },
        RemoveCart: (state, action) => {
            const nextCartItems = state.carts.filter(item => item.id !== action.payload.id);
            state.carts = nextCartItems;
        },
        RemoveAllCart: (state) => {
            state.carts = [];
        },
        DecreaseCart: (state, action) => {
            const itemIndex = state.carts.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
            if (state.carts[itemIndex].quantity > 1) {
                state.carts[itemIndex].quantity -= 1;
            }
            // }else if(state.carts[itemIndex].quantity === 1){
            //     const nextCartItems = state.carts.filter(item=>item.id!==action.payload.id);
            //     state.carts = nextCartItems;
            // }
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

export const { AddCart, AddCartUpdate, RemoveCart, RemoveAllCart, DecreaseCart, getTotal } = cartSystem.actions;
export default cartSystem.reducer;