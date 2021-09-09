export const urlEndpoint =  window.location.protocol + "//" + window.location.host;
// export const urlEndpoint =  'http://localhost:3080';
export const restEndpoint = urlEndpoint+"/api/v1";
export const geoserverEendpoint =  urlEndpoint+"/geoserver";
export const uploadEndpoint =  urlEndpoint+"/upload";


export const incidentTypeIcon = {
  17: "https://image.flaticon.com/icons/png/512/3140/3140268.png",
};

export const layersMap = {
  fire: 0,
  weather: 1,
  tracking: 2,
  data: 3,
};

export const layerType = (type, data, datalayer) => {
  switch (type) {
    case "wfs":
    case "arcgisent":
    case "arcgisonline":
    case "arcgisrest":
      const version =
        JSON.parse(data.attributes) && JSON.parse(data.attributes).version;
      var url = `${data.datasource.internalurl}?service=WFS&version=${
        version ? version : "1.0.0"
      }&request=GetFeature&typename=${
        data.layername
      }&outputFormat=application/json&srsname=EPSG:3857`;
      return url;

    case "wms":
    case "georss":
        var url = `${data.datasource.internalurl}?&LAYERS=${data.layername}&`
        return url;

    case "kml":
    case "kmz":
    case "geojson":
    case "gpx":
      var url = `https://cognisite.scout-ca.net/nics/proxy.jsp?${data.layername}`
      return url;

    default:
      var url = "";
      return url;
  }
};
