import { connect } from 'react-redux'
import Map from '../components/Map/Map'

const mapStateToProps = (state) => {
  return {
    layers: state,
  }
}

export default connect(mapStateToProps, null)(Map);