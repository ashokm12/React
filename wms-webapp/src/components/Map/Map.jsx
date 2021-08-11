import React, { useEffect, Component } from "react";
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import olMap from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import TileWMS from 'ol/source/TileWMS';
import Stamen from 'ol/source/Stamen';
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { Control, defaults as defaultControls } from "ol/control";
import { connect } from "react-redux";

class Map extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {layers:""}
  }

  componentDidMount() {
    this.source = new VectorSource({ wrapX: false });
    this.raster = new TileLayer({
      source: new OSM(),
    });

    this.vector = new VectorLayer({
      source: this.source,
    });

   this.olmap = new olMap({
      controls:  defaultControls(),
      target: 'map',
      layers: layers,
      view: new View({
        center: fromLonLat([-121.4944, 38.5816]),
        zoom: 7,
      })
   });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.layers.layersReducer.layers.url != this.props.layers.layersReducer.layers.url) {
      updateLayer(this.props.layers.layersReducer.layers);
    }
  }

  render() {
    return (
      <>
        <div id="map" style={{ width: "100%", height: "100vh" }}>
        </div>
        <div
          className="fixed left-95 bottom-5 rounded text-white p-1"
          style={{ background: "rgba(0,60,136,.5)" }}
        >
        </div>
        <div
          className="fixed right-30 bottom-6 rounded text-white p-1"
          style={{ background: "rgba(0,60,136,.5)" }}
        >
          <div className="text-center text-xs">ZOOM</div>
          <div className="text-sm text-center">
            {7}
          </div>
        </div>
      </>
    );
  }
}

function updateLayer(layer) {
  var attributions = layer.attributions
  var url = layer.url 
  var params = layer.params

  const newSource = new TileWMS({
    attributions: attributions,
    url: url,
    params: params,
  });
  swapLayer.setSource(newSource)
}

var swapLayer = new TileLayer({
  source: null,
}); 

var layers = [
  new TileLayer({
    source: new Stamen({
      layer: 'terrain',
    }),
  }),
  swapLayer
];

export default Map;