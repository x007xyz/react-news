import React, { useRef, useEffect } from 'react'
import {connect} from 'react-redux';
import { refreshList, loadList, changeSelectedNewsId } from "../../store/actions";

import { Container, TitleHeader } from './style.js'
import Tabs from './components/Tabs'
import NewsList from "./components/NewsList";
import NewsItem from "./components/NewsItem";


function Home(props) {
  const { list, newsId } = props
  const { refresh, load, changeSelectedNewsId } = props
  const listRef = useRef()

  const onPullUp = () => {
    if (list.length === 0) return
    load().then(() => {
      listRef.current.load()
    })
  }
  const onPullDown = () => {
    load().then(() => {
      listRef.current.finishPullDown()
    })
  }
  useEffect(() => {
    refresh().then(() => {
      const refresh = listRef.current.refresh
      refresh()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsId])
  return (
    <Container>
      <TitleHeader>新闻资讯</TitleHeader>
      <Tabs selectedNewsId={newsId} onChange={(value) => changeSelectedNewsId(value)}></Tabs>
      <NewsList ref={listRef} pullUp={onPullUp} pullDown={onPullDown}>
        {list.map(item => {
          return (<NewsItem key={item.id} {...item}></NewsItem>)
        })}
      </NewsList>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  list: state.list,
  newsId: state.newsId
})

const mapDispatchToProps = (dispatch) => ({
  refresh: () => dispatch(refreshList()),
  load: () => dispatch(loadList()),
  changeSelectedNewsId: (id) => dispatch(changeSelectedNewsId(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Home))
