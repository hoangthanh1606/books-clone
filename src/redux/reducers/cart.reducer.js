const initialState = {
  cartList: {
    data: [],
    load: false,
    error: "",
  },
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_INFO_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data.carts,
          load: false,
        },
      };
    }
    case "ADD_TO_CART_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data,
          load: false,
        },
      };
    }
    case "DELETE_ITEM_CART_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data,
          load: false,
        },
      };
    }
    case "ADD_TO_ORDER_SUCCESS": {
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: [],
          load: false,
        },
      };
    }
    default: {
      return state;
    }
  }
}
