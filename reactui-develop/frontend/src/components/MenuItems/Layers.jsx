import { Tree, Select, Input } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchData,
  fetchFire,
  fetchTracking,
  fetchWeather,
  handleLayerCheck,
  updateLayer,
  handleRightClick,
} from "../../actions";

const { TreeNode } = Tree;
const { Search } = Input;
const { Option } = Select;

class Layers extends Component {
  state = {
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true,
    visible: false,
    selectedValue: "off",
  };

  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  gData = [];

  onDragEnter = (info) => {};

  onDrop = (info) => {
    const { layers } = this.props.reducer;
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...layers];

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.props.updateLayer(data);
  };

  componentDidMount() {
    const { apiCalls } = this.props.reducer;
    if (apiCalls) {
      this.props.fetchFire();
      this.props.fetchWeather();
      this.props.fetchTracking();
      this.props.fetchData();
    }
  }

  renderTree = (data) => {
    const { searchValue } = this.state;
    const { featureLayers } = this.props.reducer;
    const loop = (item) => {
      const index = item.indexOf(searchValue);
      const beforeStr = item.substr(0, index);
      const afterStr = item.substr(index + searchValue.length);
      const title = item;
      // index > -1 ? (
      //   <span>
      //     {beforeStr}
      //     <span style={{ color: "red" }}>{searchValue}</span>
      //     {afterStr}
      //   </span>
      // ) : (
      //   <span>{item}</span>
      // );
      if (item) {
        return title;
      }
    };
    return data.map((item, i) => {
      if (!item.link) {
        return (
          <TreeNode
            title={loop(item.title)}
            key={item.key}
            dataRef={item}
            checkable={false}
          >
            {item.children && item.children.length
              ? this.renderTree(item.children)
              : null}
          </TreeNode>
        );
      }
      var checked = false;
      if (featureLayers.length) {
        const arr = featureLayers.filter((el) => el.key === item.key);
        if (arr.length) {
          checked = arr[0].checked;
        }
      }
      return (
        <TreeNode
          checkable
          title={
            <div
              className="truncate"
              style={{ width: "120px" }}
              title={item.title}
            >
              {loop(item.title)}
            </div>
          }
          key={item.key}
          dataRef={item}
        ></TreeNode>
      );
    });
  };
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = (e) => {
    const { layers, featureLayers, mapLayer } = this.props.reducer;
    const { value } = e.target;
    const expandedKeys = featureLayers
      .map((item) => {
        if (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return this.getParentKey(item.key, layers);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      // expandedKeys,
      searchValue: value,
      // autoExpandParent: true,
    });
  };

  render() {
    const { layers, mapLayer, featureLayers } = this.props.reducer;
    const { searchValue, expandedKeys, autoExpandParent, selectedValue } =
      this.state;
    return (
      <>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-bg-gray-800 font-semibold">Sort:</div>
          <div className="">
            <Select
              defaultValue={selectedValue}
              style={{ width: 200 }}
              onChange={(value) => {
                this.setState({
                  selectedValue: value,
                });
              }}
            >
              <Option value="off">Off</Option>
              <Option value="ascending">Ascending (A-Z)</Option>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Search
            style={{ marginBottom: 8 }}
            placeholder="Search"
            onChange={this.onChange}
          />
        </div>
        <div className="py-2">
          <Tree
            className="draggable-tree py-4"
            draggable
            checkable
            blockNode
            onRightClick={(e) => {
              if (!this.state.visible) {
                var that = this;
                document.addEventListener("click", function onClickOutside() {
                  that.setState({ visible: false });
                  that.props.handleRightClick({
                    pageX: "",
                    pageY: "",
                    key: "",
                    opacity: 1,
                  });
                  document.removeEventListener("click", onClickOutside);
                });
              }
              this.setState({ visible: true });
              this.props.handleRightClick({
                pageX: e.event.pageX,
                pageY: e.event.pageY,
                key: e.node.key,
                opacity: e.node.opacity,
              });
            }}
            onCheck={(c, i) => {
              console.log(c, i);
              this.props.handleLayerCheck(i.node.key, i.checked, "checked");
            }}
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
          >
            {this.renderTree(
              searchValue || selectedValue !== 'off'
                ? featureLayers.filter((e) =>
                    e.title.toLowerCase().includes(searchValue.toLowerCase())
                  ).sort(function(a, b){
                    if(a.title < b.title) { return -1; }
                    if(a.title > b.title) { return 1; }
                    return 0;
                })
                : layers
            )}
          </Tree>
        </div>
      </>
    );
  }
}

const mapStatetoProps = ({ reducer }) => ({ reducer });

export default connect(mapStatetoProps, {
  updateLayer,
  fetchFire,
  fetchWeather,
  fetchTracking,
  fetchData,
  handleLayerCheck,
  handleRightClick,
})(Layers);
