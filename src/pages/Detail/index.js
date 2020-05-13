import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';

import http from '../../utils/http';
import { Container, MainContainer, TitleHeader, TitleMain, BackBtn, Content, Title, InfoWrapper } from "./style";

function Detail (props) {
  const history = useHistory()
  const { id } = useParams()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [bImage, setBImage] = useState('')
  const [author, setAuthor] = useState('')
  useEffect(() => {
    http.get(`/news/36kr/${id}`).then(({ content, title, cover, author_name }) => {
      setContent(content)
      setTitle(title)
      setBImage(cover)
      setAuthor(author_name)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Container>
    <TitleHeader>
      <BackBtn onClick={history.goBack}>{"<"}</BackBtn>
      <TitleMain>{title}</TitleMain>
    </TitleHeader>
    <MainContainer>
      <Title>
        <img src={bImage} alt={title}/>
        <div>{title}</div>
      </Title>
      <InfoWrapper>
        <span>{author}</span>
        <span>发表于</span>
        <span>几天前</span>
      </InfoWrapper>
      <Content dangerouslySetInnerHTML={{__html: content}}></Content>
    </MainContainer>
  </Container>
}

export default Detail