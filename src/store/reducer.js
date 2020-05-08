import {ADD_REVIEW, DELETE_REVIEW, EDIT_REVIEW, SET_URL, UPDATE_REVIEW} from "./actions";

export const GLOBAL_STORAGE_KEY = 'GLOBAL_STORAGE_KEY';

const storageData = JSON.parse(window.localStorage.getItem(GLOBAL_STORAGE_KEY));
export let initialState = storageData || {
  reviews: [],
  editingReviewId: null,
};

export const reducer = (state, action) => {
  let reviews;

  switch (action.type) {
    case ADD_REVIEW:
      reviews = [
        ...state.reviews,
        action.payload,
      ];
      return {
        ...state,
        reviews,
        editingReviewId: null,
      };
    case EDIT_REVIEW:
      reviews = state.reviews.map((review) => {
        if (review.id === action.payload.id) {
          return action.payload;
        }

        return review;
      });

      return {
        ...state,
        reviews,
        editingReviewId: action.payload.id,
      };
    case UPDATE_REVIEW:
      reviews = state.reviews.map((review) => {
        if (review.id === action.payload.id) {
          return action.payload;
        }

        return review;
      });

      return {
        ...state,
        reviews,
        editingReviewId: null,
      };
    case DELETE_REVIEW:
      reviews = state.reviews.filter((review) => {
        return review.id !== action.payload;
      });

      return {
        ...state,
        reviews,
      };
    case SET_URL:
      const {userId, url} = action.payload;

      reviews = state.reviews.map((review) => {
        if (review.user.id === userId) {
          return {
            ...review,
            user: {
              ...review.user,
              url,
            },
          };
        }

        return review;
      });

      return {
        ...state,
        reviews,
      };
    default:
      return state;
  }
};
