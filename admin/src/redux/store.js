
import accountReducer from './account/accountSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartSystem from './cartsystem/cartSystem';
import tableSystem from './table/tableSystem';
import customizeSystem from './customize/customize';
import notificationSystem from './notification/notificationSystem';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['account']
}
const rootReducer = combineReducers({
    account: accountReducer,
    cart: cartSystem,
    table: tableSystem,
    customize: customizeSystem,
    notifications: notificationSystem
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER],
            },
        }),
})

const persistor = persistStore(store);

export { store, persistor }