import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Items = () => {
    // itemsEndpoint is the endpoint for the items data
    const itemsEndpoint = 'items';  // Replace with your actual endpoint
    const itemsName = 'Items and Services';  // Replace with your actual endpoint

    // State to hold the fetched items
    // Set up the initial state with an empty array
    // useEffect hook to fetch the items data when the component mounts
    // Map through the items array to render each item as a list item
    // Use the item's id as the key for each list item to ensure uniqueness and efficient updates to the list items when new data arrives

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`https://api.example.com/${itemsEndpoint}`);
            setItems(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>{itemsName}</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Value: {item.value}</p>
                        <p>Unit: {item.unit}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Items;
