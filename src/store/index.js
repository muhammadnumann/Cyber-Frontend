import authSlice from './features/authSlice';
import loadingSlice from './features/loadingSlice';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
  Auth: authSlice,
  Loading: loadingSlice,
});
// Auto Login
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   blacklist: ['Loading'],
// };

// const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer,
});

// export const persistor = persistStore(store);
