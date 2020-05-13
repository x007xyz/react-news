import React, { useState, useRef, useEffect } from 'react'

import http from "../../utils/http";

import { Container, TitleHeader } from './style.js'
import Tabs from './components/Tabs'
import NewsList from "./components/NewsList";
import NewsItem from "./components/NewsItem";

const getList = (columnId = 0, minId = 0) => {
  const params = {
    columnId,
    minId,
    pageSize: 10,
    column: 'id,post_id,title,author_name,cover,published_at,comments_count'
  }
  return http.get('/news', { params })
}

function Home() {
  const [newsId, setNewsId] = useState(0)
  const [list, setList] = useState([])
  const listRef = useRef()

  const onPullUp = () => {
    if (list.length === 0) return
    getList(newsId, list[list.length - 1].id).then((data) => {
      const load = listRef.current.load
      setList(list.concat(data))
      load()
    })
  }
  const onPullDown = () => {
    getList(newsId).then((data) => {
      const finishPullDown = listRef.current.finishPullDown
      setList(data)
      finishPullDown()
    })
  }
  useEffect(() => {
    getList(newsId).then((data) => {
      const refresh = listRef.current.refresh
      setList(data)
      refresh()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsId])
  return (
    <Container>
      <TitleHeader>新闻资讯</TitleHeader>
      <Tabs selectedNewsId={newsId} onChange={(value) => setNewsId(value)}></Tabs>
      <NewsList ref={listRef} pullUp={onPullUp} pullDown={onPullDown}>
        {list.map(item => {
          return (<NewsItem key={item.id} {...item}></NewsItem>)
        })}
      </NewsList>
    </Container>
  )
}

export default Home
