import React, { useState } from "react";
import { Provider } from "react-redux";
import Header from "./components/Header";

import MyMap from "./components/MyMap";
import configureStore from "./store";

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <div className="overflow-hidden">
        <Header />
        <MyMap />
      </div>
    </Provider>
  );
}

export default App;
