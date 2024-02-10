import React, { useEffect, useState } from "react";
import { useTree } from "./TreeContext";

const PopUpForm = ({ onClose }) => {
  const { treeData, dispatch } = useTree();
  const [data, setData] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState("-");
  const [selectedNode, setSelectedNode] = useState({
    id: "",
    name: "",
    parentId: "",
  });

  useEffect(() => {
    setData(treeData);
  }, [treeData]);

  const handleNodeChange = (e) => {
    const nodeId = e.target.value;
    const node = data.find((item) => item.id === parseInt(nodeId)) || {
      id: "",
      name: "",
      parentId: "",
    };

    setSelectedNodeId(nodeId);
    setSelectedNode({
      ...node,
      parentId: node.parentId !== "" ? parseInt(node.parentId) : "",
    });
  };

  const updateNodeInData = (updatedNode) => {
    const updatedData = data.map((item) =>
      item.id === updatedNode.id ? updatedNode : item
    );
    setData(updatedData);
    dispatch({ type: "SET_TREE_DATA", payload: updatedData });
  };

  const handleAddOrUpdate = async () => {
    const parentId =
      selectedNode.parentId !== "" ? parseInt(selectedNode.parentId) : 0;

    // Validate the parent ID
    const isParentIdValid =
      parentId >= 0 && data.some((item) => item.id === parentId);

    if (isParentIdValid) {
      const updatedNode = {
        ...selectedNode,
        id:
          selectedNodeId !== "-"
            ? parseInt(selectedNodeId)
            : generateUniqueId(),
        parentId: parentId,
      };

      if (selectedNodeId === "-") {
        // Add new node
        const updatedTreeData = [...treeData, updatedNode];
        dispatch({ type: "SET_TREE_DATA", payload: updatedTreeData });
      } else {
        // Update existing node
        updateNodeInData(updatedNode);
      }

      resetSelectedNode();
    } else {
      alert("Parent ID must be a positive number and must exist in the tree");
    }
  };

  const handleDelete = async () => {
    const deletedNodeIds = [parseInt(selectedNodeId)];
    collectChildNodeIds(deletedNodeIds, parseInt(selectedNodeId));

    const filteredData = data.filter(
      (item) => !deletedNodeIds.includes(item.id)
    );

    setData(filteredData);
    dispatch({ type: "SET_TREE_DATA", payload: filteredData });
    resetSelectedNode();
  };

  const collectChildNodeIds = (result, parentId) => {
    const children = data.filter((item) => item.parentId === parentId);
    for (const child of children) {
      result.push(child.id);
      collectChildNodeIds(result, child.id);
    }
  };

  // Reset the selected node to its initial state [-]
  const resetSelectedNode = () => {
    setSelectedNode({ id: "", name: "", parentId: "" });
    setSelectedNodeId("-");
  };

  const generateUniqueId = () =>
    Math.max(...data.map((item) => item.id), 0) + 1; // Find the maximum ID and add 1

  return (
    <>
      <div className="modal"></div>
      <div className="PopUp">
        <form>
          <label htmlFor="nodes">Choose a node:</label>
          <select
            id="nodes"
            name="node"
            value={selectedNodeId}
            onChange={handleNodeChange}
          >
            <option value="-">-</option>
            {data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={selectedNode.name}
            onChange={(e) =>
              setSelectedNode({ ...selectedNode, name: e.target.value })
            }
          />
          <label htmlFor="parentId">Parent ID:</label>
          <input
            type="number"
            id="parentId"
            name="parentId"
            value={selectedNode.parentId}
            onChange={(e) =>
              setSelectedNode({ ...selectedNode, parentId: e.target.value })
            }
          />
        </form>
        <div className="controlButtons" style={{ gap: "0.5rem" }}>
          <button
            className="addButton"
            onClick={handleAddOrUpdate}
            disabled={selectedNodeId !== "-"}
          >
            Add New
          </button>
          <button
            className="updateButton"
            onClick={handleAddOrUpdate}
            disabled={selectedNodeId === "-"}
          >
            Update
          </button>
          <button
            className="deleteButton"
            onClick={handleDelete}
            disabled={selectedNodeId === "-"}
          >
            Delete
          </button>
        </div>
        <button className="closeButton controlButtons" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default PopUpForm;
