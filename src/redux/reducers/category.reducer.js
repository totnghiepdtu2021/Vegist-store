import {
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  GET_SIDEBAR_FAIL,
  GET_SIDEBAR_SUCCESS,
} from '../constants';

const initialState = {
  categoryData: [],
  sidebarData: {},
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        categoryData: [...action.payload.categories],
      };
    }
    case GET_CATEGORY_FAIL: {
      return state;
    }
    case GET_SIDEBAR_SUCCESS: {
      return {
        ...state,
        sidebarData: { ...action.payload },
      };
    }
    case GET_SIDEBAR_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
