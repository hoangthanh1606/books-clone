
export function getCategoryAdminAction(params) {
  // console.log("getCategoryAdminAction -> params", params)
  return {
    type: "GET_CATEGORY_ADMIN_REQUEST",
    payload: params
  }
}

export function createCategoryAdminAction(params) {
  // console.log("createCategoryAdminAction -> params", params)
  return {
    type: "CREATE_CATEGORY_ADMIN_REQUEST",
    payload: params
  }
}

export function deleteCategoryAdminAction(params) {
  return {
    type: "DELETE_CATEGORY_ADMIN_REQUEST",
    payload: params
  }
}

export function updateCategoryAdminAction(params) {
  return {
    type: "UPDATE_CATEGORY_ADMIN_REQUEST",
    payload: params
  }
}
//publisher

export function getPublisherAdminAction(params) {
  return {
    type: "GET_PUBLISHER_ADMIN_REQUEST",
    payload: params
  }
}
export function createPublisherAdminAction(params) {
  // console.log("createCategoryAdminAction -> params", params)
  return {
    type: "CREATE_PUBLISHER_ADMIN_REQUEST",
    payload: params
  }
}
export function updatePublisherAdminAction(params) {
  return {
    type: "UPDATE_PUBLISHER_ADMIN_REQUEST",
    payload: params
  }
}
export function deletePublisherAdminAction(params) {
  return {
    type: "DELETE_PUBLISHER_ADMIN_REQUEST",
    payload: params
  }
}