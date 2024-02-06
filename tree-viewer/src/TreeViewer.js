import React, { useEffect, useState } from 'react';

const Node = ({ id, name }) => (
    <div>{`${name}`}</div>
);

const TreeViewer = () => {
    const [nodes, setNodes] = useState([]); // Initialize nodes state to an empty array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();
                setNodes(data || []);   // Set nodes to data or an empty array if data is falsy
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const renderNodes = (data, parentId = 0) => {
        const filteredNodes = data.filter((node) => node.parentId === parentId);    // Filter nodes with matching parentId

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
            {renderNodes(nodes)}
        </div>
    );
};

export default TreeViewer;