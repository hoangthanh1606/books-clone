const initialState = {
  orderListAdmin: {
    data: [],
    load: false,
    error: ''
  }
}

export default function orderAdminReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ORDER_LIST_ADMIN_REQUEST": {
      return {
        ...state,
        orderListAdmin: {
          ...state.orderListAdmin,
          load: true
        }
      }
    }
    case "GET_ORDER_LIST_ADMIN_SUCCESS": {
      const { data } = action.payload
      return {
        ...state,
        orderListAdmin: {
          ...state.orderListAdmin,
          data: data,
          load: false
        }
      }
    }
    case "GET_ORDER_LIST_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        orderListAdmin: {
          ...state.orderListAdmin,
          error: error,
          load: false
        }
      }
    }
    case "UPDATE_ORDER_ADMIN_REQUEST": {
      return {
        ...state,
        orderListAdmin: {
          ...state.orderListAdmin,
          load: true
        }
      }
    }
    case "UPDATE_ORDER_ADMIN_SUCCESS": {
      const { data, id } = action.payload
      const newOrderList = state.orderListAdmin.data
      const orderIndex = newOrderList.findIndex((item) => { return item.id === id })
      newOrderList.splice(orderIndex, 1, data)
      return {
        ...state,
        orderListAdmin: {
          ...state.orderListAdmin,
          data: newOrderList,
          load: false
        }
      }
    }
    case "UPDATE_ORDER_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        orderListAdmin: {
          ...state.orderListAdmin,
          error: error,
          load: false
        }
      }
    }

    default: {
      return state
    }

  }
}

