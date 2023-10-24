import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    carts: [],
    quantity:0
}
const cartSystem = createSlice({
    name: "cart",
    initialState,
    reducers:{
        AddCart:(state,action) => {
            const find = state.carts.findIndex(item=>item.id===action.payload.id)
            if(find>=0){
                state.carts[find].quantity +=1
            }else{
                const tempvar = {...action.payload,quantity:1}
                state.carts.push(tempvar)
            }
        },
        RemoveCart:(state,action) =>{
            const nextCartItems = state.carts.filter(item=>item.id!==action.payload.id);
            state.carts = nextCartItems;
        },
        RemoveAllCart:(state) =>{
            state.carts = [];
        },
        DecreaseCart:(state,action) =>{
            const itemIndex = state.carts.findIndex(
                (cartItem)=> cartItem.id === action.payload.id
            );
            if(state.carts[itemIndex].quantity > 1){
                state.carts[itemIndex].quantity -=1;
            }
            // }else if(state.carts[itemIndex].quantity === 1){
            //     const nextCartItems = state.carts.filter(item=>item.id!==action.payload.id);
            //     state.carts = nextCartItems;
            // }
        },
        getTotal:(state)=>{
            let{total, quantity} = state.carts.reduce(
                (cartTotal, cartItem) =>{
                    const {price, quantity} = cartItem;
                    const itemTotal = price * quantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += quantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity:0,
                }
                
            )
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
})

export const {AddCart, RemoveCart,RemoveAllCart,DecreaseCart, getTotal} = cartSystem.actions;
export default cartSystem.reducer;