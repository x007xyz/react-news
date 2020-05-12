import React, { useState, useRef } from 'react'

import { Container, TitleHeader } from './style.js'
import Tabs from './components/Tabs'
import NewsList from "./components/NewsList";
import NewsItem from "./components/NewsItem";

const list = [
  {
    id: 121375,
    post_id: '5310910',
    title: '为什么自动驾驶诉讼不断？',
    author_name: '未来汽车日报',
    cover:
      'https://img.36krcdn.com/20200410/v2_9c3331af67e64994aa97a27fffb1a380_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center',
    published_at: '2020-04-11 17:07:48',
    comments_count: 0,
    content: '',
  },
  {
    id: 121374,
    post_id: '5310906',
    title: '2020数字中国创新大赛-数字政府赛道21强出炉，四大赛题紧贴政府数字化发展需求',
    author_name: '36氪深度服务',
    cover: 'https://img.36krcdn.com/20200411/v2_16417a06088947debe0450950f8fc813_img_png',
    published_at: '2020-04-11 16:59:15',
    comments_count: 0,
    content: '',
  },
  {
    id: 121373,
    post_id: '5310903',
    title: '地方政府救市哪家强？广州补贴上万元，广深杭新增指标超5万',
    author_name: '未来汽车日报',
    cover:
      'https://img.36krcdn.com/20200410/v2_6905947498bc4ec0af228afed409f771_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center',
    published_at: '2020-04-11 16:09:09',
    comments_count: 0,
    content: '',
  },
  {
    id: 121372,
    post_id: '5310813',
    title: '救命呼吸机缺口难补！一文扒开供应链真相',
    author_name: '智东西',
    cover: 'https://img.36krcdn.com/20200410/v2_86bbf8245f754be79f3386a82b385093_img_000',
    published_at: '2020-04-11 15:40:02',
    comments_count: 0,
    content: '',
  },
  {
    id: 121371,
    post_id: '5309573',
    title: '每月节省32%的开支，我是怎么做到的？',
    author_name: '神译局',
    cover: 'https://img.36krcdn.com/20200408/v2_c67c3edfe4b5446992b32fad93a44a75_img_png',
    published_at: '2020-04-11 14:48:02',
    comments_count: 0,
    content: '',
  },
  {
    id: 121369,
    post_id: '5310859',
    title: '瓜子坚果双增长，但洽洽并不能高枕无忧',
    author_name: '资本侦探',
    cover:
      'https://img.36krcdn.com/20200411/v2_2204c6132432403184e43df22485545e_img_000?x-oss-process=image/resize,m_mfit,w_432,h_288/crop,w_432,h_288,g_center',
    published_at: '2020-04-11 14:23:00',
    comments_count: 0,
    content: '',
  },
  {
    id: 121367,
    post_id: '5309137',
    title: '克服危机和压力，精神力量强大的人都有这5个习惯',
    author_name: '神译局',
    cover: 'https://img.36krcdn.com/20200406/v2_d2c6a686b4074a1eb43603e67d6ba204_img_png',
    published_at: '2020-04-11 13:47:01',
    comments_count: 0,
    content: '',
  },
  {
    id: 121365,
    post_id: '5310864',
    title: '神州租车找爹记',
    author_name: 'PingWest品玩',
    cover: 'https://img.36krcdn.com/20200411/v2_f497b1c414d5489791569b3ea99df33d_img_000',
    published_at: '2020-04-11 13:39:00',
    comments_count: 0,
    content: '',
  },
  {
    id: 121366,
    post_id: '5310884',
    title: '​抖音快手明星图鉴：哪个平台更适合明星“再就业”？',
    author_name: '明星八爪娱',
    cover: 'https://img.36krcdn.com/20200411/v2_da4c26244cbc494c8e0e5918518e866c_img_png',
    published_at: '2020-04-11 13:38:00',
    comments_count: 0,
    content: '',
  },
  {
    id: 121364,
    post_id: '5309105',
    title: '动荡的市场中，你需要牢记巴菲特的这3个原则',
    author_name: '神译局',
    cover: 'https://img.36krcdn.com/20200406/v2_232e9248d5c74ff989db57a0b6713abe_img_png',
    published_at: '2020-04-11 12:45:02',
    comments_count: 0,
    content: '',
  },
]

function Home() {
  const [newId, setNewsId] = useState(0)
  const listRef = useRef()

  const onPullUp = () => {}
  const onPullDown = () => {
    const finish = listRef.current.finish
    setTimeout(() => {
      finish()
    }, 1000);
  }
  return (
    <Container>
      <TitleHeader>新闻资讯</TitleHeader>
      <Tabs selectedNewsId={newId} onChange={(value) => setNewsId(value)}></Tabs>
      <NewsList ref={listRef} pullUp={() => onPullUp} pullDown={onPullDown}>
        {list.map(item => {
          return (<NewsItem key={item.id} {...item}></NewsItem>)
        })}
      </NewsList>
    </Container>
  )
}

export default Home
