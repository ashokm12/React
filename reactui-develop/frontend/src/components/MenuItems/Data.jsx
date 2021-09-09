import { Checkbox, Collapse, Input, Button, Modal, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import {
  fetchArcgisent,
  fetchWfs,
  fetchWms,
  fetchArcgOnline,
  handleGeoTiffChange,
  handleGeoTiff,
  handleGeoRssChange,
  handleGeoRss,
  handleKmlChange,
  handleKml,
} from "../../actions";

const { Panel } = Collapse;
const { Option } = Select;

const obj = {
  wms: "WMS",
  wfs: "WFS",
  arcgOnline: "ArcGIS Online",
  arcgEnt: "ArcGIS Enterprise",
};

const Data = ({
  reducer,
  fetchWfs,
  fetchWms,
  fetchArcgisent,
  fetchArcgOnline,
  handleGeoRss,
  handleGeoRssChange,
  handleGeoTiffChange,
  handleGeoTiff,
  handleKmlChange,
  handleKml,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const {
    wfs,
    wms,
    arcgent,
    arcon,
    georss: { feedUrl, displayname, refreshrate } = {},
    geotiff: { filename, displayname: geoTiffDispayName, mosaic } = {},
    kml: {
      displayname: kmlDisplayName,
      refreshrate: kmlRefreshRate,
      fileURL,
    },
  } = reducer;
  useEffect(() => {
    fetchWfs();
    fetchWms();
    fetchArcgisent();
    fetchArcgOnline();
  }, []);
  return (
    <div className="mt-4">
      <Collapse>
        <Panel header="WFS">
          {wfs.datasources &&
            wfs.datasources.map((el, i) => (
              <div className="border rounded-lg p-4 my-4 text-xs" key={i}>
                <div className="flex justify-end text-xs text-green-500">
                  {el.active ? "Active" : "Inactive"}
                </div>
                <div key={i} className="mt-4 text-xs truncate">
                  Name:{" "}
                  <span className="ml-1 " title={el.displayname}>
                    {el.displayname}
                  </span>
                </div>
                <div
                  key={i}
                  className="mt-1 truncate text-xs"
                  contenteditable="true"
                >
                  URL: <input className="ml-1" value={el.internalurl} />
                </div>
                <div className="flex justify-end items-center mt-4">
                  <div className="ml-4">
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        setModalVisible(true);
                        setModalType("wfs");
                      }}
                    >
                      <div className="text-xs">Import</div>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="WMS">
          {wms.datasources &&
            wms.datasources.map((el, i) => (
              <div className="border rounded-lg p-4 my-4" key={i}>
                <div className="flex justify-end text-xs text-green-500">
                  {el.active ? "Active" : "Inactive"}
                </div>
                <div key={i} className="mt-4 text-xs truncate">
                  Name:{" "}
                  <span className="ml-1 " title={el.displayname}>
                    {el.displayname}
                  </span>
                </div>
                <div
                  key={i}
                  className="mt-1 truncate text-xs"
                  contenteditable="true"
                >
                  URL: <input className="ml-1" value={el.internalurl} />
                </div>
                <div className="flex justify-end items-center mt-4">
                  <div className="ml-4">
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        setModalVisible(true);
                        setModalType("wms");
                      }}
                    >
                      <div className="text-xs">Import</div>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="ArcGIS Enterprise">
          {arcgent.datasources &&
            arcgent.datasources.map((el, i) => (
              <div className="border rounded-lg p-4 my-4" key={i}>
                <div className="flex justify-end text-xs text-green-500">
                  {el.active ? "Active" : "Inactive"}
                </div>
                <div key={i} className="mt-4 text-xs truncate">
                  Name:{" "}
                  <span className="ml-1 " title={el.displayname}>
                    {el.displayname}
                  </span>
                </div>
                <div
                  key={i}
                  className="mt-1 truncate text-xs"
                  contenteditable="true"
                >
                  URL: <input className="ml-1" value={el.internalurl} />
                </div>
                <div className="flex justify-end items-center mt-4">
                  <div className="ml-4">
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        setModalVisible(true);
                        setModalType("wms");
                      }}
                    >
                      <div className="text-xs">Import</div>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="ArcGIS Online">
          {arcon.datasources &&
            arcon.datasources.map((el, i) => (
              <div className="border rounded-lg p-4 my-4" key={i}>
                <div className="flex justify-end text-xs text-green-500">
                  {el.active ? "Active" : "Inactive"}
                </div>
                <div key={i} className="mt-4 text-xs truncate">
                  Name:{" "}
                  <span className="ml-1 " title={el.displayname}>
                    {el.displayname}
                  </span>
                </div>
                <div
                  key={i}
                  className="mt-1 truncate text-xs"
                  contenteditable="true"
                >
                  URL: <input className="ml-1" value={el.internalurl} />
                </div>
                <div className="flex justify-end items-center mt-4">
                  <div className="ml-4">
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        setModalVisible(true);
                        setModalType("wms");
                      }}
                    >
                      <div className="text-xs">Import</div>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="KMZ">
          <div className="text-xs">
            <div>
              <div>Choose a KMZ File</div>
              <Upload style={{ width: "100%" }}>
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  <span className="text-xs">Upload</span>
                </Button>
              </Upload>
            </div>
            <div className="mt-4">
              <div>If File is remote, Enter URL</div>
              <Input />
            </div>
            <div className="mt-4">
              <div>Create Display Name in NICS</div>
              <Input />
            </div>
            <div className="mt-4">
              <div>Refresh Rate</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                  <Option value="0:00">0.00</Option>
                  <Option value="0:30">0.30</Option>
                  <Option value="1:00">1.00</Option>
                  <Option value="1:30">1.30</Option>
                  <Option value="3:00">3.00</Option>
                  <Option value="5:00">5.00</Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <div>Restrict to organization</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <div>Restrict to Room</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Button type="primary" className="w-full">
                Upload
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="KML">
          <div className="text-xs">
            <div>
              <div>Choose a KML File</div>
              <input type="file" accept=".kml" onChange={(e) => handleKmlChange({ fileName: e.target.files[0]})} />
            </div>
            <div className="mt-4">
              <div>If File is remote, Enter URL</div>
              <Input onChange={(e) => handleKmlChange({ fileURL: e.target.value})} value={fileURL} />
            </div>
            <div className="mt-4">
              <div>Create Display Name in NICS</div>
              <Input onChange={(e) => handleKmlChange({ displayname: e.target.value})} value={kmlDisplayName} />
            </div>
            <div className="mt-4">
              <div>Refresh Rate</div>
              <div>
                <Select
                  value={kmlRefreshRate}
                  style={{ width: "100%" }}
                  onChange={(val) => handleKmlChange({ refreshrate: val})}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                  <Option value="0">0.00</Option>
                  <Option value="30">0.30</Option>
                  <Option value="60">1.00</Option>
                  <Option value="90">1.30</Option>
                  <Option value="180">3.00</Option>
                  <Option value="300">5.00</Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <div>Restrict to organization</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <div>Restrict to Room</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Button type="primary" className="w-full" onClick={() => handleKml()}>
                Upload
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="GPX">
          <div className="text-xs">
            <div>
              <div>Choose a GPX File</div>
              <Upload style={{ width: "100%" }}>
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  <span className="text-xs">Upload</span>
                </Button>
              </Upload>
            </div>
            <div className="mt-4">
              <div>If File is remote, Enter URL</div>
              <Input />
            </div>
            <div className="mt-4">
              <div>Create Display Name in NICS</div>
              <Input />
            </div>
            <div className="mt-4">
              <div>Refresh Rate</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                  <Option value="0:00">0.00</Option>
                  <Option value="0:30">0.30</Option>
                  <Option value="1:00">1.00</Option>
                  <Option value="1:30">1.30</Option>
                  <Option value="3:00">3.00</Option>
                  <Option value="5:00">5.00</Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <div>Restrict to organization</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <div>Restrict to Room</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Button type="primary" className="w-full">
                Upload
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="GeoJson">
          <div className="text-xs">
            <div>
              <div>Choose a GeoJson File</div>
              <Upload style={{ width: "100%" }}>
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  <span className="text-xs">Upload</span>
                </Button>
              </Upload>
            </div>
            <div className="mt-4">
              <div>If File is remote, Enter URL</div>
              <Input />
            </div>
            <div className="mt-4">
              <div>Create Display Name in NICS</div>
              <Input />
            </div>
            <div className="mt-4">
              <div>Refresh Rate</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                  <Option value="0:00">0.00</Option>
                  <Option value="0:30">0.30</Option>
                  <Option value="1:00">1.00</Option>
                  <Option value="1:30">1.30</Option>
                  <Option value="3:00">3.00</Option>
                  <Option value="5:00">5.00</Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <div>Restrict to organization</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <div>Restrict to Room</div>
              <div>
                <Select
                  value=""
                  style={{ width: "100%" }}
                  onChange={() => console.log("oop")}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Button type="primary" className="w-full">
                Upload
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="Shape File">
          <div className="text-xs">
            <div>
              <div>Choose a shape file to load as data layer</div>
              <Upload style={{ width: "100%" }}>
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  <span className="text-xs">Upload</span>
                </Button>
              </Upload>
            </div>
            <div className="mt-4">
              <div>Choose a shx file</div>
              <Upload style={{ width: "100%" }}>
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  <span className="text-xs">Upload</span>
                </Button>
              </Upload>
            </div>
            <div className="mt-4">
              <div>Choose a dbf file</div>
              <Upload style={{ width: "100%" }}>
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  <span className="text-xs">Upload</span>
                </Button>
              </Upload>
            </div>
            <div className="mt-4">
              <div>Choose a prj file</div>
              <Upload style={{ width: "100%" }}>
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  <span className="text-xs">Upload</span>
                </Button>
              </Upload>
            </div>
            <div className="mt-4">
              <div>Choose a sld file</div>
              <Upload style={{ width: "100%" }}>
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  <span className="text-xs">Upload</span>
                </Button>
              </Upload>
            </div>
            <div className="mt-4">
              <div>Display Name</div>
              <Input />
            </div>
            <div className="mt-4">
              <Button type="primary" className="w-full">
                Upload
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="Image">
          <div>
            <div>
              <div>Display Name</div>
              <Input />
            </div>
            <div className="mt-4">
              <div>Choose images to upload</div>
              <Upload style={{ width: "100%" }}>
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  <span className="text-xs">Upload</span>
                </Button>
              </Upload>
            </div>
            <div className="mt-4">
              <Button type="primary" className="w-full">
                Upload
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
      {/* <Collapse>
        <Panel header="Breadcrumb">hi</Panel>
      </Collapse> */}
      <Collapse>
        <Panel header="GeoTIFF">
          <div className="text-xs">
            <div>
              <div>Choose a geotiff or zip file to load as data layer</div>
              <input
                type="file"
                accept=".zip,.geotiff,.tiff,.tif"
                onChange={(e) =>{
                  console.log(e)
                  handleGeoTiffChange({ tifFile: e.target.files[0] })}
                }
              />
            </div>
            <div className="mt-4">
              <div>Absolute Path and filename of file on mapserver</div>
              <Input
                value={filename}
                onChange={(e) =>
                  handleGeoTiffChange({ filename: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <div>Display Name</div>
              <Input
                value={geoTiffDispayName}
                onChange={(e) =>
                  handleGeoTiffChange({ displayname: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <Checkbox
                checked={mosaic === "on"}
                onChange={(e) => {
                  handleGeoTiffChange({
                    mosaic: e.target.checked ? "on" : "off",
                  });
                }}
              >
                <span className="text-xs">
                  Is this a zip containing images?
                </span>
              </Checkbox>
            </div>
            <div className="mt-4">
              <Button type="primary" className="w-full" onClick={() => handleGeoTiff()}>
                Upload
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="GeoRSS">
          <div>
            <div>
              <div>GeoRSS URL</div>
              <Input
                value={feedUrl}
                onChange={(e) => {
                  handleGeoRssChange({ feedUrl: e.target.value });
                }}
              />
            </div>
            <div className="mt-4">
              <div>Display Name</div>
              <Input
                value={displayname}
                onChange={(e) => {
                  handleGeoRssChange({ displayname: e.target.value });
                }}
              />
            </div>
            <div className="mt-4">
              <div>Refresh Rate</div>
              <div>
                <Select
                  value={refreshrate}
                  style={{ width: "100%" }}
                  onChange={(val) => {
                    handleGeoRssChange({ refreshrate: val });
                  }}
                >
                  <Option value="" disabled>
                    Select
                  </Option>
                  <Option value="0">0.00</Option>
                  <Option value="30">0.30</Option>
                  <Option value="60">1.00</Option>
                  <Option value="90">1.30</Option>
                  <Option value="180">3.00</Option>
                  <Option value="300">5.00</Option>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Button
                type="primary"
                className="w-full"
                onClick={() => {
                  handleGeoRss();
                }}
              >
                Upload
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
      <Modal
        title={`${obj[modalType]} Data Sources`}
        visible={isModalVisible}
        onOk={() => setModalVisible(true)}
        okText="Import"
        onCancel={() => setModalVisible(false)}
      >
        <div>
          <div className="flex items-center">
            <div>Layer to Import</div>
            <div className="ml-2">
              <Select
                value=""
                style={{ width: 120 }}
                onChange={() => console.log("oop")}
              >
                <Option value="" disabled>
                  Select
                </Option>
              </Select>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div>Display Name</div>
            <div className="ml-2">
              <Input />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div>Legend</div>
            <div className="ml-2">
              <Input />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div>Refresh Rate</div>
            <div className="ml-2">
              <Select
                value=""
                style={{ width: 120 }}
                onChange={() => console.log("oop")}
              >
                <Option value="" disabled>
                  Select
                </Option>
                <Option value="0">0.00</Option>
                <Option value="30">0.30</Option>
                <Option value="60">1.00</Option>
                <Option value="90">1.30</Option>
                <Option value="180">3.00</Option>
                <Option value="300">5.00</Option>
              </Select>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div>Restrict to organization</div>
            <div className="ml-2">
              <Select
                value=""
                style={{ width: 120 }}
                onChange={() => console.log("oop")}
              >
                <Option value="" disabled>
                  Select
                </Option>
              </Select>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div>Restrict to Room</div>
            <div className="ml-2">
              <Select
                value=""
                style={{ width: 120 }}
                onChange={() => console.log("oop")}
              >
                <Option value="" disabled>
                  Select
                </Option>
              </Select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, {
  fetchWfs,
  fetchWms,
  fetchArcgisent,
  fetchArcgOnline,
  handleGeoRss,
  handleGeoTiffChange,
  handleGeoTiff,
  handleGeoRssChange,
  handleKml,
  handleKmlChange
})(Data);
