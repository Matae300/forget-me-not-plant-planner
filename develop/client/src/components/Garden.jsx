import React from "react";

const Garden = ({ plants}) => {
    return (
        <div>
            <div>
                {plants.map((plant) => (
                    <div key={plant._id}>
                        <h2>{plant.name}</h2>
                        <img src={plant.photoUrl} alt={plant.name} />
                    </div>
                ))}
            </div>
        </div>
    );
    )