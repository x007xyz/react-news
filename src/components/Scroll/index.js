import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useMemo } from 'react'
import BScroll from "better-scroll";
import PropTypes from "prop-types";
import styled from 'styled-components';

import { debounce } from "../../utils";

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState()
  const scrollContaninerRef = useRef()
  const { direction, click, bounceTop, bounceBottom, refresh, startY } = props
  
  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      startY,
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
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
    bScroll.on('touchEnd', (pos) => {
      //判断用户的下拉动作
      if(pos.y > 50) {
        pullDownDebounce();
      }
    })
    return () => {
      bScroll.off('touchEnd')
    }
  }, [bScroll, pullDown, pullDownDebounce])
  useEffect(() => {
    if(refresh && bScroll){
      bScroll.refresh();
    }
  });
  useImperativeHandle(ref, () => ({
    refresh() {
      if(bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
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
  startY: 0,
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
  startY: PropTypes.number,
  click: PropTypes.bool,
  refresh: PropTypes.bool,
  bounceTop: PropTypes.bool,
  bounceBottom: PropTypes.bool,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  onScroll: PropTypes.func
}

export default Scroll