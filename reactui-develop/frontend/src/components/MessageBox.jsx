import { Collapse, Divider, Input } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";

const { Panel } = Collapse;

const MessageBox = ({ closeMessageBox, reducer }) => {
  const [showParticipants, useParticipants] = useState(false);

  return (
    <div className="w-64 h-96 p-2 rounded shadow"  style={{ background: "rgba(0,60,136,.5)"}}>
      <div className="flex justify-between items-center">
        <div className="text-white">{showParticipants ? "Participants" : "Messages"}</div>
        <div className="flex items-center">
          {showParticipants ? (
            <div
              className="mr-4 cursor-pointer"
              onClick={() => useParticipants(false)}
            >
              <img
                src="https://image.flaticon.com/icons/png/512/3721/3721843.png"
                width={20}
              />
            </div>
          ) : (
            <div
              className="mr-4 cursor-pointer"
              onClick={() => useParticipants(true)}
            >
              <img
                src="https://image.flaticon.com/icons/png/512/681/681494.png"
                width={20}
              />
            </div>
          )}

          <div onClick={closeMessageBox} className="cursor-pointer">
            <img
              src="https://image.flaticon.com/icons/png/512/32/32325.png"
              width={16}
            />
          </div>
        </div>
      </div>
      <Divider style={{ margin: "8px 0px" }} />
      {!showParticipants ? (
        <div className="absolute bottom-2 w-60 bg-white">
          <Input placeholder="Enter the message" />
        </div>
      ) : null}

      {showParticipants ? (
        <div>
          <div className="bg-gray-100 p-1 pl-4 rounded">Sachin V</div>
          <div className="mt-1 bg-gray-100 p-1 pl-4 rounded">Amaan M</div>
        </div>
      ) : null}
    </div>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, {})(MessageBox);
