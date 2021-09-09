import { Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import { handlePropertyModalChange, handleResetProperties } from "../actions";

const PropertyModal = ({
  reducer: {
    propertyModal,
    properties: {
      created,
      createdBy,
      layerName,
      layerType,
      legend,
      refreshRate,
      secure,
      layer,
      dataSourceUrl,
      datalayerSourceId,
      dataLayerId,
      restriction,
    } = {},
  } = {},
  handlePropertyModalChange,
  handleResetProperties,
}) => {
  return (
    <>
      <Modal
        title="Properties"
        visible={propertyModal}
        onOk={() => handlePropertyModalChange(true)}
        okText="Ok"
        onCancel={() => {
          handleResetProperties();
          handlePropertyModalChange(false);
        }}
        footer={null}
      >
        <div>
          <div>Created: {created ? new Date(created).toGMTString() : ""}</div>
          <div>Created By: {createdBy}</div>
          <div>Layer Name: {layerName}</div>
          <div>Layer Type: {layerType}</div>
          <div>Legend: {legend}</div>
          <div>Refresh Rate: {refreshRate}</div>
          <div>Secure: {secure}</div>
          <div>Layer: {layer}</div>
          <div>Datasource URL: {dataSourceUrl}</div>
          <div>Datalayer Id: {dataLayerId}</div>
          <div>Datalayer Source Id: {datalayerSourceId}</div>
          <div>Organization Restricted: {restriction}</div>
        </div>
      </Modal>
    </>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, {
  handlePropertyModalChange,
  handleResetProperties,
})(PropertyModal);
