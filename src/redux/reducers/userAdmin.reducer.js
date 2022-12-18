const initialState = {
  userListAdmin: {
    data: [],
    load: false,
    error: ''
  },
  userAdminInfo: {
    data: {},
    load: false,
    error: ''
  }
}

export default function userAdminReducer(state = initialState, action) {
  switch (action.type) {

    // get user

    case "GET_USER_LIST_ADMIN_REQUEST": {
      return {
        ...state,
        userListAdmin: {
          ...state.userListAdmin,
          load: true
        }
      }
    }
    case "GET_USER_LIST_ADMIN_SUCCESS": {
      const { data } = action.payload
      return {
        ...state,
        userListAdmin: {
          ...state.userListAdmin,
          load: false,
          data: data
        }
      }
    }
    case "GET_USER_LIST_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        userListAdmin: {
          ...state.userListAdmin,
          load: false,
          error: error
        }
      }
    }
    //delete user

    case "DELETE_USER_ADMIN_REQUEST": {
      return {
        ...state,
        userListAdmin: {
          ...state.userListAdmin,
          load: true
        }
      }
    }
    case "DELETE_USER_ADMIN_SUCCESS": {
      const { data } = action.payload
      const newUser = state.userListAdmin.data.filter((userListAdmin) => userListAdmin.id !== data)

      return {
        ...state,
        userListAdmin: {
          ...state.userListAdmin,
          data: newUser,
          load: false
        }
      }
    }
    case "DELETE_USER_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        userListAdmin: {
          ...state.userListAdmin,
          load: false,
          error: error
        }
      }
    }

    case "EDIT_USER_ADMIN_REQUEST": {
      return {
        ...state,
        userListAdmin: {
          ...state.userListAdmin,
          load: true,
        }
      }
    }
    case "EDIT_USER_ADMIN_SUCCESS": {
      const { id, data } = action.payload
      const newUser = state.userListAdmin.data
      const userIndex = newUser.findIndex((item) => { return item.id === id })
      newUser.splice(userIndex, 1, data)
      return {
        ...state,
        userListAdmin: {
          ...state.userListAdmin,
          data: newUser,
          load: false
        }
      }
    }
    case "EDIT_USER_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        userListAdmin: {
          ...state.userListAdmin,
          error: error,
          load: false
        }
      }
    }
    case "GET_USER_INFO_ADMIN_REQUEST": {
      return {
        ...state,
        userAdminInfo: {
          ...state.userAdminInfo,
          load: true
        }
      }
    }
    case "GET_USER_INFO_ADMIN_SUCCESS": {
      const { data } = action.payload
      return {
        ...state,
        userAdminInfo: {
          ...state.userAdminInfo,
          data: data,
          load: false
        }
      }
    }
    case "GET_USER_INFO_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        userAdminInfo: {
          ...state.userAdminInfo,
          error: error,
          load: false
        }
      }
    }
    case "UPDATE_USER_INFO_ADMIN_REQUEST": {
      return {
        ...state,
        userAdminInfo: {
          ...state.userAdminInfo,
          load: true,
        }
      }
    }
    case "UPDATE_USER_INFO_ADMIN_SUCCESS": {
      const { data } = action.payload
      return {
        ...state,
        userAdminInfo: {
          ...state.userAdminInfo,
          data: data,
          load: false
        }
      }
    }
    case "UPDATE_USER_INFO_ADMIN_FAIL": {
      const { error } = action.payload
      return {
        ...state,
        userAdminInfo: {
          ...state.userAdminInfo,
          error: error,
          load: false
        }
      }
    }
    // case "CHANGE_PASSWORD_ADMIN_REQUEST": {
    //   return {
    //     ...state,
    //     userListAdmin: {
    //       ...state.userListAdmin,
    //       load: true
    //     }
    //   }
    // }
    // case "CHANGE_PASSWORD_ADMIN_FAIL": {
    //   const { error } = action.payload
    //   return {
    //     ...state,
    //     userListAdmin: {
    //       ...state.userListAdmin,
    //       error: error,
    //       load: false
    //     }
    //   }
    // }
    default:
      return state
  }
}