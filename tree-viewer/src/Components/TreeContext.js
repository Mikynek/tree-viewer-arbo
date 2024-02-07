import React, { createContext, useContext, useReducer } from "react";

const TreeContext = createContext();

const treeReducer = (state, action) => {
  switch (action.type) {
    case "SET_TREE_DATA":
      return action.payload;
    default:
      return state;
  }
};

const TreeProvider = ({ children }) => {
  const [treeData, dispatch] = useReducer(treeReducer, []);

  return (
    <TreeContext.Provider value={{ treeData, dispatch }}>
      {children}
    </TreeContext.Provider>
  );
};

const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
};

export { TreeProvider, useTree };
