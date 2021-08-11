import {
    FETCH_MARKERS_REQUEST
} from './markersTypes'

export const fetchMarkers = () => {
     return function (dispatch) {
        return new Promise((resolve, reject) => {
            fetch('**')
                .then((response) => response.json())
                .then((data) => {
                    dispatch({type: FETCH_MARKERS_REQUEST, payload: data});
                    resolve()
                })
        });
    }
}