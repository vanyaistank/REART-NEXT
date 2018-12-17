import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// this is *.js file, because redux-persist's storage is not properly typed
// TODO: submit the issue
import storage from 'redux-persist/lib/storage/session';

import CartReducer from './Cart/CartReducer';
import UserReducer from './User/UserReducer';
import LayoutReducer from './Layout/LayoutReducer';

const persistConfig = {
	key: 'root',
	storage,
	debug: true,
	whitelist: ['user', 'cart'], // only userData reducer will be persisted
};

// const persistedCartReducer = persistReducer(persistConfig, CartReducer);
// const persistedUserReducer = persistReducer(persistConfig, UserReducer);

const combinedReducers = combineReducers({
	cart: CartReducer,
	user: UserReducer,
	layout: LayoutReducer,
});

export default persistReducer(persistConfig, combinedReducers);
