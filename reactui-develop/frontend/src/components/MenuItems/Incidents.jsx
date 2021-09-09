import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List, Avatar, Button, Modal, Select, Input } from "antd";
import { fetchIncidentTree, fetchRoom, fetchRoomFeatures } from "../../actions";

const { Option } = Select;
const { TextArea } = Input;

const Incidents = ({ reducer, fetchIncidentTree, fetchRoom, fetchRoomFeatures }) => {
  const { incidents: { incidents } = {}, room } = reducer;
  const [showModal, useModal] = useState("");
  const [incidentName, setIncidentName] = useState("");
  useEffect(() => {
    fetchIncidentTree();
  }, []);
  return (
    <>
      {showModal === "room" ? (
        <>
          {" "}
          <div className="mt-8">Incident - {incidentName}</div>
          <div className="mt-8">Rooms</div>
          <div style={{ height: "80%", overflow: "scroll" }} className="pb-64">
            <List
              itemLayout="horizontal"
              dataSource={room.results}
              renderItem={(item) => (
                <List.Item
                  onClick={() => {fetchRoomFeatures(item.collabRoomId); alert("integrate this in openlayer"); }}
                  className="cursor-pointer hover:bg-blue-100"
                  // onClick={() => {
                    
                  // }}
                >
                  <List.Item.Meta
                    title={<div>{item.name}</div>}
                  />
                </List.Item>
              )}
            />
          </div>
        </>
      ) : null}
      {showModal === "create" ? (
        <>
          <div className="flex items-center">
            <div>
              <div>Country</div>
              <Select
                defaultValue="lucy"
                style={{ width: 140 }}
                // onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div className="ml-8">
              <div>State</div>
              <Select
                defaultValue="lucy"
                style={{ width: 140 }}
                // onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
          </div>
          <div className="flex items-center mt-8">
            <div>
              <div>Latitude</div>
              <Input style={{ width: 140 }} />
            </div>
            <div className="ml-8">
              <div>Longitude</div>
              <Input style={{ width: 140 }} />
            </div>
          </div>
          <div className="mt-4">
            <div>Prefix</div>
            <div>QUALAPPS</div>
          </div>
          <div className="mt-4">
            <div>Parent Incident (Optional)</div>
            <div>
              <Select
                defaultValue="lucy"
                style={{ width: 310 }}
                // onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <div>Name</div>
            <div>
              <Input style={{ width: 310 }} />
            </div>
          </div>
          <div className="mt-4">
            <div>Description</div>
            <div>
              <TextArea rows={2} style={{ width: 310 }} />
            </div>
          </div>
          <div className="mt-4">
            <div>Incident Types</div>
            <div>
              <Select
                mode="multiple"
                allowClear
                defaultValue="lucy"
                style={{ width: 310 }}
                // onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
          </div>
        </>
      ) : null}
      {!showModal ? (
        <>
          {" "}
          <div className="my-4">
            <Button type="primary" onClick={() => useModal("create")}>
              Create New Incident
            </Button>
          </div>
          <div className="mb-2">Favorites</div>
          <div style={{ height: "20%", overflow: "scroll" }} className="">
            <List
              itemLayout="horizontal"
              dataSource={[]}
              renderItem={(item) => (
                <List.Item
                  onClick={() => {
                    setIncidentName(item.incidentname);
                    useModal("room");
                    fetchRoom(item.incidentid);
                  }}
                  className="cursor-pointer hover:bg-blue-100"
                >
                  <List.Item.Meta
                    title={<div>{item.incidentname}</div>}
                  />
                </List.Item>
              )}
            />
          </div>
          <hr />
          <div className="mt-8">All Incidents</div>
          <div style={{ height: "80%", overflow: "scroll" }} className="pb-64">
            <List
              itemLayout="horizontal"
              dataSource={incidents}
              renderItem={(item) => (
                <List.Item
                  onClick={() => {
                    setIncidentName(item.incidentname);
                    useModal("room");
                    fetchRoom(item.incidentid, item.incidentname);
                  }}
                  className="cursor-pointer hover:bg-blue-100"
                >
                  <List.Item.Meta
                    title={<div className="text-xs">{item.incidentname}</div>}
                  />
                </List.Item>
              )}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, { fetchIncidentTree, fetchRoom, fetchRoomFeatures })(
  Incidents
);
