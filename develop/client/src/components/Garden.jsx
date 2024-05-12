import React from "react";
// Component imports
import Plant from "./Plant";

const Garden = ({data}) => {
    console.log('Props', data);


    return (
        <>
            <h3>My Plants:</h3>
            {/* {data.plants && data.plants.length > 0 ? (
                <div className="gardenStyle">
                    {data.plants.map((plant, index) => (
                        <Plant key={index} plant={plant} />
                    ))}
                </div>
            ) : (
                <p>No plants to display.</p>
            )} */}
        </>
    );
};

export default Garden;