import { combineReducers } from 'redux';
import reducer from './reducer';

export default function createReducers(asyncReducers) {
	return combineReducers({
		reducer,
		...asyncReducers,
	});
}