import {
  FETCH_LAYERS_REQUEST,
  FETCH_LAYERS_SUCCESS,
  FETCH_LAYERS_FAILURE
} from './layerTypes'

const initialState = {layers:""}

export default function layersReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_LAYERS_REQUEST: {
            return Object.assign({}, state, {layers: payload})
        }
        default: {
            return state
        }
    }
}

