import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components';
import Scroll from '../../../components/Scroll';

const ListContainer = styled.div`
  flex: 1;
  overflow: hidden;
`
const PullDownLoading = styled.div`
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  color: #333;
`
const PullUpLoading = styled.div`
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  color: #333;
`
const NewsList = forwardRef((props, ref) => {
  const { pullUp, pullDown } = props
  const scrollRef = useRef()
  const onPullUp = () => {
    pullUp()
  }
  const onPullDown = () => {
    pullDown()
  }
  useImperativeHandle(ref, () => ({
      finish () {
        const bScroll = scrollRef.current.getBScroll()
        bScroll.scrollTo(0, -20)
      }
  }))
  return (
    <ListContainer>
      <Scroll ref={scrollRef} direction={'vertical'} pullUp={onPullUp} pullDown={onPullDown} startY={-20}>
        <div>
          <PullDownLoading>刷新中~</PullDownLoading>
          {props.children}
          <PullUpLoading>加载中~~</PullUpLoading>
        </div>
      </Scroll>
    </ListContainer>
  )
})

export default NewsList