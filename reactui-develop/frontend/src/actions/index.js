import { CALL_API } from "../common/middlewares/get";
import { POST_API } from "../common/middlewares/post";
import { restEndpoint } from "../common/config/customData";
import { urlEndpoint } from "../common/config/customData";
import { message } from "antd";

export const FETCH_USERNAME_SUCCESS = "FETCH_USERNAME_SUCCESS";
export const fetchUser = () => ({
  [CALL_API]: {
    endpoint: urlEndpoint + "/nics/properties",
    types: ["____", FETCH_USERNAME_SUCCESS, "___"],
    onSuccess: (response, state, dispatch) => {
      dispatch(fetchWorkspace());
    },
  },
});

export const FETCH_WORKSPACE_SUCCESS = "FETCH_WORKSPACE_SUCCESS";
export const fetchWorkspace = () => ({
  [CALL_API]: {
    endpoint: restEndpoint + "/workspace",
    types: ["____", FETCH_WORKSPACE_SUCCESS, "___"],
    onSuccess: (response, state, dispatch) => {
      if (response.workspaces && response.workspaces.length) {
        const worskspace = response.workspaces.filter((el) => el.enabled);
        if (worskspace.length) {
          dispatch(fetchIncidentType(worskspace[0].workspaceid));
          dispatch(fetchUserDetail());
        }
      }
    },
  },
});

export const GET_SESSION_SUCCESS = "GET_SESSION_SUCCESS";
export const fetchSession = () => ({
  [POST_API]: {
    endpoint: (state) =>
      `${restEndpoint}/users/${state.reducer.workspaceId}/createsession?userId=${state.reducer.userDetails.userId}&displayName=${state.reducer.user.email}&userOrgId=${state.reducer.userDetails.userOrgs[0].userorgid}&systemRoleId=${state.reducer.userDetails.userOrgs[0].systemroleid}&sessionId=${state.reducer.user.sessionId}`,
    types: ["____", GET_SESSION_SUCCESS, "___"],
    isPayloadJson: true,
    payload: {},
  },
});

export const FETCH_INCIDENT_TYPE_SUCCESS = "FETCH_INCIDENT_TYPE_SUCCESS";
export const fetchIncidentType = (id) => ({
  [CALL_API]: {
    endpoint: `${restEndpoint}/incidents/${id}/incidenttype`,
    types: ["____", FETCH_INCIDENT_TYPE_SUCCESS, "___"],
  },
});

export const FETCH_USER_DETAIL_SUCCESS = "FETCH_USER_DETAIL_SUCCESS";
export const fetchUserDetail = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/users/${state.reducer.workspaceId}/userOrgs?userName=${state.reducer.user.email}`,
    types: ["____", FETCH_USER_DETAIL_SUCCESS, "___"],
    onSuccess: (response, state, dispatch) => {
      dispatch(fetchSession());
    },
  },
});

export const FETCH_INCIDENT_TREE_SUCCESS = "FETCH_INCIDENT_TREE_SUCCESS";
export const fetchIncidentTree = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/incidents/${state.reducer.workspaceId}/getincidenttree?accessibleByUserId=${state.reducer.userDetails.userId}`,
    types: ["____", FETCH_INCIDENT_TREE_SUCCESS, "___"],
  },
});

export const FETCH_MAPS_SUCCESS = "FETCH_MAPS_SUCCESS";
export const fetchMaps = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/folder/${state.reducer.workspaceId}/name/Maps`,
    types: ["____", FETCH_MAPS_SUCCESS, "___"],
    onSuccess: (res, state, dispatch) => {
      res.folders.forEach((item) => {
        dispatch(fetchFolderData("maps", item.folderid));
      });
    },
  },
});

export const FETCH_FIRE_SUCCESS = "FETCH_FIRE_SUCCESS";
export const fetchFire = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/folder/${state.reducer.workspaceId}/name/Fire`,
    types: ["____", FETCH_FIRE_SUCCESS, "___"],
    onSuccess: (res, state, dispatch) => {
      res.folders.forEach((item) => {
        dispatch(fetchFolderData("fire", item.folderid));
      });
    },
  },
});

export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const fetchData = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/folder/${state.reducer.workspaceId}/name/Data`,
    types: ["____", FETCH_DATA_SUCCESS, "___"],
    onSuccess: (res, state, dispatch) => {
      res.folders.forEach((item) => {
        dispatch(fetchFolderData("data", item.folderid));
      });
    },
  },
});

export const UPDATE_LAYER = "UPDATE_LAYER";
export const updateLayer = (data) => ({
  type: UPDATE_LAYER,
  data,
});

export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const fetchWeather = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/folder/${state.reducer.workspaceId}/name/Weather`,
    types: ["____", FETCH_WEATHER_SUCCESS, "___"],
    onSuccess: (res, state, dispatch) => {
      res.folders.forEach((item) => {
        dispatch(fetchFolderData("weather", item.folderid));
      });
    },
  },
});

