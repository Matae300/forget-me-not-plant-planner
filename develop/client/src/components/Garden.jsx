import React from "react";
// Component imports
import Plant from "./Plant";

const Garden = ({ plants }) => {
    console.log('My plants:', plants);
    return (
        <>
            <h3>My Plants:</h3>
            {plants && plants.length > 0 ? (
                <div className="gardenStyle">
                    {plants.map((plant, index) => (
                        <Plant key={index} plant={plant} />
                    ))}
                </div>
            ) : (
                <p>No plants to display.</p>
            )}
        </>
    );
};

export default Garden;