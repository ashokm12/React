import {
    FETCH_MARKERS_REQUEST
} from './markersTypes'

const initialState = {markers:""}

export default function markersReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_MARKERS_REQUEST: {
            return Object.assign({}, state, {markers: payload})
        }
        default: {
            return state
        }
    }
} 