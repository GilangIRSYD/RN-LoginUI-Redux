import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';
import Reducers from '../reducers/Reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['InputReducer'],
  whitelist: ['AuthReducer'],
};
const persistorReducer = persistReducer(persistConfig, Reducers);
const Store = createStore(persistorReducer, applyMiddleware(thunk));
const Persistor = persistStore(Store);

export {Store, Persistor};
