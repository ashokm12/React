import { Checkbox } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMaps } from "../../actions";

const Maps = ({ reducer, fetchMaps }) => {
  const { maps } = reducer;
  useEffect(() => {
    fetchMaps();
  }, []);
  return (
    <>
      {maps.folders.map((el) => (
        <Collapse key={el.rootId}>
          <Panel header={el.foldername} key={el.foldername}>
            <div className="mb-4">
              <Checkbox>{le.datalayer.displayname}</Checkbox>
            </div>
          </Panel>
        </Collapse>
      ))}
      {maps.datalayerfolders.map((ele) => (
        <div className="mb-4">
          <Checkbox checked={false}>{ele.datalayer.displayname}</Checkbox>
        </div>
      ))}
    </>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, { fetchMaps })(Maps);
