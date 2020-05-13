import { SET_LIST, SET_CURRENT_NEWS, SET_SELECTED_NEWSID } from "./constants";

import http from "../utils/http";

const getList = (columnId = 0, minId = 0) => {
  const params = {
    columnId,
    minId,
    pageSize: 10,
    column: 'id,post_id,title,author_name,cover,published_at,comments_count'
  }
  return http.get('/news', { params })
}

const getDetail = (id) => {
  return http.get(`/news/36kr/${id}`)
}

export const changeList = (data) => ({
  data,
  type: SET_LIST
})

export const changeCurrentNews = (data) => ({
  data,
  type: SET_CURRENT_NEWS
})

export const changeSelectedNewsId = (data) => ({
  data,
  type: SET_SELECTED_NEWSID
})
export const getNewsDetail = (query) => {
  return dispatch => {
    return getDetail(query).then(data => {
      dispatch(changeCurrentNews(data))
    })
  }
}
// 加载数据
export const loadList = () => {
  return (dispatch, getState) => {
    const { list, newsId } = getState()
    return getList(newsId, list[list.length - 1].id).then(data => {
      dispatch(changeList(list.concat(data)))
    })
  }
}
// 刷新数据
export const refreshList = () => {
  return (dispatch, getState) => {
    const { newsId } = getState()
    return getList(newsId).then(data => {
      dispatch(changeList(data))
    })
  }
}