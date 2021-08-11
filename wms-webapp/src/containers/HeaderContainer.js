import { connect } from 'react-redux'
import Header from '../components/Header'
import { fetchLayers } from '../components/Layers/layerActions'

const mapStateToProps = (state) => {
  return {
    layers: state,
  }
}


export default connect(mapStateToProps, {
  fetchLayers,
})(Header);