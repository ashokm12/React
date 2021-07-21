import React, { useState } from "react";
import { Provider } from "react-redux";
import { createStore } from 'redux'
import reducer from './reducers'
import MapContainer from "./containers/MapContainer";
import LayersHeader from "./components/LayersHeader"
import configureStore from "./store";

const store = createStore(reducer)

const App = () => {
  return (
    <Provider store={store}>
       <LayersHeader />
      <MapContainer />
    </Provider>
  );
}

export default App;
