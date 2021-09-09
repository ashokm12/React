import { Checkbox, Collapse } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchFire } from "../../actions";

const { Panel } = Collapse;

const Fire = ({ reducer, fetchFire }) => {
  const { fire } = reducer;
  useEffect(() => {
    fetchFire();
  }, []);
  return (
    <>
      {fire.folders.map((el) => (
        <Collapse key={el.rootId}>
          <Panel header={el.foldername} key={el.foldername}>
            <div className="mb-4">
              <Checkbox>Briceburg IR</Checkbox>
            </div>
          </Panel>
        </Collapse>
      ))}
      {fire.datalayerfolders.map((ele) => (
        <div className="mb-4">
          <Checkbox checked={false}>{ele.datalayer.displayname}</Checkbox>
        </div>
      ))}
    </>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, { fetchFire })(Fire);
