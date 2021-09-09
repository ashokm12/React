import { Checkbox, Collapse } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTracking } from "../../actions";

const { Panel } = Collapse;

const Tracking = ({ reducer, fetchTracking }) => {
  const { tracking } = reducer;
  useEffect(() => {
    fetchTracking();
  }, []);
  return (
    <>
      {tracking.folders.map((el) => (
        <Collapse key={el.rootId}>
          <Panel header={el.foldername} key={el.foldername}>
            <div className="mb-4">
              <Checkbox>Briceburg IR</Checkbox>
            </div>
          </Panel>
        </Collapse>
      ))}
      {tracking.datalayerfolders.map((ele) => (
        <div className="mb-4">
          <Checkbox checked={false}>{ele.datalayer.displayname}</Checkbox>
        </div>
      ))}
    </>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, { fetchTracking })(Tracking);
