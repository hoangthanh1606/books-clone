const initialState = {
  orderList: {
    data: [],
    load: false,
    error: '',
  },
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_ORDER_REQUEST': {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true
        },
      };
    }
    case 'ADD_TO_ORDER_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data: data,
          load: false
        },
      };
    }
    case 'ADD_TO_ORDER_FAIL': {
      return {
        ...state,
        orderList: {
          ...state.orderList.data,
          load: false
        },
      };
    }
    default: {
      return state;
    }
  }
}