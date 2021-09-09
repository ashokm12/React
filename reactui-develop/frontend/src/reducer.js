import {
  FETCH_ARCG_ONLINE_SUCCESS,
  FETCH_ARCG_SUCCESS,
  FETCH_DATA_SUCCESS,
  FETCH_FIRE_SUCCESS,
  FETCH_INCIDENT_TREE_SUCCESS,
  FETCH_INCIDENT_TYPE_SUCCESS,
  FETCH_MAPS_SUCCESS,
  FETCH_PROPERTIES_LAYER_SUCCESS,
  FETCH_ROOMS_SUCCESS,
  FETCH_TRACKING_SUCCESS,
  FETCH_USERNAME_SUCCESS,
  FETCH_USER_DETAIL_SUCCESS,
  FETCH_WEATHER_SUCCESS,
  FETCH_WFS_SUCCESS,
  FETCH_WMS_SUCCESS,
  FETCH_WORKSPACE_SUCCESS,
  GET_SESSION_SUCCESS,
  HANDLE_FOLDER_DATA,
  HANDLE_GEORSS_CHANGE,
  HANDLE_GEORSS_SUCCESS,
  HANDLE_GEOTIFF_CHANGE,
  HANDLE_INCIDENT_NAME,
  HANDLE_KML_CHANGE,
  HANDLE_KML_SUCCESS,
  HANDLE_LAYER_CHECK_FLAG,
  HANDLE_MENU_BAR,
  HANDLE_OPACITY_CHANGE,
  HANDLE_PROPERTY_MODAL_CHANGE,
  HANDLE_RESET_PROPERTIES,
  HANDLE_RIGHT_CLICK_NODE,
  UPDATE_LAYER,
} from "./actions";
import { layersMap, layerType } from "./common/config/customData";
import { a } from "./common/dummy/data";

