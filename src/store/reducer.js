import { SET_LIST, SET_CURRENT_NEWS, SET_SELECTED_NEWSID } from "./constants";

const defaultState = {
  list: [],
  current: {},
  newsId: 0,
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case SET_LIST:
      return { ...state, list: action.data }
    case SET_CURRENT_NEWS:
      return { ...state, current: action.data }
    case SET_SELECTED_NEWSID:
      return { ...state, newsId: action.data}
    default:
      return state
  }
}