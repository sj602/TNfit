import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// export const store = createStoreWithMiddleware(reducer);

export const store = createStore(reducer, composeWithDevTools(
	applyMiddleware(thunk, logger)
));