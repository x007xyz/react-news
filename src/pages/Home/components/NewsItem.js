import React from 'react'
import styled from "styled-components";
import {Link} from 'react-router-dom';

const ItemContainer = styled.div`
  background-color: #fff;
  padding: 10px 15px;
  position: relative;
  a {
    text-decoration: none;
  }
`
const ItemMain = styled.div`
  display: flex;
  img {
    width: 112px;
    height: 73px;
    margin-right: 10px;
  }
  div {
    flex: 1;
    font-size: 15px;
    color: #555555;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`
const ItemInfo = styled.div`
  display: flex;
  color: #999999;
  font-size: 12px;
  margin-top: 12px;
  span {
    margin-right: 10px;
  }
`

const ItemLine = styled.div`
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 0;
  height: 1px;
  background-color: #ebebeb;
`

function NewsItem(props) {
  const { post_id, cover, title, author_name, published_at } = props
  return (<ItemContainer>
    <Link to={"/detail/" + post_id }>
      <ItemMain>
        <img src={cover} alt={title}/>
        <div>{title}</div>
      </ItemMain>
    </Link>
    <ItemInfo>
      <span>{author_name}</span>
      <span>{published_at}</span>
    </ItemInfo>
    <ItemLine/>
  </ItemContainer>)
}

export default NewsItem