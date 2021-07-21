import TileWMS from 'ol/source/TileWMS';
import { weatherSource, nasaSource } from '../common/config/customData'

const initialState = 'weather';

export default function getLayers(source = initialState) {
    switch (source) {
        case 'weather':
            return weatherSource;
        case 'nasa':
            return nasaSource;
        default:
            return weatherSource;
    }
}