export const FETCH_TRACKING_SUCCESS = "FETCH_TRACKING_SUCCESS";
export const fetchTracking = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/folder/${state.reducer.workspaceId}/name/Tracking`,
    types: ["____", FETCH_TRACKING_SUCCESS, "___"],
    onSuccess: (res, state, dispatch) => {
      res.folders.forEach((item) => {
        dispatch(fetchFolderData("tracking", item.folderid));
      });
    },
  },
});

export const FETCH_FOLDER_DATA_SUCCESS = "FETCH_FOLDER_DATA_SUCCESS";
export const fetchFolderData = (folderType, id) => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/folder/${state.reducer.workspaceId}/id/${id}`,
    types: ["____", FETCH_FOLDER_DATA_SUCCESS, "___"],
    onSuccess: (response, state, dispatch) =>
      dispatch(handleFolderData(response, folderType)),
  },
});

export const HANDLE_FOLDER_DATA = "HANDLE_FOLDER_DATA";
export const handleFolderData = (response, folderType) => ({
  type: HANDLE_FOLDER_DATA,
  response,
  folderType,
});

export const FETCH_ROOMS_SUCCESS = "FETCH_ROOMS_SUCCESS";
export const fetchRoom = (id, name) => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/collabroom/${id}?userId=${state.reducer.userDetails.userId}`,
    types: ["____", FETCH_ROOMS_SUCCESS, "___"],
    onSuccess: (response, state, dispatch) =>
      dispatch(handleIncidentName(name)),
  },
});

export const FETCH_FEATURES_ROOMS_SUCCESS = "FETCH_ROOMS_SUCCESS";
export const fetchRoomFeatures = (id) => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/features/collabroom/${id}?userId=${state.reducer.userDetails.userId}`,
    types: ["____", FETCH_FEATURES_ROOMS_SUCCESS, "___"],
    onSuccess: (response, state, dispatch) =>
      dispatch(handleIncidentName(name)),
  },
});

export const HANDLE_INCIDENT_NAME = "HANDLE_INCIDENT_NAME";
export const handleIncidentName = (name) => ({
  type: HANDLE_INCIDENT_NAME,
  name,
});

export const FETCH_PROPERTIES_LAYER_SUCCESS = "FETCH_PROPERTIES_LAYER_SUCCESS";
export const fetchLayerProperties = (id) => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/datalayer/${state.reducer.workspaceId}/layer/${id}`,
    types: ["____", FETCH_PROPERTIES_LAYER_SUCCESS, "___"],
  },
});

export const FETCH_COUNTRIES_SUCCESS = "FETCH_COUNTRIES_SUCCESS";
export const fetchCountries = () => ({
  [CALL_API]: {
    endpoint: restEndpoint + "/country/",
    types: ["____", FETCH_COUNTRIES_SUCCESS, "___"],
  },
});

export const FETCH_WMS_SUCCESS = "FETCH_WMS_SUCCESS";
export const fetchWms = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/datalayer/${state.reducer.workspaceId}/sources/wms`,
    types: ["____", FETCH_WMS_SUCCESS, "___"],
  },
});

export const FETCH_WFS_SUCCESS = "FETCH_WFS_SUCCESS";
export const fetchWfs = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/datalayer/${state.reducer.workspaceId}/sources/wfs`,
    types: ["____", FETCH_WFS_SUCCESS, "___"],
  },
});

export const FETCH_ARCG_SUCCESS = "FETCH_ARCG_SUCCESS";
export const fetchArcgisent = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/datalayer/${state.reducer.workspaceId}/sources/arcgisent`,
    types: ["____", FETCH_ARCG_SUCCESS, "___"],
  },
});

export const FETCH_ARCG_ONLINE_SUCCESS = "FETCH_ARCG_ONLINE_SUCCESS";
export const fetchArcgOnline = () => ({
  [CALL_API]: {
    endpoint: (state) =>
      `${restEndpoint}/datalayer/${state.reducer.workspaceId}/sources/arcgisonline`,
    types: ["____", FETCH_ARCG_ONLINE_SUCCESS, "___"],
  },
});

export const handleSubmitIncident = () => ({
  [POST_API]: {
    endpoint: restEndpoint + "/incidents/1?orgId=1&userId=71",
    types: ["____", "_____", "______"],
    payload: {
      active: true,
      description: "testing this incident",
      folder: "",
      incidentIncidenttypes: [{ incidenttypeid: 17 }],
      incidentname: "US CA QUALAPPS testing",
      incidentorgs: [],
      lat: 38.58160000000001,
      lon: -121.49439999999998,
      parentincidentid: null,
      usersessionid: 3460,
      workspaceid: 1,
    },
  },
});

export const fetchCollabsRoom = (incidentId) => ({
  [CALL_API]: {
    endpoint: restEndpoint + "/collabroom/39",
    types: ["____", "____", "_____"],
  },
});

export const handleKMZ = () => ({
  [POST_API]: {
    endpoint: restEndpoint + "/incidents/1?orgId=1&userId=71",
    types: ["____", "_____", "______"],
    payload: {
      active: true,
    },
  },
});

export const handleGPX = () => ({
  [POST_API]: {
    endpoint: restEndpoint + "/incidents/1?orgId=1&userId=71",
    types: ["____", "_____", "______"],
    payload: {
      active: true,
    },
  },
});

