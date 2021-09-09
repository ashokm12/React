// import { hot } from "react-hot-loader";
import React, { Component } from "react";
import { connect } from "react-redux";
import Draw, { createBox, createRegularPolygon } from "ol/interaction/Draw";
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import "./styles.css";
import { DragBox, Select } from "ol/interaction";
import { platformModifierKeyOnly } from "ol/events/condition";
import Toolbar from "./Toolbar";
import { Style, Fill, Stroke, Icon } from "ol/style";
import { defaults as defaultControls, MousePosition } from "ol/control";
import { createStringXY } from "ol/coordinate";
import {
  fetchUser,
  handleLayerCheck,
  handleOpacityChange,
  handlePropertyModalChange,
  fetchLayerProperties
} from "../actions";
import KML from "ol/format/KML";
import GeoJSON from "ol/format/GeoJSON";
import GPX from "ol/format/GPX";
import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";
import { createXYZ } from "ol/tilegrid";
import Util from "../iweb/Util";
import EventManager from "../iweb/EventManager";
import Mediator from "../iweb/Mediator";
import { Slider } from "antd";
import PropertyModal from "./PropertyModal";
// import kmlFile from '../../test.kml';

var draw;
class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: fromLonLat([-121.4944, 38.5816]),
      zoom: 7,
      type: "",
      showToolbar: false,
      freeDraw: false,
      updatedLayer: [],
      layers: [],
    };
    this.source = new VectorSource({
      url: "http://quickmap.dot.ca.gov/data/cctv.kml",
      // url: "https://cognisite.scout-ca.net/upload/kml/91372286185581717750298904208703138271.kml",
      format: new KML(),
    });
    // this.source = new VectorSource({
    //   url: "http://quickmap.dot.ca.gov/data/cctv.kml",
    //   format: new KML(),
    // });
    this.source.on("addfeature", (evt) => {
      let type = evt.feature.getGeometry().getType();
      if (this.state.type === "Point") {
        evt.feature.setProperties({
          id: "fire",
          name: "fire",
          type: type,
        });
        let iconstyle = new Style({
          image: new Icon({
            src: "https://www.nwcg.gov/sites/default/files/publications/images/936-point-branch-break.jpg",
          }),
        });
        evt.feature.setStyle((feature, resolution) => {
          iconstyle.getImage().setScale(1 / Math.pow(resolution, 1 / 5));
          return iconstyle;
        });
      }
    });

    this.setFreeDraw = (flag) => {
      this.setState({
        freeDraw: flag,
      });
    };

    this.raster = new TileLayer({
      source: new OSM(),
    });

    this.vector = [
      new VectorLayer({
        source: this.source,
      }),
    ];

    this.mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: "EPSG:4326",
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: "custom-mouse-position",
      target: document.getElementById("mouse-position"),
      undefinedHTML: "&nbsp;",
    });

    this.olmap = new Map({
      controls: defaultControls().extend([this.mousePositionControl]),
      target: null,
      layers: [this.raster, ...this.vector],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });

    Mediator.initialize();
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
    this.olmap.getPixelFromCoordinate(this.state.center);
  }

  componentDidMount() {
    this.props.fetchUser();
    this.olmap.setTarget("map");

    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });

    document
      .getElementById("mouse-position")
      .appendChild(document.getElementsByClassName("custom-mouse-position")[0]);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom !== nextState.zoom) return false;
    return true;
  }

  getFormatType = (type) => {
    switch (type) {
      case "kml":
      case "kmz":
        return new KML();

      case "wfs":
      case "arcgisent":
      case "geojson":
      case "arcgisonline":
      case "arcgisrest":
        return new GeoJSON();

      case "gpx":
        return new GPX();

      default:
        return null;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps.reducer.featureLayers !== this.props.reducer.featureLayers && !this.props.reducer.opacity, 'cdu')
    // console.log(this.props.reducer.featureLayers, 'lolo')
    if (prevProps.reducer.featureLayers !== this.props.reducer.featureLayers) {
      this.props.reducer.featureLayers.forEach(async (ele, i) => {
        if (ele.checked) {
          var count = 0;
          this.olmap.getLayers().forEach(async (item) => {
            if (
              item &&
              item.get("name") !== undefined &&
              item.get("name") === ele.key
            ) {
              count = 1;
            }
          });

          if (count === 0) {
            if (ele.type === "wms") {
              var attrs = ele.attributes ? JSON.parse(ele.attributes) : {};
              var wmsLayer = await new Tile({
                name: ele.key,
                opacity: ele.opacity,
                source: new TileWMS({
                  url: ele.link,
                  tileGrid: createXYZ({ tileSize: [512, 512] }),
                  params: Object.assign(
                    {
                      LAYERS: ele.layerName,
                      TILED: true,
                      VERSION: "1.3.0",
                    },
                    attrs
                  ),
                }),
              });
              this.olmap.addLayer(wmsLayer);
            } else {
              const layerName = await new VectorLayer({
                opacity: ele.opacity,
                source: new VectorSource({
                  url: ele.link,
                  format: this.getFormatType(ele.type),
                }),
              });
              layerName.set("name", ele.key);
              this.olmap.addLayer(layerName);
            }
          }

          // this.props.handleLayerCheck(ele.key, true, "loaded");
        } else {
          this.olmap.getLayers().forEach((item) => {
            if (
              item &&
              item.get("name") != undefined &&
              item.get("name") &&
              item.get("name") === ele.key
            ) {
              this.olmap.removeLayer(item);
            }
          });
        }
      });
    }
  }

  getNodeTreeRightClickMenu = () => {
    const { pageX, pageY, id, categoryName, key, opacity } =
      this.props.reducer.rightClickNodeTreeItem;
    const showOpacityOption = this.props.reducer.featureLayers.filter(
      (e) => e.key === key
    );
    const tmpStyle = {
      position: "absolute",
      left: `${pageX}px`,
      top: `${pageY}px`,
      zIndex: 999,
      width: 200,
      border: "1px solid #99bce8",
      backgroundColor: "#eee",
    };
    const menu = (
      <div
        style={tmpStyle}
        className="shadow border rounded popup"
        id="rightPopup"
      >
        <ul className="mb-0">
          <li>Add to Room</li>
          <li>Rename Layer</li>
          <li>Delete Layer</li>
          {showOpacityOption.length && showOpacityOption[0].checked ? (
            <li>
              <div onClick={(e) => e.stopPropagation()}>
                <div onClick={() => {}}> Opacity</div>
                <Slider
                  onChange={(value) => {
                    this.olmap.getLayers().forEach((item) => {
                      if (
                        item.get("name") &&
                        item.get("name") != undefined &&
                        item.get("name") === key
                      ) {
                        // const arr = this.state.updatedLayer.filter((e) => e !== ele.key);
                        // this.setState({
                        //   updatedLayer: arr,
                        // });
                        item.set("opacity", value / 100);
                        // this.props.handleLayerCheck(ele.key, false, "loaded");
                      }
                    });

                    this.props.handleLayerCheck(key, value / 100, "opacity");
                  }}
                  value={showOpacityOption[0].opacity * 100}
                />
              </div>
            </li>
          ) : null}
          <li>
            <div
              onClick={(e) => {
                this.props.fetchLayerProperties(key);
                this.props.handlePropertyModalChange(true);
              }}
            >
              Properties
            </div>
          </li>
        </ul>
      </div>
    );
    return pageY ? menu : null;
  };

  userAction() {
    this.setState({ center: [546000, 6868000], zoom: 5 });
  }

  addInteraction = (val) => {
    var value = val;
    this.olmap.removeInteraction(draw);
    if (value !== "None") {
      var geometryFunction;
      if (value === "Square") {
        value = "Circle";
        geometryFunction = createRegularPolygon(4);
      } else if (value === "Box") {
        value = "Circle";
        geometryFunction = createBox();
      } else if (value === "add") {
        this.setState({
          type: "Point",
        });
      }
      draw = new Draw({
        source: this.source,
        type: value === "add" ? "Point" : value,
        geometryFunction: geometryFunction,
        freehand: value === "add" || this.state.freeDraw,
      });
      draw.on("drawend", (e) => {
        e.feature.setProperties({
          id: new Date().getTime(),
        });
      });
      this.olmap.addInteraction(draw);
    }
  };

  addDrawInteraction = (val) => {
    var value = val;
    this.olmap.removeInteraction(draw);
    if (value !== "None") {
      var geometryFunction;
      if (value === "Square") {
        value = "Circle";
        geometryFunction = createRegularPolygon(4);
      } else if (value === "Box") {
        value = "Circle";
        geometryFunction = createBox();
      } else if (value === "add") {
        this.setState({
          type: "Point",
        });
      }
      draw = new Draw({
        source: this.source,
        type: value === "add" ? "Point" : value,
        geometryFunction: geometryFunction,
        freehand: true,
      });
      draw.on("drawend", (e) => {
        e.feature.setProperties({
          id: new Date().getTime(),
        });
      });
      this.olmap.addInteraction(draw);
    }
  };

  removeFeature = () => {
    var select = new Select();
    this.olmap.addInteraction(select);
    var selectedFeatures = select.getFeatures();
    var dragBox = new DragBox({
      condition: platformModifierKeyOnly,
    });

    this.olmap.addInteraction(dragBox);

    dragBox.on("boxend", (evt) => {
      var rotation = this.olmap.getView().getRotation();
      var oblique = rotation % (Math.PI / 2) !== 0;
      var candidateFeatures = oblique ? [] : selectedFeatures;
      var extent = dragBox.getGeometry().getExtent();
      this.source.forEachFeatureInExtent(extent, (feature) => {
        candidateFeatures.push(feature);
      });

      if (oblique) {
        var anchor = [0, 0];
        var geometry = dragBox.getGeometry().clone();
        geometry.rotate(-rotation, anchor);
        var extent$1 = geometry.getExtent();
        candidateFeatures.forEach(function (feature) {
          var geometry = feature.getGeometry().clone();
          geometry.rotate(-rotation, anchor);
          if (geometry.intersectsExtent(extent$1)) {
            selectedFeatures.push(feature);
          }
        });
      }
    });

    dragBox.on("boxstart", function () {
      selectedFeatures.clear();
    });

    selectedFeatures.on(["add", "remove"], (item) => {
      var names = selectedFeatures.getArray().map((feature) => {
        var features = this.source.getFeatures();
        if (features != null && features.length > 0) {
          for (var x in features) {
            var properties = features[x].getProperties();
            var id = properties.id;
            if (id == feature.get("id")) {
              this.source.removeFeature(features[x]);
              break;
            }
          }
        }
        // this.source.removeFeature(features[x]);
        return feature.get("id");
      });
    });
  };

  selectFeature = () => {
    var select = new Select();
    this.olmap.addInteraction(select);
    var selectedFeatures = select.getFeatures();
    var dragBox = new DragBox({
      condition: platformModifierKeyOnly,
    });

    this.olmap.addInteraction(dragBox);

    dragBox.on("boxend", (evt) => {
      var rotation = this.olmap.getView().getRotation();
      var oblique = rotation % (Math.PI / 2) !== 0;
      var candidateFeatures = oblique ? [] : selectedFeatures;
      var extent = dragBox.getGeometry().getExtent();
      this.source.forEachFeatureInExtent(extent, (feature) => {
        candidateFeatures.push(feature);
      });

      if (oblique) {
        var anchor = [0, 0];
        var geometry = dragBox.getGeometry().clone();
        geometry.rotate(-rotation, anchor);
        var extent$1 = geometry.getExtent();
        candidateFeatures.forEach(function (feature) {
          var geometry = feature.getGeometry().clone();
          geometry.rotate(-rotation, anchor);
          if (geometry.intersectsExtent(extent$1)) {
            selectedFeatures.push(feature);
          }
        });
      }
    });

    dragBox.on("boxstart", function () {
      selectedFeatures.clear();
    });

    selectedFeatures.on(["add", "remove"], (item) => {
      var names = selectedFeatures.getArray().map((feature) => {
        var features = this.source.getFeatures();
        // this.source.removeFeature(features[x]);
        return feature.get("id");
      });
    });
  };

  // setKml = () => {
  //   this.source
  // }

  render() {
    this.updateMap(); // Update map on render?
    const { showMenu } = this.props.reducer;
    return (
      <>
        <div
          id="map"
          style={{
            width: this.state.showMenu ? "80%" : "100%",
            marginLeft: showMenu ? "20%" : "0%",
            height: "100vh",
          }}
        >
          <Toolbar
            olmap={this.olmap}
            addInteraction={this.addInteraction}
            selectFeature={this.selectFeature}
            removeFeature={this.removeFeature}
            addDrawInteraction={this.addDrawInteraction}
            setFreeDraw={this.setFreeDraw}
            freeDraw={this.state.freeDraw}
            draw={draw}
          />
        </div>
        <div
          className="fixed left-95 bottom-5 rounded text-white p-1"
          style={{ background: "rgba(0,60,136,.5)" }}
        >
          <div id="mouse-position" className="flex items-center">
            <div className="pr-2">Lon, Lat:</div>
          </div>
        </div>
        <div
          className="fixed right-30 bottom-6 rounded text-white p-1"
          style={{ background: "rgba(0,60,136,.5)" }}
        >
          <div className="text-center text-xs">ZOOM</div>
          <div className="text-sm text-center">
            {Math.floor(this.state.zoom)}
          </div>
        </div>
        {this.getNodeTreeRightClickMenu()}
        <PropertyModal />
      </>
    );
  }
}

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, {
  fetchUser,
  handleLayerCheck,
  handleOpacityChange,
  handlePropertyModalChange,
  fetchLayerProperties
})(MyMap);
