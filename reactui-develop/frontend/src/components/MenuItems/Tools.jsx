import { Checkbox } from 'antd';
import React from 'react';

const Tools = () => {
    return (
        <>
        <div className="mb-4">
          <Checkbox defaultChecked>Bing Roads</Checkbox>
        </div>
        <div className="mb-4">
          <Checkbox>Open Street Map</Checkbox>
        </div>

        <div className="mb-4">
          <Checkbox>Bing Aerial</Checkbox>
        </div>

        <div className="mb-4">
          <Checkbox>US Topo - 7.5 min quadrangle maps</Checkbox>
        </div>
        <div className="mb-4">
          <Checkbox defaultChecked>Bing Aerial with labels</Checkbox>
        </div>

        <div className="mb-4">
          <Checkbox>FAA - Sectional Aeronautical Charts</Checkbox>
        </div>
      </>
    )
}

export default Tools;