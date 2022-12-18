const initialState = {
  reviewList: {
    data: [],
    load: false,
    error: '',
  },
  allReviewList: {
    data: [],
    load: false,
    error: '',
  }
};

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_REVIEW_LIST_REQUEST': {
      return {
        ...state,
        commentList: {
          ...state.reviewList,
          load: true,
        },
      }
    }
    case 'GET_REVIEW_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        reviewList: {
          ...state.reviewList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_REVIEW_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        reviewList: {
          ...state.reviewList,
          load: false,
          error: error,
        },
      }
    }
    case 'ADD_TO_REVIEW_REQUEST': {
      return {
        ...state,
        reviewList: {
          ...state.reviewList,
          load: true
        },
      };
    }
    case 'ADD_TO_REVIEW_SUCCESS': {
      const { data } = action.payload;
      console.log("🚀 ~ file: review.reducer.js ~ line 60 ~ reviewReducer ~ data", data)
      return {
        ...state,
        reviewList: {
          ...state.reviewList,
          data: [
            data,
            ...state.reviewList.data,
          ],
          load: false
        },
      };
    }
    case 'ADD_TO_REVIEW_FAIL': {
      return {
        ...state,
        reviewList: {
          ...state.reviewList.data,
          load: false
        },
      };
    }
    case 'GET_ALL_REVIEW_LIST_REQUEST': {
      return {
        ...state,
        allReviewList: {
          ...state.allReviewList,
          load: true
        },
      }
    }
    case 'GET_ALL_REVIEW_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        allReviewList: {
          ...state.allReviewList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_ALL_REVIEW_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        allReviewList: {
          ...state.allReviewList,
          error: error,
          load: false,
        },
      }
    }
    
    default: {
      return state;
    }
  }
}