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
  position: absolute;
  width: 100%;
  transform: translateY(-100%) translateZ(0);
  z-index: -1;
`
const PullUpLoading = styled.div`
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  color: #333;
`

const BOUNCE_TIME = 800
const THRESHOLD = 60
const STOP = 30

const NewsList = forwardRef((props, ref) => {
  const { pullUp, pullDown } = props
  const scrollRef = useRef()
  const [beforePullDown, setBeforePullDown] = useState(true)
  const [isPullingDown, setIsPullingDown] = useState(false)

  const onPullDown = () => {
    setBeforePullDown(false)
    setIsPullingDown(true)
    pullDown()
  }
  useImperativeHandle(ref, () => ({
      load () {
        const bScroll = scrollRef.current.getBScroll()
        bScroll.refresh()
      },
      finishPullDown () {
        const bScroll = scrollRef.current.getBScroll()
        setIsPullingDown(false)
        setTimeout(() => {
          bScroll.finishPullDown()
          setBeforePullDown(true)
          bScroll.refresh()
        }, BOUNCE_TIME - 100);
      },
      refresh () {
        const bScroll = scrollRef.current.getBScroll()
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
  }))
  let pullDownText = ''
  if (beforePullDown) {
    pullDownText = '下拉刷新'
  } else {
    if (isPullingDown) {
      pullDownText = '加载中...'
    } else {
      pullDownText = '加载成功'
    }
  }
  return (
    <ListContainer>
      <Scroll ref={scrollRef} direction={'vertical'} pullUp={pullUp} pullDown={onPullDown} bounceTime={BOUNCE_TIME} threshold={THRESHOLD} stop={STOP}>
        <div>
          <PullDownLoading>{pullDownText}</PullDownLoading>
          {props.children}
          {props.children.length > 0 && <PullUpLoading>加载中~~</PullUpLoading>}
        </div>
      </Scroll>
    </ListContainer>
  )
})

export default NewsList