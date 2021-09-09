import { Collapse, Divider, Checkbox } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import Data from "./MenuItems/Data";
import Fire from "./MenuItems/Fire";
import Incidents from "./MenuItems/Incidents";
import Maps from "./MenuItems/Maps";
import Tools from "./MenuItems/Tools";
import Tracking from "./MenuItems/Tracking";
import Weather from "./MenuItems/Weather";
import Layers from "./MenuItems/Layers";
import TestMediator from "./MenuItems/TestMediator";

const { Panel } = Collapse;

const Menu = ({ closeMenu, reducer }) => {
  const [menuRoute, setMenuRoute] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const { user: { email } = {} } = reducer;
  return (
    <div
      className="fixed left-0 bottom-0 w-1/5 px-2 py-4 z-20 overflow-y-scroll"
      style={{ backgroundColor: "#d9e6f4", top: "54px" }}
    >
      {!menuRoute ? (
        <div>
          <div className="flex justify-between items-center mt-0">
            <div className="flex items-center">
              {menuRoute ? (
                <img
                  src="https://image.flaticon.com/icons/png/512/2223/2223615.png"
                  className="w-3 h-3 cursor-pointer mr-4"
                  onClick={() => setMenuRoute("")}
                />
              ) : null}
              <div className="text-gray-800 font-bold text-md">Favorites</div>
            </div>
            {!menuRoute ? (
              <div
                className="font-bold cursor-pointer p-2 rounded"
                onClick={closeMenu}
              >
                <img
                  src="https://image.flaticon.com/icons/png/512/1828/1828778.png"
                  width={15}
                />
              </div>
            ) : null}
          </div>
          {/* <Divider style={{ margin: '24px 0px' }} /> */}
          <div className="text-gray-600">No Favorites</div>
        </div>
      ) : null}

      <div className="flex justify-between items-center mt-8">
        <div className="flex items-center">
          {menuRoute ? (
            <img
              src="https://image.flaticon.com/icons/png/512/2223/2223615.png"
              className="w-3 h-3 cursor-pointer mr-4"
              onClick={() => setMenuRoute("")}
            />
          ) : null}
          <div className="text-gray-800 font-bold text-md">
            {menuRoute || "All Apps"}
          </div>
        </div>

        {menuRoute ? (
          <div
            className="font-bold cursor-pointer p-2 rounded"
            onClick={closeMenu}
          >
            <img
              src="https://image.flaticon.com/icons/png/512/1828/1828778.png"
              width={15}
            />
          </div>
        ) : null}
      </div>
      {/* <Divider /> */}

      {!menuRoute ? (
        <div className="flex flex-wrap justify-between mt-4">
          <div
            className="w-3/10 mx-auto flex items-center justify-center flex-col bg-gray-50 rounded hover:shadow p-4 hover:bg-gray--100 cursor-pointer mb-4"
            onClick={() => setMenuRoute("BaseMap")}
          >
            <img
              src="https://image.flaticon.com/icons/png/512/684/684908.png"
              width={20}
            />
            <div className="mt-2 font-semibold text-xs">BaseMap</div>
          </div>

          <div
            className="w-3/10 mx-auto flex items-center justify-center flex-col bg-gray-50 rounded hover:shadow p-4 hover:bg-gray--100 cursor-pointer mb-4"
            onClick={() => setMenuRoute("Workspace")}
          >
            <img
              src="https://image.flaticon.com/icons/png/512/201/201559.png"
              width={20}
            />
            <div className="mt-2 font-semibold text-center text-xs">
              Workspace
            </div>
          </div>
          <div
            className="w-3/10 mx-auto flex items-center justify-center flex-col bg-gray-50 rounded hover:shadow p-4 hover:bg-gray--100 cursor-pointer mb-4"
            onClick={() => setMenuRoute("Incidents")}
          >
            <img
              src="https://image.flaticon.com/icons/png/512/595/595067.png"
              width={20}
            />
            <div className="mt-2 font-semibold text-center text-xs">
              Incidents
            </div>
          </div>
          <div
            className="w-3/10 flex items-center justify-center flex-col bg-gray-50 rounded hover:shadow p-4 hover:bg-gray--100 cursor-pointer mb-4"
            onClick={() => setMenuRoute("Layers")}
          >
            <img
              src="https://image.flaticon.com/icons/png/512/802/802033.png"
              width={20}
            />
            <div className="mt-2 font-semibold text-center text-xs">Layers</div>
          </div>
          <div
              className="w-3/10 mx-auto flex items-center justify-center flex-col bg-gray-50 rounded hover:shadow p-4 hover:bg-gray--100 cursor-pointer mb-4"
              onClick={() => setMenuRoute("Fire")}
            >
              <img
                src="https://image.flaticon.com/icons/png/512/785/785116.png"
                width={20}
              />
              <div className="mt-2 font-semibold text-center text-xs">Fire</div>
            </div>
            <div
              className="w-3/10 mx-auto flex items-center justify-center flex-col bg-gray-50 rounded hover:shadow p-4 hover:bg-gray--100 cursor-pointer mb-4"
              onClick={() => setMenuRoute("Data")}
            >
              <img
                src="https://image.flaticon.com/icons/png/512/1849/1849515.png"
                width={20}
              />
              <div className="mt-2 font-semibold text-center text-xs">Data</div>
            </div>
          <div
            className="w-3/10 mx-auto flex items-center justify-center flex-col bg-gray-50 rounded hover:shadow p-4 hover:bg-gray--100 cursor-pointer mb-4"
            onClick={() => setMenuRoute("TestMediator")}
          >
             <img
                src="https://image.flaticon.com/icons/png/512/1849/1849515.png"
                width={20}
              />
            <div className="mt-2 font-semibold text-center text-xs">TestMediator</div>
          </div>


          <div className="fixed bottom-0 left-0 z-20 w-1/5 pb-4 shadow-lg bg-white">
            {userMenu ? (
              <div className="p-8">
                <div className="p-2 bg-white">Account Information</div>
                <div className="p-2 bg-white">Help</div>
                <div className="p-2 bg-white">Contact Us</div>
                <div className="p-2 bg-white">About</div>
                <div className="p-2 bg-white">Logout</div>
              </div>
            ) : null}
            <Divider style={{ marginTop: 0 }} />
            <div className="flex justify-around items-center">
              <div>{email}</div>
              <div
                onClick={() => setUserMenu(!userMenu)}
                className="cursor-pointer"
              >
                <img
                  src="https://image.flaticon.com/icons/png/512/271/271239.png"
                  width={12}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {menuRoute === "BaseMap" ? <Maps /> : null}

      {menuRoute === "Fire" ? <Fire /> : null}

      {menuRoute === "Weather" ? <Weather /> : null}

      {menuRoute === "Tracking" ? <Tracking /> : null}

      {menuRoute === "Tools" ? <Tools /> : null}

      {/* {menuRoute === "Workspace" ? <Data /> : null} */}

      {menuRoute === "Incidents" ? <Incidents /> : null}

      {/* {menuRoute === "Rooms" ? <Rooms /> : null} */}

      {menuRoute === "Data" ? <Data /> : null}

      {menuRoute === "Layers" ? <Layers /> : null}

      {menuRoute === "TestMediator" ? <TestMediator /> : null}
    </div>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, {})(Menu);

// logoutOfOIDCSession: function() {
//   var _mediator = this.mediator;
//   var topic = "nics.logout.oidc.usersession.callback";
//   Core.EventManager.createCallbackHandler(topic, this, function() {
//     _mediator.close();
//     this.redirectToLoggedOut();
//   });
//   var url = Ext.String.format(
//     "https://{0}/auth/realms/NICS/protocol/openid-connect/logout?"
//      + "redirect_uri=https://{0}/loggedOut/loggedOut.html", 
//     Core.Config.getProperty("nics.domain"));
//   this.mediator.sendRequestMessage(url, topic, {});
// },

// redirectToLoggedOut: function() {
//   this.clearCookies();
//   location.href = Ext.String.format(
//     "https://{0}/sso/redirect_uri?logout=https://{0}/loggedOut/loggedOut.html", 
//     Core.Config.getProperty("nics.domain"));
// },

// redirectToLoggedOutWithoutSSO: function() {
//   this.clearCookies();
//   location.href = Ext.String.format(
//     "https://{0}/loggedOut/loggedOut.html", 
//     Core.Config.getProperty("nics.domain"));
// }, 