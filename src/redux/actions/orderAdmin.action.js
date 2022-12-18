export function getOrderListAdminAction(params) {
  return {
    type: 'GET_ORDER_LIST_ADMIN_REQUEST',
    payload: params
  }
}
export function updateOrderAdminAction(params) {
  return {
    type: 'UPDATE_ORDER_ADMIN_REQUEST',
    payload: params
  }
}