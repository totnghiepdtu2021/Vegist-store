import {
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAIL,
  CREATE_DISCOUNT_FAIL,
  CREATE_DISCOUNT_SUCCESS,
  GET_DISCOUNT_USER_FAIL,
  GET_DISCOUNT_USER_SUCCESS,
  GET_ALL_DISCOUNT_USER_FAIL,
  GET_ALL_DISCOUNT_USER_SUCCESS,
  DELETE_DISCOUNT_FAIL,
  DELETE_DISCOUNT_SUCCESS,
  ADD_DISCOUNT_USER_FAIL,
  ADD_DISCOUNT_USER_SUCCESS,
} from '../constants';

const initialState = {
  discountData: [],
  totalDiscount: 0,
  discountAllData: [],
  totalDiscountAll: 0,
  discountUserData: [],
  totalDiscountUser: 0,
  addDiscount: {},
};

export default function discountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DISCOUNT_SUCCESS: {
      return {
        ...state,
        discountData: [...action.payload.discountCodes],
        totalDiscount: action.payload.total,
      };
    }

    case GET_DISCOUNT_FAIL: {
      return state;
    }
    case GET_DISCOUNT_USER_SUCCESS: {
      return {
        ...state,
        discountUserData: [...action.payload.discountCodes],
        totalDiscountUser: action.payload.total,
      };
    }
    case GET_DISCOUNT_USER_FAIL: {
      return state;
    }
    case GET_ALL_DISCOUNT_USER_SUCCESS: {
      return {
        ...state,
        discountAllData: [...action.payload.discountCodes],
        totalDiscountAll: action.payload.total,
      };
    }
    case GET_ALL_DISCOUNT_USER_FAIL: {
      return state;
    }
    case CREATE_DISCOUNT_SUCCESS: {
      return {
        ...state,
        addDiscount: { ...action.payload },
      };
    }
    case CREATE_DISCOUNT_FAIL: {
      return state;
    }
    case DELETE_DISCOUNT_SUCCESS: {
      const data = state.discountData.filter((item) => item.id !== action.payload);
      return { ...state, discountData: [...data] };
    }
    case DELETE_DISCOUNT_FAIL: {
      return state;
    }
    case ADD_DISCOUNT_USER_SUCCESS: {
      const discountUser = JSON.parse(JSON.stringify(state.discountUserData));
      const { discountCodeId } = action.payload.discountCodeDetail;
      discountUser.push({ ...discountCodeId, id: discountCodeId._id });

      return { ...state, discountUserData: discountUser };
    }
    case ADD_DISCOUNT_USER_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
