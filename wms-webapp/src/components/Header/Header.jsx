import React, { useEffect, Component } from "react";

class Header extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {layers:""}
    }

    componentDidMount() {
      this.props.fetchLayers()
    }

    render() {
      const attribution = this.props.layers.layersReducer.layers.attributions
      return (<h2 className='header'>
        WMS Layer App: {attribution ? attribution : "none" }
      </h2>);
    }
}

export default Header;