const InitialState = {
  showMenu: false,
  opacity: false,
  apiCalls: true,
  isFetching: false,
  user: {},
  kmlData: [],
  userDetails: {},
  currentSessionId: "",
  incidentType: {},
  incidents: {},
  rightClickNodeTreeItem: {
    pageX: "",
    pageY: "",
    id: "",
    categoryName: "",
    key: "",
  },
  propertyModal: false,
  common: {
    incidentName: "No Incident",
  },
  maps: {
    folders: [],
    datalayerfolders: [],
  },
  fire: {
    folders: [],
    datalayerfolders: [],
  },
  data: {
    folders: [],
    datalayerfolders: [],
  },
  weather: {
    folders: [],
    datalayerfolders: [],
  },
  tracking: { folders: [], datalayerfolders: [] },
  room: {
    results: [],
  },
  mapLayer: [
    {
      title: "Maps",
      key: "maps",
      children: [
        {
          title: "Bing Roads",
          key: "br",
        },
        {
          title: "Open Street Map",
          key: "OSM",
        },
        {
          title: "Bing Aerial",
          key: "BA",
        },
        {
          title: "US Topo - 7.5min quadrangle maps",
          key: "UST",
        },
        {
          title: "Bing Aerial with Labels",
          key: "BAL",
        },
        {
          title: "FAA - Sectional Aeronautical Charts",
          key: "FAA",
        },
      ],
    },
  ],
  featureLayers: [],
  layers: [
    {
      title: "Fire",
      key: "fire",
      children: [],
    },
    {
      title: "Weather",
      key: "weather",
      children: [],
    },
    {
      title: "Tracking",
      key: "tracking",
      children: [],
    },
    {
      title: "Data",
      key: "data",
      children: [],
    },
  ],
  wfs: [],
  wms: [],
  arcgent: [],
  arcon: [],
  kml: {
    baselayer: true,
    fileType: "kml",
    fileURL: "",
    collabroomId: "",
    displayname: "",
    refreshrate: "",
    orgid: '',
    fileName: "",
  },
  georss: {
    baselayer: true,
    fileType: "georss",
    feedUrl: "",
    displayname: "",
    refreshrate: "",
  },
  geotiff: {
    filename: "",
    displayName: "",
    mosaic: "off",
    tifFile: "",
  },
  properties: {
    created: "",
    createdBy: "",
    layerName: "",
    layerType: "",
    legend: "",
    refreshRate: "",
    secure: "",
    layer: "",
    dataSourceUrl: "",
    datalayerSourceId: "",
    dataLayerId: "",
    restriction: "",
  },
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case FETCH_WORKSPACE_SUCCESS: {
      const worskspace = action.response.workspaces.filter((el) => el.enabled);
      return {
        ...state,
        workspaceId: worskspace[0].workspaceid,
      };
    }

    case HANDLE_KML_CHANGE: {
      return {
        ...state,
        kml: {
          ...state.kml,
          ...action.obj,
        },
      };
    }

    case HANDLE_KML_SUCCESS: {
      return {
        ...state,
        kml: {
          baselayer: true,
          fileType: "kml",
          fileURL: "",
          collabroomId: "",
          displayname: "",
          refreshrate: "",
          orgid: '',
          fileName: "",
        },
      };
    }

    case HANDLE_RESET_PROPERTIES: {
      return {
        ...state,
        properties: {
          created: "",
          createdBy: "",
          layerName: "",
          layerType: "",
          legend: "",
          refreshRate: "",
          secure: "",
          layer: "",
          dataSourceUrl: "",
          datalayerSourceId: "",
          dataLayerId: "",
          restriction: "",
        },
      };
    }

    case HANDLE_RIGHT_CLICK_NODE: {
      return {
        ...state,
        rightClickNodeTreeItem: {
          ...state.rightClickNodeTreeItem,
          ...action.obj,
        },
      };
    }

    case HANDLE_PROPERTY_MODAL_CHANGE: {
      return {
        ...state,
        propertyModal: action.val,
      };
    }

    case HANDLE_GEOTIFF_CHANGE: {
      return {
        ...state,
        geotiff: {
          ...state.geotiff,
          ...action.obj,
        },
      };
    }

    case HANDLE_GEORSS_CHANGE: {
      return {
        ...state,
        georss: {
          ...state.georss,
          ...action.obj,
        },
      };
    }

    case HANDLE_GEORSS_SUCCESS: {
      return {
        ...state,
        georss: {
          baselayer: true,
          fileType: "georss",
          feedUrl: "",
          displayname: "",
          refreshrate: "",
        },
      };
    }

    case HANDLE_OPACITY_CHANGE: {
      return {
        ...state,
        opacity: action.flag,
      };
    }

    case FETCH_USER_DETAIL_SUCCESS: {
      return {
        ...state,
        userDetails: action.response,
      };
    }

    case FETCH_ARCG_SUCCESS: {
      return {
        ...state,
        arcgent: action.response,
      };
    }

    case FETCH_ARCG_ONLINE_SUCCESS: {
      return {
        ...state,
        arcon: action.response,
      };
    }

    case FETCH_WFS_SUCCESS: {
      return {
        ...state,
        wfs: action.response,
      };
    }

    case FETCH_WMS_SUCCESS: {
      return {
        ...state,
        wms: action.response,
      };
    }

    case UPDATE_LAYER: {
      return {
        ...state,
        layers: action.data,
      };
    }

    case FETCH_USERNAME_SUCCESS: {
      return {
        ...state,
        user: action.response,
      };
    }

    case GET_SESSION_SUCCESS: {
      return {
        ...state,
        currentSessionId: action.response.userSession.currentusersessionid,
      };
    }

    case FETCH_INCIDENT_TYPE_SUCCESS: {
      return {
        ...state,
        incidentType: action.response,
      };
    }

    case FETCH_INCIDENT_TREE_SUCCESS: {
      return {
        ...state,
        incidents: action.response,
      };
    }

    case FETCH_MAPS_SUCCESS: {
      return {
        ...state,
        maps: action.response,
      };
    }

    case HANDLE_MENU_BAR: {
      return {
        ...state,
        showMenu: action.flag,
      };
    }

    case FETCH_FIRE_SUCCESS: {
      // return {
      //   ...state,
      //   fire: action.response,
      // };

      const layers = state.layers;
      const featureLayers = state.featureLayers;
      const { datalayerfolders, folders } = action.response;
      const dlf = datalayerfolders.map((e) => {
        const link = layerType(
          e.datalayer.datalayersource.datasource.datasourcetype.typename,
          e.datalayer.datalayersource,
          e.datalayer
        );
        return {
          title: e.datalayer.displayname,
          link,
          type: e.datalayer.datalayersource.datasource.datasourcetype.typename,
          key: e.datalayerid,
          checked: false,
          opacity: 1,
          loaded: false,
          layerName: e.datalayer.datalayersource.layername,
          attributes: e.datalayer.datalayersource.attributes,
        };
      });
      const folder = folders.map((e) => {
        const link = "";
        return {
          title: e.foldername,
          link,
          type: "folder",
          key: e.folderid,
        };
      });
      layers[0].children.push(...folder, ...dlf);
      featureLayers.push(...dlf);
      return {
        ...state,
        fire: action.response,
        apiCalls: false,
        layers,
        featureLayers,
      };
    }

    case FETCH_DATA_SUCCESS: {
      const layers = state.layers;
      const featureLayers = state.featureLayers;
      const { datalayerfolders, folders } = action.response;
      const dlf = datalayerfolders.map((e) => {
        const link = layerType(
          e.datalayer.datalayersource.datasource.datasourcetype.typename,
          e.datalayer.datalayersource,
          e.datalayer
        );
        return {
          title: e.datalayer.displayname,
          link,
          type: e.datalayer.datalayersource.datasource.datasourcetype.typename,
          key: e.datalayerid,
          checked: false,
          opacity: 1,
          loaded: false,
          layerName: e.datalayer.datalayersource.layername,
          attributes: e.datalayer.datalayersource.attributes,
        };
      });
      const folder = folders.map((e) => {
        const link = "";
        return {
          title: e.foldername,
          link,
          type: "folder",
          key: e.folderid,
        };
      });
      layers[3].children.push(...folder, ...dlf);
      featureLayers.push(...dlf);
      return {
        ...state,
        data: action.response,
        layers,
        featureLayers,
      };
    }

    case FETCH_PROPERTIES_LAYER_SUCCESS: {
      const { response } = action;
      const {
        created,
        datalayerid,
        displayname,
        datalayersourceid,
        legend,
        datalayersource: {
          refreshrate,
          layername,
          datasource: {
            internalurl,
            secure,
            datasourcetype: { typename },
          },
        },
        usersession: { userorg: { user: { username } } = {} },
      } = response.datalayers[0];
      return {
        ...state,
        properties: {
          created,
          createdBy: username,
          layerName: displayname,
          layerType: typename,
          legend,
          refreshRate: refreshrate,
          secure: secure ? "true" : "false",
          layer: layername,
          dataSourceUrl: internalurl,
          datalayerSourceId: datalayersourceid,
          dataLayerId: datalayerid,
          restriction:
            action.response.datalayerOrgs &&
            action.response.datalayerOrgs.length
              ? "true"
              : "false",
        },
      };
    }

    case FETCH_WEATHER_SUCCESS: {
      const layers = state.layers;
      const featureLayers = state.featureLayers;
      const { datalayerfolders, folders } = action.response;
      const dlf = datalayerfolders.map((e) => {
        const link = layerType(
          e.datalayer.datalayersource.datasource.datasourcetype.typename,
          e.datalayer.datalayersource,
          e.datalayer
        );
        return {
          title: e.datalayer.displayname,
          link,
          type: e.datalayer.datalayersource.datasource.datasourcetype.typename,
          key: e.datalayerid,
          checked: false,
          opacity: 1,
          loaded: false,
          layerName: e.datalayer.datalayersource.layername,
          attributes: e.datalayer.datalayersource.attributes,
        };
      });
      const folder = folders.map((e) => {
        const link = "";
        return {
          title: e.foldername,
          link,
          type: "folder",
          key: e.folderid,
        };
      });
      layers[1].children.push(...folder, ...dlf);
      featureLayers.push(...dlf);
      return {
        ...state,
        weather: action.response,
        layers,
        featureLayers,
      };
    }

    case FETCH_TRACKING_SUCCESS: {
      const layers = state.layers;
      const featureLayers = state.featureLayers;
      const { datalayerfolders, folders } = action.response;
      const dlf = datalayerfolders.map((e) => {
        const link = layerType(
          e.datalayer.datalayersource.datasource.datasourcetype.typename,
          e.datalayer.datalayersource,
          e.datalayer
        );
        return {
          title: e.datalayer.displayname,
          link,
          type: e.datalayer.datalayersource.datasource.datasourcetype.typename,
          key: e.datalayerid,
          checked: false,
          opacity: 1,
          loaded: false,
          layerName: e.datalayer.datalayersource.layername,
          attributes: e.datalayer.datalayersource.attributes,
        };
      });
      const folder = folders.map((e) => {
        const link = "";
        return {
          title: e.foldername,
          link,
          type: "folder",
          key: e.folderid,
        };
      });
      layers[2].children.push(...folder, ...dlf);
      featureLayers.push(...dlf);
      return {
        ...state,
        tracking: action.response,
        layers,
        featureLayers,
      };
    }

    case HANDLE_FOLDER_DATA: {
      const { datalayerfolders, folders } = action.response;
      const featureLayers = state.featureLayers;
      const layers = state.layers[layersMap[action.folderType]];
      const obj = layers.children.map((item) => {
        if (item.type === "folder" && item.key === action.response.rootId) {
          item.children = [];
          const dlf = datalayerfolders.map((e) => {
            const link = layerType(
              e.datalayer.datalayersource.datasource.datasourcetype.typename,
              e.datalayer.datalayersource,
              e.datalayer
            );
            return {
              title: e.datalayer.displayname,
              link,
              type: e.datalayer.datalayersource.datasource.datasourcetype
                .typename,
              key: e.datalayerid,
              checked: false,
              opacity: 1,
              loaded: false,
            };
          });
          const folder = folders.map((e) => {
            const link = "";
            return {
              title: e.foldername,
              link,
              type: "folder",
              key: e.folderid,
            };
          });
          item.children.push(...folder, ...dlf);
          featureLayers.push(...dlf);
        }
        return item;
      });

      const updateLayers = state.layers;
      updateLayers[layersMap[action.folderType]] = {
        ...updateLayers[layersMap[action.folderType]],
        children: obj,
      };

      return {
        ...state,
        layers: updateLayers,
      };
    }

    case FETCH_ROOMS_SUCCESS: {
      return {
        ...state,
        room: action.response,
      };
    }

    case HANDLE_INCIDENT_NAME: {
      return {
        ...state,
        common: {
          incidentName: action.name,
        },
      };
    }

    case HANDLE_LAYER_CHECK_FLAG: {
      const featureLayers = state.featureLayers.map((ele) => {
        if (ele.key === action.key) {
          ele[action.flagKey] = action.flag;
        }
        return ele;
      });
      return {
        ...state,
        featureLayers,
      };
    }

    default:
      return state;
  }
};

export default reducer;
