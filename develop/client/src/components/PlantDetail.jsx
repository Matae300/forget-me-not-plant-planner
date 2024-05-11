import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from '@apollo/client';

const PlantDetail = ({ plantId }) => {
  const { loading, error, data } = useQuery(QUERY_SINGLE_PLANT, {
variables : { id: plantId }
  });

  if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const plant = data?.plant;

    return (
      <>
        <div>
          <h2>{ plant.name }</h2>
          <img src={plant.photoUrl} alt={`Image of ${plant.name}`}  />
          <p>
          {plant.description}<br/>
                Sun Exposure: {plant.sunExposure}<br/>
                Growing Months: {plant.growingMonths}<br/>
                Blooming Months: {plant.bloomingMonths}<br/>
                Watering Instructions: {plant.wateringTask.instructions}<br/>
                Watering Frequency: {plant.wateringTask.frequencyCount} time(s) a {plant.wateringTask.frequencyUnit} every {plant.wateringTask.frequencyInterval} day(s)
          </p>                 
        </div>
        </>);}

export default PlantDetail;