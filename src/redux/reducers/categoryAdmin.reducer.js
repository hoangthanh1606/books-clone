const initialState = {
  categoryListAdmin: {
    data: [],
    load: false,
    error: ''
  },
  publisherListAdmin: {
    data: [],
    load: false,
    error: ''
  }
}

export default function categoryAdminReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CATEGORY_ADMIN_REQUEST": {
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          load: true
        }
      }
    }
    case "GET_CATEGORY_ADMIN_SUCCESS": {
      const { data } = action.payload
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          data: data,
          load: false
        }
      }
    }
    case "GET_CATEGORY_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          load: false,
          error: error
        }
      }
    }
    case "CREATE_CATEGORY_ADMIN_REQUEST": {
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          load: true
        }
      }
    }
    case "CREATE_CATEGORY_ADMIN_SUCCESS": {
      const { data } = action.payload
      console.log("categoryAdminReducer -> data", data)
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          data: [...state.categoryListAdmin.data, data],
          load: false
        }
      }
    }
    case "CREATE_CATEGORY_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          error: error,
          load: false
        }
      }
    }
    case "DELETE_CATEGORY_ADMIN_REQUEST": {
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          load: true
        }
      }
    }
    case "DELETE_CATEGORY_ADMIN_SUCCESS": {
      const { data } = action.payload
      const newCategoryList = state.categoryListAdmin.data
      const categoryIndex = newCategoryList.findIndex((item) => { return item.id === data })
      newCategoryList.splice(categoryIndex, 1)
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          data: newCategoryList,
          load: false
        }
      }
    }
    case "DELETE_CATEGORY_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          load: false,
          error: error
        }
      }
    }

    case "UPDATE_CATEGORY_ADMIN_REQUEST": {
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          load: true,
        }
      }
    }

    case "UPDATE_CATEGORY_ADMIN_SUCCESS": {
      const { id, data } = action.payload
      const newCategoryList = state.categoryListAdmin.data
      const categoryIndex = newCategoryList.findIndex((item) => item.id === id)
      newCategoryList.splice(categoryIndex, 1, data)
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          data: newCategoryList,
          load: false
        }
      }
    }
    case "UPDATE_CATEGORY_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        categoryListAdmin: {
          ...state.categoryListAdmin,
          error: error,
          load: false
        }
      }
    }
    //publisher

    case "GET_PUBLISHER_ADMIN_REQUEST": {
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          load: true
        }
      }
    }
    case "GET_PUBLISHER_ADMIN_SUCCESS": {
      const { data } = action.payload
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          data: data,
          load: false
        }
      }
    }
    case "GET_PUBLISHER_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          load: false,
          error: error
        }
      }
    }

    case "CREATE_PUBLISHER_ADMIN_REQUEST": {
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          load: true
        }
      }
    }
    case "CREATE_PUBLISHER_ADMIN_SUCCESS": {
      const { data } = action.payload
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          data: [...state.publisherListAdmin.data, data],
          load: false
        }
      }
    }
    case "CREATE_PUBLISHER_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          error: error,
          load: false
        }
      }
    }
    case "UPDATE_PUBLISHER_ADMIN_REQUEST": {
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          load: true,
        }
      }
    }

    case "UPDATE_PUBLISHER_ADMIN_SUCCESS": {
      const { id, data } = action.payload
      const newPublisherList = state.publisherListAdmin.data
      const publisherIndex = newPublisherList.findIndex((item) => item.id === id)
      newPublisherList.splice(publisherIndex, 1, data)
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          data: newPublisherList,
          load: false
        }
      }
    }
    case "UPDATE_PUBLISHER_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          error: error,
          load: false
        }
      }
    }
    case "DELETE_PUBLISHER_ADMIN_REQUEST": {
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          load: true
        }
      }
    }
    case "DELETE_PUBLISHER_ADMIN_SUCCESS": {
      const { data } = action.payload
      const newPublisherList = state.publisherListAdmin.data
      const publisherIndex = newPublisherList.findIndex((item) => { return item.id === data })
      newPublisherList.splice(publisherIndex, 1)
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          data: newPublisherList,
          load: false
        }
      }
    }
    case "DELETE_PUBLISHER_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        publisherListAdmin: {
          ...state.publisherListAdmin,
          load: false,
          error: error
        }
      }
    }


    default: {
      return state

    }
  }
}