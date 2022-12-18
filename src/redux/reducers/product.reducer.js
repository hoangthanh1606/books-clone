const initialState = {
  productList: {
    data: [],
    // page: 1,
    load: false,
    error: "",
  },
  productDetail: {
    data: {
      category: {},
      publisher: {},
    },
    load: false,
    error: "",
  },
  categoryList: {
    data: [],
    load: false,
    error: "",
  },
  publisherList: {
    data: [],
    load: false,
    error: "",
  },
  productSame: {
    data: [],
    load: false,
    error: "",
  },
  searchValue: {
    data: []
  }
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCT_LIST_REQUEST": {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        },
      };
    }
    case "GET_PRODUCT_LIST_SUCCESS": {
      const { data, loadMore, } = action.payload;
      if (loadMore) {
        return {
          ...state,
          productList: {
            ...state.productList,
            data: [...state.productList.data, ...data],
            load: false,
            // page: page,
          },
        };
      }
      return {
        ...state,
        productList: {
          ...state.productList,
          data: data,
          load: false,
          // page: page,
        },
      };
    }
    case "GET_PRODUCT_LIST_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error,
        },
      };
    }

    case "GET_PRODUCT_DETAIL_REQUEST": {
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: true,
        },
      };
    }
    case "GET_PRODUCT_DETAIL_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          data: data,
          load: false,
        },
      };
    }
    case "GET_PRODUCT_DETAIL_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: false,
          error: error,
        },
      };
    }

    case "GET_CATEGORY_LIST_REQUEST": {
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          load: true,
        },
      };
    }
    case "GET_CATEGORY_LIST_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          data: data,
          load: false,
        },
      };
    }
    case "GET_CATEGORY_LIST_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          load: false,
          error: error,
        },
      };
    }

    case "GET_PUBLISHER_LIST_REQUEST": {
      return {
        ...state,
        publisherList: {
          ...state.publisherList,
          load: true,
        },
      };
    }
    case "GET_PUBLISHER_LIST_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        publisherList: {
          ...state.publisherList,
          data: data,
          load: false,
        },
      };
    }
    case "GET_PUBLISHER_LIST_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        publisherList: {
          ...state.publisherList,
          load: false,
          error: error,
        },
      };
    }
  
    case "GET_PRODUCT_SAME_REQUEST": {
      return {
        ...state,
        productSame: {
          ...state.productSame,
          load: true,
        },
      };
    }
    case "GET_PRODUCT_SAME_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        productSame: {
          ...state.productSame,
          data: data,
          load: false,
        },
      };
    }
    case "GET_PRODUCT_SAME_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        productSame: {
          ...state.productSame,
          error: error,
          load: false,
        },
      };
    }
    case 'ADD_SEARCH_PRODUCT': {
      return {
        ...state,
        searchValue: [
          action.payload,
        ],
      };
    }

    default: {
      return state;
    }
  }
}
