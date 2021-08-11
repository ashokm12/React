import { combineReducers } from 'redux';
import layersReducer from '../components/Layers/layersReducer'
import markersReducer from '../components/Markers/markersReducer'

export default combineReducers({
  layersReducer,
  markersReducer
});