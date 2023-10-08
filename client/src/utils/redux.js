import {persistStore} from "redux-persist";
import {store} from "../redux/configStore.js";

export const clearLocalStorage = () => {
    localStorage.clear();
    persistStore(store).purge();
}