import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const MainContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const Title = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
  }
  div {
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    color: #ffffff;
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
  }
`

export const Content = styled.div`
  margin: 16px;
  font-size: 14px;
`

export const TitleHeader = styled.div`
  background-color: rgb(47, 133, 252);
  color: rgb(255, 255, 255);
  height: 44px;
  position: relative;
`

export const TitleMain = styled.div`
  padding: 0 80px;
  text-align: center;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  line-height: 44px;
  font-size: 16px;
  font-weight: bold;
`

export const InfoWrapper = styled.div`
  font-size: 14px;
  color: #333;
  margin: 16px;
  span {
    margin-right: 10px;
  }
`

export const BackBtn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 44px;
  height: 44px;
  font-size: 24px;
  line-height: 44px;
  text-align: center;
`