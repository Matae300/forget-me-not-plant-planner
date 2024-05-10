import React from "react";
import Plant from "../Plant";

const Garden = ({ plants }) => {
    return (
        <div>
            <div className="gardenStyle">
                {plants.map((plant) => (
                    <Plant key={plant._id} plant={plant} />
                ))}
            </div>
        </div>
    );
}