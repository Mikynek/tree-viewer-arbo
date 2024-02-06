import React, { useEffect, useState } from 'react';

const Node = ({ id, name, level }) => (
    <div>
        <div style={{ marginLeft: `${level * 20}px` }}>{`-`.repeat(level)} {`Node ${id}: ${name}`}</div>
    </div>
);

const TreeViewer = () => {
    const [nodes, setNodes] = useState([]);  // Initialize nodes state to an empty array

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

    const renderNodes = (data, parentId = 0, level = 0) =>
        data
            .filter((node) => node.parentId === parentId)   // Filter nodes with matching parentId
            .map((nodeData) => (
                <div key={nodeData.id}>
                    <Node id={nodeData.id} name={nodeData.name} level={level} />
                    {renderNodes(data, nodeData.id, level + 1)}
                </div>
            ));

    return (
        <div>
            <h1>Tree Viewer</h1>
            {renderNodes(nodes)}
        </div>
    );
};

export default TreeViewer;