import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createReducer from './reducers';
import get from './common/middlewares/get';
import post from './common/middlewares/post';
// import { __DEV__ } from '../common/utils/dev';

const logger = createLogger({
	level: 'info',
	collapsed: false,
});

// /* globals __DEV__ */
let createStoreWithMiddleware;
if (process.env.NODE_ENV === 'development') {
	createStoreWithMiddleware = compose(
		applyMiddleware(thunkMiddleware, get, post),
		applyMiddleware(logger)
	)(createStore);
} else {
	createStoreWithMiddleware = compose(
		applyMiddleware(thunkMiddleware, get, post)
	)(createStore);
}

/**
 * Create a preconfigured store with middlewares
 */
export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(createReducer(), initialState);
	store.asyncReducers = {};

	return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
	store.asyncReducers[name] = asyncReducer;
	store.replaceReducer(createReducer(store.asyncReducers));
}