import { createStore } from 'redux';
import { devToolsEnhancer  } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

import reducers from './reducers';


const createNewStore = (initialState) => {
	const store = createStore(
		reducers,
		initialState,
		devToolsEnhancer (),
	);

	const persistor = persistStore(store);

	return { store, persistor };
};

export default createNewStore;
