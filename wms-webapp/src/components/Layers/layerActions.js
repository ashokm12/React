import {
  FETCH_LAYERS_REQUEST,
  FETCH_LAYERS_SUCCESS,
  FETCH_LAYERS_FAILURE
} from './layerTypes'

const testJSONEndpoint = 'https://mocki.io/v1/4d178f8c-f426-4019-8847-feb062b2299a'

export const fetchLayers = () =>  {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            fetch(testJSONEndpoint)
                .then((response) => response.json())
                .then((data) => {
                    dispatch({type: FETCH_LAYERS_REQUEST, payload: data});
                    resolve()
                })
        });
    }
}    

