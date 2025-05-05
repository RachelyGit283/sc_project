import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from './tokenSlice'
import carSlice from './CarSlice'
import userSlice from './UserSlice'
import rolseSlice from './rolseSlice'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
};

const persistedTokenReducer = persistReducer(persistConfig, tokenSlice);
const persistedRolseReducer = persistReducer(persistConfig, rolseSlice);

const persistedCarReducer=persistReducer(persistConfig,carSlice);
const persistedUserReducer=persistReducer(persistConfig,userSlice);

const store = configureStore({
  reducer: {
    rolse:persistedRolseReducer,
    token: persistedTokenReducer, // Persisted token reducer
    CarSlice:persistedCarReducer,
    UserSlice:persistedUserReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };