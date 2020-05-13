import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNewsDetail, changeCurrentNews } from "../../store/actions";
import { Container, MainContainer, TitleHeader, TitleMain, BackBtn, Content, Title, InfoWrapper } from "./style";

function Detail (props) {
  const history = useHistory()
  const { id } = useParams()
  const { detail } = props
  const { getDetail, clearDetail } = props
  useEffect(() => {
    if (id !== detail.post_id) {
      clearDetail()
      getDetail(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Container>
    <TitleHeader>
      <BackBtn onClick={history.goBack}>{"<"}</BackBtn>
      <TitleMain>{detail.title}</TitleMain>
    </TitleHeader>
    <MainContainer>
      <Title>
        <img src={detail.cover} alt={detail.title}/>
        <div>{detail.title}</div>
      </Title>
      <InfoWrapper>
        <span>{detail.author_name}</span>
        <span>发表于</span>
        <span>几天前</span>
      </InfoWrapper>
      <Content dangerouslySetInnerHTML={{__html: detail.content}}></Content>
    </MainContainer>
  </Container>
}

const mapStateToProps = (state) => ({
  detail: state.current
})

const mapDispatchToProps = (dispatch) => ({
  getDetail: (id) => dispatch(getNewsDetail(id)),
  clearDetail: () => dispatch(changeCurrentNews({}))
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)