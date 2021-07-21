import { CALL_API } from "../common/middlewares/get";
import getLayers from "../reducers/layers"

export const FETCH_USERNAME_SUCCESS = 'FETCH_USERNAME_SUCCESS';
export const GET_LAYER = 'existing'

export const fetchUser = () => ({
    [CALL_API]: {
        endpoint: 'https://dev1.scout-ca.net/nics/properties',
        types: ['____', FETCH_USERNAME_SUCCESS, '___']
    }
})

export const getLayersAction = function (layer) {
    return {
        type: GET_LAYER,
        layer: getLayers
    }
}