import { createStore } from 'redux';

import reducers from './reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

const makeConfiguredStore = (reducer, initialState) =>
	createStore(reducer, initialState, devToolsEnhancer({}));

const makeStore = (initialState, { isServer }) => {
	if (isServer) {
		initialState = initialState || { fromServer: 'foo' };

		return makeConfiguredStore(reducers, initialState);
	}
	// we need it only on client side
	const { persistStore, persistReducer } = require('redux-persist');
	const storage = require('redux-persist/lib/storage').default;

	const persistConfig = {
		storage,
		key: 'nextjs',
		whitelist: ['user'],
	};

	const persistedReducer = persistReducer(persistConfig, reducers);
	const store = makeConfiguredStore(persistedReducer, initialState);

	// @ts-ignore
	store.__persistor = persistStore(store); // Nasty hack

	return store;
};

export default makeStore;

// const createNewStore = (initialState) => {
// 	const store = createStore(
// 		reducers,
// 		initialState,
// 		devToolsEnhancer({ }),
// 	);
//
// 	const persistor = persistStore(store);
//
// 	return { store, persistor };
// };
//
// export default createNewStore;
