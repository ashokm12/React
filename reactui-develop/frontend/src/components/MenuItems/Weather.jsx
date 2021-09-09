import { Checkbox, Collapse } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchFolderData, fetchWeather } from "../../actions";

const { Panel } = Collapse;

const Weather = ({ reducer, fetchWeather, fetchFolderData }) => {
  const { weather } = reducer;
  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <>
      {/* {weather.folders.map((el) => (
        <Collapse
          key={el.rootId}
          // onChange={() => }
        >
          <Panel header={el.foldername} key={el.foldername}>
            {el.datalayerfolders.map((item) => (
              <div className="mb-4">
                <Checkbox key={item.foldername}>
                  {item.datalayer.displayname}
                </Checkbox>
              </div>
            ))}
          </Panel>
        </Collapse>
      ))}
      {weather.datalayerfolders.map((ele) => (
        <div className="mb-4">
          <Checkbox checked={false}>{ele.datalayer.displayname}</Checkbox>
        </div>
      ))} */}

      <Tree
        className="draggable-tree"
        // defaultExpandedKeys={this.state.expandedKeys}
        draggable
        blockNode
        // onDragEnter={this.onDragEnter}
        // onDrop={this.onDrop}
        treeData={this.state.gData}
      />
    </>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, { fetchWeather, fetchFolderData })(
  Weather
);
