const initialState = {
  productListAdmin: {
    data: [],
    load: false,
    error: ''
  },

}

export default function productAdminReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCT_LIST_ADMIN_REQUEST": {
      return {
        ...state,
        productListAdmin: {
          ...state.productListAdmin,
          load: true
        }
      }
    }
    case "GET_PRODUCT_LIST_ADMIN_SUCCESS": {
      const { data } = action.payload
      return {
        ...state,
        productListAdmin: {
          ...state.productListAdmin,
          data: data,
          load: false
        }
      }
    }
    case "GET_PRODUCT_LIST_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        productListAdmin: {
          ...state.productListAdmin,
          load: false,
          error: error
        }
      }
    }


    case "DELETE_PRODUCT_ADMIN_REQUEST": {
      return {
        ...state,
        productListAdmin: {
          ...state.productListAdmin,
          load: true
        }
      }
    }
    case "DELETE_PRODUCT_ADMIN_SUCCESS": {
      const { data } = action.payload
      const newProduct = state.productListAdmin.data.filter((productListAdmin) => productListAdmin.id !== data)

      return {
        ...state,
        productListAdmin: {
          ...state.productListAdmin,
          data: newProduct,
          load: false
        }
      }
    }
    case "DELETE_PRODUCT_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        productListAdmin: {
          ...state.productListAdmin,
          load: false,
          error: error
        }
      }
    }
    // case "ADD_PRODUCT_ADMIN_REQUEST": {
    //   return {
    //     ...state,
    //     productListAdmin: {
    //       ...state.productListAdmin,
    //       load: true
    //     }
    //   }
    // }
    // case "ADD_PRODUCT_ADMIN_SUCCESS": {
    //   const { data } = action.payload // data: Object
    //   console.log(action.payload)
    //   return {
    //     ...state,
    //     productListAdmin: {
    //       ...state.productListAdmin,
    //       data: [...state.productListAdmin.data, data], // :Array ok
    //       load: false,
    //       // data: data
    //     }
    //   }
    // }
    // case "ADD_PRODUCT_ADMIN_FAIL": {
    //   const { error } = action.payload
    //   console.log(action.payload)
    //   return {
    //     ...state,
    //     productListAdmin: {
    //       ...state.productListAdmin,
    //       load: false,
    //       error: error
    //     }
    //   }
    // }

    // case "UPDATE_PRODUCT_ADMIN_REQUEST": {
    //   return {
    //     ...state,
    //     productListAdmin: {
    //       ...state.productListAdmin,
    //       load: true
    //     }
    //   }
    // }

    // case "UPDATE_PRODUCT_ADMIN_SUCCESS": {
    //   const { id, data } = action.payload
    //   const newProductList = state.productListAdmin.data
    //   const productIndex = newProductList.findIndex((item) => { return item.id === id })
    //   console.log("productAdminReducer -> productIndex", productIndex)
    //   newProductList.splice(productIndex, 1, data)

    //   return {
    //     ...state,
    //     productListAdmin: {
    //       ...state.productListAdmin,
    //       data: newProductList,
    //       load: false
    //     }
    //   }
    // }
    // case "UPDATE_PRODUCT_ADMIN_FAIL": {
    //   const { error } = action.payload;
    //   return {
    //     ...state,
    //     productListAdmin: {
    //       ...state.productListAdmin,
    //       error: error,
    //       load: false
    //     }
    //   }
    // }

    default: {
      return state

    }
  }
}