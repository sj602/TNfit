import { createStore, applyMiddleware, compose } from 'redux';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import reducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
}

export const store = createStore(reducer, compose(
	applyMiddleware(thunk, logger)
	)
);

// const pReducer = persistReducer(persistConfig, reducer);

// export const store = createStore(pReducer, compose(
// 	applyMiddleware(thunk, logger), autoRehydrate()
// 	)
// );

// export const persistor = persistStore(store);