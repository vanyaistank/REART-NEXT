import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage/session';

import UserReducer from './User/UserReducer';
import LayoutReducer from './Layout/LayoutReducer';

const persistConfig = {
	storage,
	key: 'user',
	debug: true,
};

const persistedUserReducer = persistReducer(persistConfig, UserReducer);

const combinedReducers = combineReducers({
	user: persistedUserReducer,
	layout: LayoutReducer,
});

export default combinedReducers;
