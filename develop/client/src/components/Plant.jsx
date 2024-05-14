import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_PLANT } from '../utils/queries';
import { usePlantData } from '../utils/PlantDataContext';

import plantTag from '../assets/images/plant-tag.png';
import stateless from '../assets/images/stateless.png';

const Plant = (props) => {
    console.log(props);
    const { loading, error, data } = useQuery(QUERY_PLANT, {
        variables: { id: props.plant._id }
    });

    const { setSelectedPlant } = usePlantData();

    const handleClick = (plantData) => {
        console.log('plantData', plantData);
        setSelectedPlant(plantData);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const plant = data?.plant;
console.log('plant.jsx', plant);
    return (
        <div className="plantStyle">
            {plant ? (
            <>
                <button onClick={() => handleClick(plant)} style={{ all: 'unset', cursor: 'pointer' }}>

                    <div className='plantContainerStyle'>
                        <h2 className='plantTagTextStyle'>{plant.name}</h2>
                        <div className='plantTagPhotoStyle'>
                            <img src={plant.photoUrl} alt={plant.name} />
                            {/* <img src= { miscPlant } alt="miscellaneous plant" /> */}
                        </div>
                        <div className="plantTagStateStyle">
                             {/* !!!!!! Replace the static stateless image with a dynamic state image */}
                            <img src= { stateless } alt="stateless" className="" />
                        </div>
{/*                         <div className="plantTagStyle">
                            <img src= { plantTag } alt="plant tag" />
                        </div> */}
                    </div>
                
                </button>
            </>
            ) : (
                <p>No plant found with this ID.</p>
            )}
        </div>
    );
};

export default Plant;