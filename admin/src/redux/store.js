
import accountReducer from './account/accountSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,

    PERSIST
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartSystem from './cartsystem/cartSystem';
import tableSystem from './table/tableSystem';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['account']
}
const rootReducer = combineReducers({
    account: accountReducer,
    cart: cartSystem,
    table: tableSystem
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [PERSIST],
            },
        }),
})

const persistor = persistStore(store);

export { store, persistor }