import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    carts: [],
    quantity: 0,
    err: null
}
const cartSystem = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddCart: (state, action) => {
            const find = state.carts.findIndex(item => item.id === action.payload.id);

            if (find >= 0) {
                if (action.payload.amount === 0 || action.payload.amount === state.carts[find].quantity) {
                    state.err = "Sản phẩm hết hàng !";
                } else {
                    state.carts[find].quantity += 1;
                }
            } else {
                if (action.payload.amount === 0) {
                    // alert('Sản phẩm hết hàng!');
                    state.err = "Sản phẩm hết hàng !";
                }
                else {
                    const newProduct = { ...action.payload, quantity: 1 };
                    state.carts.push(newProduct);
                }
            }

            return state;
        },
        setErr: (state, action) => {
            state.err = action.payload;
        },
        AddCartUpdate: (state, action) => {
            const tempvar = { ...action.payload, quantity: action.payload.quantity };
            state.carts.push(tempvar);
        },
        RemoveCart: (state, action) => {
            const itemIndex = state.carts.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
            if(state.carts[itemIndex].inDb){
                state.err = "Không thể xóa sản phẩm trong đơn hàng cũ !";
            }else{
                state.carts.splice(itemIndex, 1);
            }
            
        },
        RemoveAllCart: (state ,action) => {
            if(state.carts.some((item)=>(item.inDb && true)) && action.payload == false){
                state.err = "Không thể xóa sản phẩm trong đơn hàng cũ !";
            }else{
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
                if(state.carts[itemIndex].inDb && state.carts[itemIndex].inDb === state.carts[itemIndex].quantity){
                    state.carts[itemIndex].quantiy = state.carts[itemIndex].inDb;
                    state.err = "Không thể xóa sản phẩm trong đơn hàng cũ !";
                }else if(state.carts[itemIndex].quantity === 1){
                    state.carts[itemIndex].quantity = 1
                   
                }else{
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

export const { AddCart, AddCartUpdate, RemoveCart, RemoveAllCart,RemoveReduxCart, DecreaseCart, getTotal, setErr } = cartSystem.actions;
export default cartSystem.reducer;