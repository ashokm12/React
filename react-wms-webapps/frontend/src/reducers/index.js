import { combineReducers } from 'redux';
import reducer from './reducer';
import layers from './layers'

export default function createReducers(asyncReducers) {
	return combineReducers({
		reducer,
		layers,
		...asyncReducers,
	});
}