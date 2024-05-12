import { UPDATE_PLANTS, ADD_NEWPLANT } from './actions';

const initialState = {
  plants: [], // Initial value for plants is an empty array
  // other properties of your state...
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEWPLANT: {
      const newplant = { ...action.payload };

      return {
        ...state,
        plants: [...state.plants, newplant],
      };
    }
    case UPDATE_PLANTS:
      return {
        ...state,
        plants: [...action.plants],
      };
    default:
      return state;
  }
};