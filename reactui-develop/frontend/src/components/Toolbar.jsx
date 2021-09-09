import React, { useState } from "react";
import Menu from "./Menu";
import MessageBox from "./MessageBox";
import { connect } from "react-redux";
import { handleMenu } from "../actions";

const Toolbar = ({
  olmap,
  addInteraction,
  draw,
  selectFeature,
  removeFeature,
  addDrawInteraction,
  freeDraw,
  setFreeDraw,
  handleMenu,
}) => {
  const [showToolbar, useToolbar] = useState(false);
  const [showMenu, useMenu] = useState(false);
  const [showMessageBox, useMessageBox] = useState(false);
  const [showDrawTool, useTool] = useState(false);
  const [showFreeDrawTool, useFreeTool] = useState(false);
  const [showMarkers, useMarkerTool] = useState(false);
  return (
    <>
      <div
        className="fixed"
        style={{ bottom: "25px", right: "20px", zIndex: 10 }}
      >
        <a
          className="cursor-pointer"
          onClick={() => {
            useToolbar(!showToolbar);
          }}
        >
          <img
            src={
              !showToolbar
                ? "https://image.flaticon.com/icons/png/512/159/159604.png"
                : "https://image.flaticon.com/icons/png/512/565/565655.png"
            }
            width={50}
          />
        </a>
      </div>
      {showToolbar ? (
        <div className="fixed" style={{ top: 70, right: 15, zIndex: 10 }}>
          <div className="bell-playground" />
          <span>
            <div
              style={{
                background: "#d3e1f1",
                padding: 4,
                border: "2px solid #99bce8",
                borderRadius: 4,
              }}
            >
              <div>
                <div className="p-3 hover:bg-blue-100">
                  <a
                    className="cursor-pointer"
                    onClick={() => {
                      olmap.removeInteraction(draw);
                      selectFeature();
                    }}
                  >
                    <img
                      src="https://image.flaticon.com/icons/png/512/149/149852.png"
                      width={25}
                      className="mx-auto"
                    />
                  </a>
                </div>
                <div className="p-3 hover:bg-blue-100">
                  <a
                    className="cursor-pointer"
                    onClick={() => {
                      olmap.removeInteraction(draw);
                      selectFeature();
                    }}
                  >
                    <img
                      src="https://image.flaticon.com/icons/png/512/2627/2627937.png"
                      width={25}
                      className="mx-auto"
                    />
                  </a>
                </div>
                {showDrawTool ? (
                  <div
                    className="absolute rounded shadow-lg border-blue-300 border-2"
                    style={{ right: 100 }}
                  >
                    <div
                      className="absolute z-10"
                      style={{ right: "-10px", top: "-10px" }}
                    >
                      <span
                        className="text-red-400 font-bold cursor-pointer"
                        onClick={() => {
                          addInteraction("None");
                          useTool(false);
                        }}
                      >
                        <img
                          src="https://image.flaticon.com/icons/png/512/463/463612.png"
                          width={24}
                        />
                      </span>
                    </div>
                    <div className="bg-gray-200 p-2 h-24 w-24 rounded">
                      <div className="flex justify-around items-center my-1">
                        <div
                          className="mt-1 p-1 w-2/5 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            olmap.removeInteraction(draw);
                            addInteraction("LineString");
                          }}
                        >
                          <img
                            src="https://image.flaticon.com/icons/png/512/815/815497.png"
                            width={24}
                          />
                        </div>
                        <div
                          className="mt-1 p-1 w-2/5 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            olmap.removeInteraction(draw);
                            addInteraction("Circle");
                          }}
                        >
                          <img
                            src="https://image.flaticon.com/icons/png/512/481/481078.png"
                            width={24}
                          />
                        </div>
                      </div>

                      <div className="flex justify-around items-center my-1">
                        <div
                          className="mt-1 p-1 w-2/5 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            olmap.removeInteraction(draw);
                            addInteraction("Square");
                          }}
                        >
                          <img
                            src="https://image.flaticon.com/icons/png/512/2627/2627937.png"
                            width={24}
                          />
                        </div>
                        <div
                          className="mt-1 p-1 w-2/5 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            olmap.removeInteraction(draw);
                            addInteraction("Box");
                          }}
                        >
                          <img
                            src="https://image.flaticon.com/icons/png/512/33/33848.png"
                            width={24}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div
                  className="p-3 hover:bg-blue-100 relative"
                  onClick={() => useTool(!showDrawTool)}
                >
                  <a className="cursor-pointer">
                    <img
                      src="https://image.flaticon.com/icons/png/512/815/815497.png"
                      width={30}
                      className="mx-auto"
                    />
                  </a>
                </div>
                {showFreeDrawTool ? (
                  <div
                    className="absolute rounded shadow-lg border-blue-300 border-2"
                    style={{ right: 100 }}
                  >
                    <div
                      className="absolute z-10"
                      style={{ right: "-10px", top: "-10px" }}
                    >
                      <span
                        className="text-red-400 font-bold cursor-pointer"
                        onClick={() => {
                          addDrawInteraction("None");
                          useFreeTool(false);
                        }}
                      >
                        <img
                          src="https://image.flaticon.com/icons/png/512/463/463612.png"
                          width={24}
                        />
                      </span>
                    </div>
                    <div className="bg-gray-200 p-2 h-24 w-24 rounded">
                      <div className="flex justify-around items-center my-1 ">
                        <div
                          className="mt-1 p-1 w-2/5 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            olmap.removeInteraction(draw);
                            addDrawInteraction("LineString");
                          }}
                        >
                          <img
                            src="https://image.flaticon.com/icons/png/512/815/815497.png"
                            width={24}
                          />
                        </div>
                        <div
                          className="p-1 w-2/5 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            olmap.removeInteraction(draw);
                            addDrawInteraction("Circle");
                          }}
                        >
                          <img
                            src="https://image.flaticon.com/icons/png/512/481/481078.png"
                            width={24}
                          />
                        </div>
                      </div>

                      <div className="flex justify-around items-center my-1">
                        <div
                          className="p-1 w-2/5 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            olmap.removeInteraction(draw);
                            addDrawInteraction("Square");
                          }}
                        >
                          <img
                            src="https://image.flaticon.com/icons/png/512/2627/2627937.png"
                            width={24}
                          />
                        </div>
                        <div
                          className="p-1 w-2/5 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            olmap.removeInteraction(draw);
                            addDrawInteraction("Box");
                          }}
                        >
                          <img
                            src="https://image.flaticon.com/icons/png/512/33/33848.png"
                            width={24}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div
                  className={freeDraw ? 'p-3 relative bg-blue-100' : 'p-3 hover:bg-blue-100 relative'}
                  onClick={() => {useTool(!showDrawTool); setFreeDraw(!freeDraw)}}
                >
                  <a className="cursor-pointer">
                    <img
                      src="https://image.flaticon.com/icons/png/512/598/598234.png"
                      width={30}
                      className="mx-auto"
                    />
                  </a>
                </div>
                <div
                  className="p-3 hover:bg-blue-100"
                  onClick={() => {
                    olmap.removeInteraction(draw);
                    removeFeature();
                  }}
                >
                  <a className="cursor-pointer">
                    <img
                      src="https://image.flaticon.com/icons/png/512/43/43279.png"
                      width={30}
                      className="mx-auto"
                    />
                  </a>
                </div>
                {/* <div className="p-3 hover:bg-blue-100">
                  <a className="cursor-pointer">
                    <img
                      src="https://image.flaticon.com/icons/png/512/1/1523.png"
                      width={30}
                      className="mx-auto"
                    />
                  </a>
                </div>
                <div className="p-3 hover:bg-blue-100">
                  <a className="cursor-pointer">
                    <img
                      src="https://image.flaticon.com/icons/png/512/0/340.png"
                      width={30}
                      className="mx-auto"
                    />
                  </a>
                </div> */}
                <div
                  className="mb-2 mt-4"
                  style={{ borderTop: "1px solid black" }}
                />
                {showMarkers ? (
                  <div
                    className="absolute rounded shadow-lg border-blue-300 border-2"
                    style={{ right: 100 }}
                  >
                    <div
                      className="absolute z-10"
                      style={{ right: "-10px", top: "-10px" }}
                    >
                      <span
                        className="text-red-400 font-bold cursor-pointer"
                        onClick={() => {
                          addDrawInteraction("None");
                          useMarkerTool(false);
                        }}
                      >
                        <img
                          src="https://image.flaticon.com/icons/png/512/463/463612.png"
                          width={24}
                        />
                      </span>
                    </div>
                    <div className="bg-gray-200 p-2 h-30 w-24 rounded">
                      <div className="flex">
                        <div
                          className="p-1 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            olmap.removeInteraction(draw);
                            addInteraction("add");
                          }}
                        >
                          <img
                            src="https://www.nwcg.gov/sites/default/files/publications/images/936-point-branch-break.jpg"
                            width={24}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="p-3 hover:bg-blue-100">
                  <a
                    className="cursor-pointer"
                    onClick={() => {
                      useMarkerTool(!showMarkers);
                      // olmap.removeInteraction(draw);
                      // addInteraction("add");
                    }}
                  >
                    <img
                      src="https://image.flaticon.com/icons/png/512/595/595067.png"
                      width={30}
                      className="mx-auto"
                    />
                  </a>
                </div>
                <div className="p-3 hover:bg-blue-100">
                  <a className="cursor-pointer">
                    <img
                      src="https://image.flaticon.com/icons/png/512/785/785116.png"
                      width={30}
                      className="mx-auto"
                    />
                  </a>
                </div>
                <div className="p-3 hover:bg-blue-100">
                  <a className="cursor-pointer">
                    <img
                      src="https://image.flaticon.com/icons/png/512/723/723955.png"
                      width={30}
                      className="mx-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </span>
        </div>
      ) : null}

      <div
        className="fixed"
        style={{ bottom: "25px", left: "20px", zIndex: 10 }}
      >
        <a
          className="cursor-pointer"
          onClick={() => {
            useMenu(true);
            handleMenu(true);
          }}
        >
          {!showMenu ? (
            <img
              src="https://image.flaticon.com/icons/png/512/847/847581.png"
              width={50}
            />
          ) : null}
        </a>
      </div>
      {showMenu ? (
        <div>
          <Menu closeMenu={() => {
            useMenu(false);
            handleMenu(false);
          }} />
        </div>
      ) : null}

      <div
        className="fixed"
        style={{ bottom: "2px", right: "260px", zIndex: 10 }}
      >
        <a
          className="cursor-pointer"
          onClick={() => {
            useMessageBox(!showMessageBox);
          }}
        >
          {!showMessageBox ? (
            <div className="w-64 p-2 rounded shadow" style={{ background: "rgba(0,60,136,.5)"}}>
              <div className="text-white">Messages</div>
            </div>
          ) : null}
        </a>
        {showMessageBox ? (
          <div>
            <MessageBox closeMessageBox={() => useMessageBox(false)} />
          </div>
        ) : null}
      </div>
    </>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, {
  handleMenu
})(Toolbar);

