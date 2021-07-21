import React, { Component } from "react";
import PropTypes from 'prop-types'
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import TileWMS from 'ol/source/TileWMS';
import Stamen from 'ol/source/Stamen';
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { Control, defaults as defaultControls } from "ol/control";

class MyMap extends Component {

  constructor(props, context) {
    super(props, context);
    showLayerSelectModal = showLayerSelectModal.bind(this); 
  }

  componentDidMount() {
    // Grab default 'weather' layer from the props which calls the action and allows to call a function from another file
    var source = this.props.getLayers().layer('weather');

    // Use setSource to set default layer
    swapLayer.setSource(source);
    this.source = new VectorSource({ wrapX: false });
    this.raster = new TileLayer({
      source: new OSM(),
    });

    this.vector = new VectorLayer({
      source: this.source,
    });

   this.olmap = new Map({
     // extend the default controls with our custom SwitchLayerControl
      controls:  defaultControls().extend([new SwitchLayerControl()]),
      target: 'map',
      layers: layers,
      // This sets the default map zoom and location
      view: new View({
        center: fromLonLat([-121.4944, 38.5816]),
        zoom: 7,
      })
   });
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

// Swap layer is used to allow for tile layers to be changed on the fly
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

// Custom switch layer control is a subclass of the OpenLayers Control and is specific to this component
var SwitchLayerControl = /*@__PURE__*/(function (Control) {
  function SwitchLayerControl(opt_options) {
    var options = opt_options || {};

    var button = document.createElement('button');
    button.innerHTML = '&#9654;';

    var element = document.createElement('div');
    element.className = 'switch-layer ol-unselectable ol-control';
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.handleSwitchLayer.bind(this), false);
  }

  if ( Control ) SwitchLayerControl.__proto__ = Control;
  SwitchLayerControl.prototype = Object.create( Control && Control.prototype );
  SwitchLayerControl.prototype.constructor = SwitchLayerControl;
  SwitchLayerControl.prototype.handleSwitchLayer = function handleSwitchLayer () {
    showLayerSelectModal();
  };

  return SwitchLayerControl;
}(Control));
 
 function showLayerSelectModal() {
  var url = swapLayer.get('source').urls[0];
  console.log("source: " + url);
  // This is a temporary setup to test switching of layers, the full setup will rely on any layer info being passed in
  if (url === 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi') {
    swapLayer.setSource(this.props.getLayers().layer('nasa')); 
  } else {
    swapLayer.setSource(this.props.getLayers().layer('weather'));
  }
}


export default MyMap