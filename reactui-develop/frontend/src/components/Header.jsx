import React from "react";
import { connect } from "react-redux";

const Header = ({
  reducer: {
    showMenu,
    common: { incidentName },
  },
}) => {
  return (
    <div
      className="flex justify-between items-center p-4 font-semibold fixed top-0 left-0 right-0 z-30"
      style={{ background: "#d9e6f4" }}
    >
      <div>Situation Awareness & Collaboration Tool</div>
      <div>{incidentName}</div>
    </div>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, {})(Header);
