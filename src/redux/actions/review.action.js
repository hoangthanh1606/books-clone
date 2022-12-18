export function getReviewListAction(params) {
  return {
    type: "GET_REVIEW_LIST_REQUEST",
    payload: params,
  };
}

export function addToReviewAction(params) {
  return {
    type: "ADD_TO_REVIEW_REQUEST",
    payload: params,
  };
}

export function getAllReviewListAction(params) {
  return {
    type: 'GET_ALL_REVIEW_LIST_REQUEST',
    payload: params,
  }
}