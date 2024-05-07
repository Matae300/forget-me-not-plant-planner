import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PLANTS } from '../utils/queries';

import PlantList from '../components/PlantList';

function Plants() {
  const { loading, data } = useQuery(QUERY_PLANTS);

  const plants = data?.plants || []; 

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PlantList plants={plants} />
      )}
    </div>
  );
}

export default Plants;