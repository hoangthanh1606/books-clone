export function getProductListAction(params) {
  return {
    type: "GET_PRODUCT_LIST_REQUEST",
    payload: params,
  };
}

export function getCategoryListAction(params) {
  return {
    type: "GET_CATEGORY_LIST_REQUEST",
    payload: params,
  };
}

export function getProductDetailAction(params) {
  return {
    type: "GET_PRODUCT_DETAIL_REQUEST",
    payload: params,
  };
}

export function getPublisherListAction(params) {
  return {
    type: "GET_PUBLISHER_LIST_REQUEST",
    payload: params,
  };
}

export function getProductSameAction(params) {
  // console.log("getProductSameAction -> params", params)
  return {
    type: "GET_PRODUCT_SAME_REQUEST",
    payload: params,
  };
}

export const addSearchProductAction = (params) => {
  return {
    type: 'ADD_SEARCH_PRODUCT',
    payload: params,
  }
}
