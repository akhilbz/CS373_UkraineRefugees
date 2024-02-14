// action types
export const SET_REF_TESTIMONIALS = 'SET_REF_TESTIMONIALS';
export const SET_NEWS_MEDIA = 'SET_NEWS_MEDIA';
export const SET_SUPPORT_GROUPS = 'SET_SUPPORT_GROUPS';

// action creators
export const setRefTestimonials = (testimonials) => ({
    type: SET_REF_TESTIMONIALS,
    payload: testimonials
});

export const setNewsMedia = (media) => ({
    type: SET_NEWS_MEDIA,
    payload: media
});

export const setSupportGroups = (groups) => ({
    type: SET_SUPPORT_GROUPS,
    payload: groups
});