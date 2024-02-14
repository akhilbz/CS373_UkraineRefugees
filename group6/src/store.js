import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  refTestimonials: [],
  newsMedia: [],
  supportGroups: [],
};

const rootReducer = (state = initialState, action) => {
  // Handle different actions here
  switch (action.type) {
    case 'SET_REF_TESTIMONIALS':
      return { ...state, refTestimonials: [...action.payload] };
    case 'SET_NEWS_MEDIA':
      return { ...state, newsMedia: [...action.payload] };
    case 'SET_SUPPORT_GROUPS':
      return { ...state, supportGroups: [...action.payload] };
    default:
      return state;
  }
};


const store = configureStore({
    reducer: rootReducer,
  });

export default store;
