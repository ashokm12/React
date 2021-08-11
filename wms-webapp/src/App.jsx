import React from "react";
import { Provider } from "react-redux";
import MapContainer from "./containers/MapContainer";
import HeaderContainer from "./containers/HeaderContainer"
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <HeaderContainer />
      <MapContainer />
    </Provider>
  );
}

export default App;
