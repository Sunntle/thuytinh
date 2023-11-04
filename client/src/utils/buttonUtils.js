import {decreaseQuantity, increaseQuantity, removeFromOrder} from "../redux/Order/orderSlice.js";

export const handleDeleteConfirm = (id, dispatch) => {
  dispatch(removeFromOrder(id));
};

export const handleOrderReduxIncreaseQuantity = (data, dispatch) => {
  if (data) {
    dispatch(increaseQuantity(data));
  }
}

export const handleOrderReduxDecreaseQuantity = (data, dispatch) => {
  if (data) {
    dispatch(decreaseQuantity(data));
  }
}