import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  refTestimonials: [],
};

const rootReducer = (state = initialState, action) => {
  // Handle different actions here
  switch (action.type) {
    case 'SET_REF_TESTIMONIALS':
      return { ...state, refTestimonials: [...action.payload] };
    default:
      return state;
  }
};


const store = configureStore({
    reducer: rootReducer,
  });

export default store;
