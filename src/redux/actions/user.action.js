export function loginAction(params) {
  return {
    type: "LOGIN_REQUEST",
    payload: params,
  };
}

export function logoutAction(params) {
  return {
    type: "LOGOUT",
    payload: params,
  };
}

export function registerAction(params) {
  return {
    type: "REGISTER_REQUEST",
    payload: params,
  };
}

export function getUserInfoAction(params) {
  return {
    type: "GET_USER_INFO_REQUEST",
    payload: params,
  };
}
// profile
export function updateUserAction(params) {
  return {
    type: "UPDATE_USER_REQUEST",
    payload: params
  }
}

export function changePasswordAction(params) {
  return {
    type: "CHANGE_PASSWORD_REQUEST",
    payload: params
  }
}

export function getOrderListUserAction(params) {
  return {
    type: "ORDER_LIST_USER_REQUEST",
    payload: params
  }
}

