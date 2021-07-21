import { connect } from 'react-redux'
import { getLayersAction } from '../actions'
import MyMap from '../components/MyMap'

// Map Redux state to component props
const mapStateToProps = (state) => {
  return {
    selected: state.selected,
  }
}

// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => {
  return {
    onSelectClick: selected => dispatch(selectAction(selected)),
    onVisiblePlacesChange: (places) => dispatch(visiblePlacesAction(places)),
    onNewLayerSelected: layer => dispatch(newLayerAction(layer)),
    getLayers: layer => dispatch(getLayersAction(layer))
  }
}

// Connected Container:
const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMap)

export default MapContainer