export const handleGeoJson = () => ({
  [POST_API]: {
    endpoint: restEndpoint + "/incidents/1?orgId=1&userId=71",
    types: ["____", "_____", "______"],
    payload: {
      active: true,
    },
  },
});

export const handleShapeFile = () => ({
  [POST_API]: {
    endpoint: restEndpoint + "/incidents/1?orgId=1&userId=71",
    types: ["____", "_____", "______"],
    payload: {
      active: true,
    },
  },
});

export const handleImage = () => ({
  [POST_API]: {
    endpoint: restEndpoint + "/incidents/1?orgId=1&userId=71",
    types: ["____", "_____", "______"],
    payload: {
      active: true,
    },
  },
});

export const handleBreadcrumb = () => ({
  [POST_API]: {
    endpoint: restEndpoint + "/incidents/1?orgId=1&userId=71",
    types: ["____", "_____", "______"],
    payload: {
      active: true,
    },
  },
});

export const HANDLE_GEORSS_CHANGE = "HANDLE_GEORSS_CHANGE";
export const handleGeoRssChange = (obj) => ({
  type: HANDLE_GEORSS_CHANGE,
  obj,
});

export const HANDLE_GEORSS_SUCCESS = "HANDLE_GEORSS_SUCCESS";
export const handleGeoRss = () => ({
  [POST_API]: {
    endpoint: (state) =>
      `${restEndpoint}/datalayer/${state.reducer.workspaceId}/sources/georss/georss/${state.reducer.userDetails.userOrgs[0].userorgid}/${state.reducer.currentSessionId}`,
    types: ["____", HANDLE_GEORSS_SUCCESS, "______"],
    payload: (state) => {
      return {
        usersessionid: state.reducer.currentSessionId,
        ...state.reducer.georss,
      };
    },
    onSuccess: () => {
      message.success("Upload Successfully");
    },
  },
});

export const HANDLE_KML_CHANGE = "HANDLE_KML_CHANGE";
export const handleKmlChange = (obj) => ({
  type: HANDLE_KML_CHANGE,
  obj,
});

export const HANDLE_KML_SUCCESS = "HANDLE_KML_SUCCESS";
export const handleKml = () => ({
  [POST_API]: {
    endpoint: (state) =>
      `${restEndpoint}/datalayer/${state.reducer.workspaceId}/sources/kml/document/${state.reducer.userDetails.userOrgs[0].userorgid}`,
    types: ["____", HANDLE_KML_SUCCESS, "______"],
    isPayloadJson: 'multipart',
    payload: (state) => {
      return {
        usersessionid: state.reducer.currentSessionId,
        ...state.reducer.kml,
      };
    },
    onSuccess: () => {
      message.success("Upload Successfully");
    },
  },
});

export const HANDLE_GEOTIFF_CHANGE = "HANDLE_GEOTIFF_CHANGE";
export const handleGeoTiffChange = (obj) => ({
  type: HANDLE_GEOTIFF_CHANGE,
  obj,
});

export const HANDLE_GEOTIFF_SUCCESS = "HANDLE_GEOTIFF_SUCCESS";
export const handleGeoTiff = () => ({
  [POST_API]: {
    endpoint: (state) =>
      `${restEndpoint}/datalayer/${
        state.reducer.workspaceId
      }/geotiff?isMosaic=${state.reducer.geotiff.mosaic === "on" ? "true" : "false"}`,
    types: ["____", HANDLE_GEOTIFF_SUCCESS, "______"],
    isPayloadJson: "multipart",
    payload: (state) => {
      return {
        ...state.reducer.geotiff,
      };
    },
    onSuccess: () => {
      message.success("Upload Successfully");
    },
  },
});

export const HANDLE_LAYER_CHECK_FLAG = "HANDLE_LAYER_CHECK_FLAG";
export const handleLayerCheck = (key, flag, flagKey) => ({
  type: HANDLE_LAYER_CHECK_FLAG,
  key,
  flag,
  flagKey,
});

export const HANDLE_MENU_BAR = "HANDLE_MENU_BAR";
export const handleMenu = (flag) => ({
  type: HANDLE_MENU_BAR,
  flag,
});

export const HANDLE_RIGHT_CLICK_NODE = "HANDLE_RIGHT_CLICK_NODE";
export const handleRightClick = (obj) => ({
  type: HANDLE_RIGHT_CLICK_NODE,
  obj,
});

export const HANDLE_OPACITY_CHANGE = "HANDLE_OPACITY_CHANGE";
export const handleOpacityChange = (flag) => ({
  type: HANDLE_OPACITY_CHANGE,
  flag,
});

export const HANDLE_PROPERTY_MODAL_CHANGE = "HANDLE_PROPERTY_MODAL_CHANGE";
export const handlePropertyModalChange = (val) => ({
  type: HANDLE_PROPERTY_MODAL_CHANGE,
  val,
});

export const HANDLE_RESET_PROPERTIES = "HANDLE_RESET_PROPERTIES";
export const handleResetProperties = () => ({
  type: HANDLE_RESET_PROPERTIES,
});
