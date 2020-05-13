import React, { useRef } from 'react'
import styled from "styled-components";
import Scroll from '../../../components/Scroll';

const TabsContainer = styled.div`
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
`

const List = styled.div`
  display: inline-block;
  height: 42px;
  white-space: nowrap;
`

const TabItem = styled.div`
  display: inline-block;
  padding: 0 20px;
  height: 42px;
  font-size: 16px;
  color: #007AFF;
  box-sizing: border-box;
  &.selected {
    border-bottom: 2px solid #007AFF;
  }
`

const tabs = [{
  id: "tab01",
  name: '最新',
  newsid: 0
}, {
  id: "tab02",
  name: '大公司',
  newsid: 23
}, {
  id: "tab03",
  name: '内容',
  newsid: 223
}, {
  id: "tab04",
  name: '消费',
  newsid: 221
}, {
  id: "tab05",
  name: '娱乐',
  newsid: 225
}, {
  id: "tab06",
  name: '区块链',
  newsid: 208
}]

function Tabs (props) {
  const scrollRef = useRef()
  const { selectedNewsId } = props
  const { onChange } = props

  const clickItem = (id, event) => {
    const bScroll = scrollRef.current.getBScroll()
    bScroll.scrollToElement(event.target, 800)
    onChange(id)
  }
  return (
    <TabsContainer>
      <Scroll ref={scrollRef} direction={"horizental"}>
        <List>
          {tabs.map(({ id, name, newsid }) => {
            return <TabItem key={id} className={ selectedNewsId === newsid ? 'selected' : '' } onClick={(event) => clickItem(newsid, event)}>{name}</TabItem>
          })}
        </List>
      </Scroll>
    </TabsContainer>
  )
}

export default Tabs