import TileWMS from 'ol/source/TileWMS';

const sourcesOptions = [
        {
            attributions: ['Iowa State University'],
            url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi',
            params: {'LAYERS': 'nexrad-n0r-wmst'},
        },

        {
            attributions: ['NASA'],
            url: 'https://sedac.ciesin.columbia.edu/geoserver/wms',
            params: {'LAYERS': 'gpw-v3:gpw-v3-population-density_2000'},
        },
];

export const nasaSource = new TileWMS({
    attributions: sourcesOptions[1].attributions,
    url: sourcesOptions[1].url,
    params: sourcesOptions[1].params,
});
  
export const weatherSource = new TileWMS({
    attributions: sourcesOptions[0].attributions,
    url: sourcesOptions[0].url,
    params: sourcesOptions[0].params,
});
  
