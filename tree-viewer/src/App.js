import React, { useEffect } from "react";
import "./App.css";
import TreeViewer from "./Components/TreeViewer";
import PopUpButton from "./Components/PopUpButton";
import { useTree } from "./Components/TreeContext";

const App = () => {
  const { dispatch } = useTree();

  // Fetch data from the server and set it in the context
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        dispatch({ type: "SET_TREE_DATA", payload: jsonData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <TreeViewer />
      <PopUpButton />
    </div>
  );
};

export default App;
