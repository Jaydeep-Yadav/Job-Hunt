import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import jobReducer from "./jobSlice.js";
import companyReducer from "./companySlice";
import applicationReducer from "./applicationSlice";

// redux perist implementation
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
    key: 'devhunt-root', // You can change this to something unique per project
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
    job: jobReducer,
    company: companyReducer,
    application: applicationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);