import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useMemo } from 'react'
import BScroll from "@better-scroll/core";
import PullDown from '@better-scroll/pull-down'
import PropTypes from "prop-types";
import styled from 'styled-components';
import { debounce } from "../../utils";

BScroll.use(PullDown)

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState()
  const scrollContaninerRef = useRef()
  const { direction, click, bounceTop, bounceBottom, threshold, stop, bounceTime } = props
  
  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      bounceTime,
      pullDownRefresh: !!pullDown && {
        threshold,
        stop
      },
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
    // eslint-disable-next-line
  }, []);
  const { pullUp, pullDown, onScroll } = props

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 500)
  }, [pullUp])
  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 500)
  }, [pullDown])

  useEffect(() => {
    if(!bScroll || !onScroll) return
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [bScroll, onScroll])
  useEffect(() => {
    if (!bScroll || !pullUp) return
    bScroll.on('scrollEnd', () => {
      //判断是否滑动到了底部
      if(bScroll.y <= bScroll.maxScrollY + 100){
        pullUpDebounce();
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [bScroll, pullUp, pullUpDebounce])
  useEffect(() => {
    if (!bScroll || !pullDown) return
    bScroll.on('pullingDown', () => {
      pullDownDebounce();
    })
    return () => {
      bScroll.off('pullingDown')
    }
  }, [bScroll, pullDown, pullDownDebounce])
  useImperativeHandle(ref, () => ({
    getBScroll() {
      if(bScroll) {
        return bScroll;
      }
    }
  }))
  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  )
})

Scroll.defaultProps = {
  direction: 'vertical',
  threshold: 90,
  stop: 40,
  bounceTime: 1000,
  click: true,
  refresh: true,
  bounceTop: true,
  bounceBottom: true,
  pullUp: null,
  pullDown: null,
  onScroll: null
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  threshold: PropTypes.number,
  stop: PropTypes.number,
  bounceTime: PropTypes.number,
  click: PropTypes.bool,
  refresh: PropTypes.bool,
  bounceTop: PropTypes.bool,
  bounceBottom: PropTypes.bool,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  onScroll: PropTypes.func
}

export default Scroll