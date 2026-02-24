import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../../src/redux/authSlice.js";
import themeSlice from "../../src/redux/themeSlice.js";
import blogSlice from "./blogSlice.js"
import commentSlice from "./commentslice.js"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';



// 1️⃣ Root reducer define karo
const rootReducer = combineReducers({
    auth: authSlice,
    theme: themeSlice,
    blog: blogSlice,
    comment: commentSlice
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

// 2️⃣ Persisted reducer banao
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3️⃣ Store configure karo
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// 4️⃣ Persistor export karo (important)
export const persistor = persistStore(store);

export default store;
