import { UPDATE_PLANTS, ADD_NEWPLANT, REMOVE_STATEPLANT } from './actions';

const initialState = {
  stateplants: [], // Initial value for stateplants is an empty array
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEWPLANT: {
      const newplant = { ...action.payload };

      return {
        ...state,
        stateplants: [...state.stateplants, newplant],
      };
    }
    case REMOVE_STATEPLANT: {
      return {
        ...state,
        stateplants: state.stateplants.filter((plant) => plant._id !== action.payload),
      };
    }
    case UPDATE_PLANTS:
      return {
        ...state,
        stateplants: [...action.stateplants],
      };
    default:
      return state;
  }
};
