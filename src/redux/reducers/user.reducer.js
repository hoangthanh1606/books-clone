const initialState = {
  userInfo: {
    data: {},
    load: false,
    error: "",
  },
  orderList: {
    data: [],
    load: false,
    error: ''
  }
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_REQUEST": {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      };
    }
    case "LOGIN_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false,
        },
      };
    }
    case "LOGIN_FAIL": {
      const { error } = action.payload;
      console.log("userReducer -> action.payload", action.payload);
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        },
      };
    }

    case "REGISTER_REQUEST": {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      };
    }
    case "REGISTER_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          data: data,
        },
      };
    }
    case "REGISTER_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        },
      };
    }

    case "GET_USER_INFO_REQUEST": {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      };
    }

    case "GET_USER_INFO_SUCCESS": {
      const { data } = action.payload;
      // console.log("userReducer -> action.payload", action.payload)
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false,
        },
      };
    }

    case "GET_USER_INFO_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          error: error,
          load: false,
        },
      };
    }

    case "UPDATE_USER_REQUEST": {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true
        }
      }
    }
    case "UPDATE_USER_SUCCESS": {
      const { data } = action.payload
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false
        }
      }
    }
    case "UPDATE_USER_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          error: error,
          load: false
        }
      }
    }

    case "CHANGE_PASSWORD_REQUEST": {

      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true
        }
      }
    }

    case "CHANGE_PASSWORD_SUCCESS": {
      const { data } = action.payload
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false
        }
      }
    }
    case "CHANGE_PASSWORD_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          error: error,
          load: false
        }
      }
    }

    case "CHANGE_PASSWORD_ADMIN_SUCCESS": {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: {},
          load: false
        }
      }
    }

    case "ORDER_LIST_USER_REQUEST": {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true
        }
      }
    }
    case "ORDER_LIST_USER_SUCCESS": {
      const { data } = action.payload
      console.log("userReducer -> data", data)
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data: data,
          load: false
        }
      }
    }
    case "ORDER_LIST_USER_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        orderList: {
          ...state.orderList,
          error: error,
          load: false
        }
      }
    }

    default: {
      return state;
    }
  }
}
