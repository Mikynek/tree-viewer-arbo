import React from "react";
import Node from "./Node";
import { useTree } from "./TreeContext";

const TreeViewer = () => {
  const { treeData } = useTree();

  const renderNodes = (data, parentId = 0) => {
    // Filter nodes with matching parentId
    const filteredNodes = data.filter((node) => node.parentId === parentId);

    if (filteredNodes.length === 0) {
      return null;
    }

    return (
      <ul>
        {filteredNodes.map((nodeData) => (
          <li key={nodeData.id}>
            <Node id={nodeData.id} name={nodeData.name} />
            {renderNodes(data, nodeData.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Tree Viewer</h1>
      {renderNodes(treeData)}
    </div>
  );
};

export default TreeViewer;
