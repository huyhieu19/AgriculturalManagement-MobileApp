import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./rootReducer";

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const reduxPersistor = persistStore(store);
