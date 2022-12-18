export function getUserListAction(params) {
  return {
    type: "GET_USER_LIST_ADMIN_REQUEST",
    payload: params,
  };
}


export function deleteUserAdminAction(params) {
  return {
    type: "DELETE_USER_ADMIN_REQUEST",
    payload: params
  }
}

export function editUserAdminAction(params) {
  console.log("editUserAdminAction -> params", params)
  return {
    type: "EDIT_USER_ADMIN_REQUEST",
    payload: params
  }
}

export function getUserInfoAdminAction(params) {
  return {
    type: "GET_USER_INFO_ADMIN_REQUEST",
    payload: params
  }
}

export function updateUserInfoAdminAction(params) {
  return {
    type: "UPDATE_USER_INFO_ADMIN_REQUEST",
    payload: params
  }
}


