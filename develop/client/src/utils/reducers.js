import { UPDATE_PLANTS } from './actions';

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
    
    case UPDATE_PLANTS:
      return {
        ...state,
        plants: [...action.plants],
      };
    default:
      return state;
  }
};
