import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_PLANT } from '../utils/queries';

import plantTag from '../assets/images/plant-tag.png';
import miscPlant from '../assets/images/miscPlant.png';
import stateless from '../assets/images/stateless.png';

const Plant = (props) => {
    console.log(props);
    const { loading, error, data } = useQuery(QUERY_PLANT, {
        variables: { id: props.plant._id }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const plant = data?.plant;
console.log(plant);
    return (
        <div className="plant">
            {plant ? (
            <>
                <Link to={`/plants/${plant._id}`}>

                    <div className="plantContainerStyle">
                        {/* Replace the test plant with a dynamic plant name */}
                        <h2 className='plantTagTextStyle'>{plant.name}</h2>
                        {/* <h2 className='plantTagTextStyle'>Testing PlantName Here</h2> */}
                        <div className="plantTagPhotoStyle">
                            {/* Replace the generic plant image with a dynamic plant photo image */}
                            <img src={plant.photoUrl} alt={plant.name} />
                            {/* <img src= { miscPlant } alt="miscellaneous plant" /> */}
                        </div>
                        <div className="plantTagStateStyle">
                             {/* !!!!!! Replace the static stateless image with a dynamic state image */}
                            <img src= { stateless } alt="stateless" />
                        </div>
                        <div className="plantTagStyle">
                            <img src= { plantTag } alt="plant tag" />
                        </div>
                    </div>
                
                </Link>
            </>
            ) : (
                <p>No plant found with this ID.</p>
            )}
        </div>
    );
};

export default Plant;
