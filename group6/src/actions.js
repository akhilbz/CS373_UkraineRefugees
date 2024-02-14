// action types
export const SET_REF_TESTIMONIALS = 'SET_REF_TESTIMONIALS';
export const SET_NEWS_MEDIA = 'SET_NEWS_MEDIA';

// action creators
export const setRefTestimonials = (testimonials) => ({
    type: SET_REF_TESTIMONIALS,
    payload: testimonials
});

export const setNewsMedia = (media) => ({
    type: SET_NEWS_MEDIA,
    payload: media
});