export function getProductListAdminAction(params) {
  return {
    type: "GET_PRODUCT_LIST_ADMIN_REQUEST",
    payload: params
  }
}
export function addProductAdminAction(params) {
  return {
    type: "ADD_PRODUCT_ADMIN_REQUEST",
    payload: params
  }
}

export function deleteProductAdminAction(params) {
  return {
    type: "DELETE_PRODUCT_ADMIN_REQUEST",
    payload: params
  }
}

export function updateProductAdminAction(params) {
  return {
    type: "UPDATE_PRODUCT_ADMIN_REQUEST",
    payload: params
  }
}
