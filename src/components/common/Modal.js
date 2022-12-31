import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router";
import ModalImage from "../../assets/image/icon-modal.png";
import postData from "../../utils/postData";

const ModalSection = styled.section`
  position: fixed;
  left: 0;
  right: 0;
  // bottom: -30rem;
  bottom: -45rem;
`;

const ModalDiv = styled.div`
  display: block;
  max-width: 50.1rem;
  z-index: 10;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  text-align: center;
  transform: ${(props) =>
    !props.modal ? "translateY(130%)" : "translateY(-210%)"};
  transition: 0.5s;
`;

const ModalUl = styled.ul`
  width: 50.7rem;
  // height: 13rem;
  height: 20rem;
  // padding: 3rem 2.6rem 3rem 2.6rem;
  font-size: ${(props) => props.theme.largeFontSize};
  font-weight: ${(props) => props.theme.normalFontWeight};
`;

const ModalLi = styled.li`
  padding: 1rem 1.6rem;
  text-align: left;
  cursor: pointer;
  text-align: center;
  &:nth-child(-n + 2) {
    border-bottom: 1px solid #dbdbdb;
  }
`;
// url은 useparams로 불러오기
// postId 추가하였습니다

export default function Modal({
  modal,
  isModal,
  type,
  commentId,
  postId,
  setPostPageData,
  accountname,
  setFeed,
  fullArray,
  setHasToken,
}) {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const currentURL = useLocation();
  const BASE_URL = "localhost:3000";

  console.log(currentURL);

  console.log(setFeed);

  const deletePost = (idPost) => {
    postData("deletepost", postId, setPostPageData);
    isModal((prev) => !prev);
    if (type === "myhome") {
      setFeed([...fullArray].filter((v) => v.id !== postId));
    }
    // 삭제하면 홈으로 이동
    navigate("/");
  };

  const editPost = (e) => {
    console.log(e);
    if (type === "myhome") {
      navigate(`${accountname}/post/${postId}/edit`);
    } else {
      navigate("edit");
    }

    isModal((prev) => !prev);
  };

  // type, url, setPostData, comment, id, commentId
  const postReport = () => {
    postData("postReport", postId, setMessage);
    isModal((prev) => !prev);
    // const { report } = { ...message };

    // alert(` ${report.post} 게시물 신고가 완료 되었습니다.`);
  };

  const deleteComment = () => {
    postData("deletComment", postId, setPostPageData, "", commentId);

    isModal((prev) => !prev);

    console.log(message);
    // navigate(0);
  };

  const commentReport = () => {
    postData("commentReport", postId, setMessage, "", commentId);
    const { report } = { ...message };

    isModal((prev) => !prev);

    // alert(`${report.post} 댓글 신고가 완료 되었습니다.`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountname");
    setHasToken(false);
    navigate("/");
  };
  const share = async () => {
    const clip = BASE_URL + currentURL.pathname;

    try {
      await navigator.clipboard.writeText(clip);
      alert("클립보드에 복사되었습니다");
    } catch (e) {
      alert("복사가 실패되었습니다");
    }
  };
  const ModalUI = {
    myprofile: (
      <>
        <ModalLi onClick={logout}>로그아웃</ModalLi>
      </>
    ),
    otherprofile: (
      <>
        <ModalLi onClick={share}>공유하기</ModalLi>
      </>
    ),
    myprofilepost: (
      <>
        <ModalLi onClick={deletePost}> 삭제하기</ModalLi>
        <ModalLi onClick={editPost}> 수정하기</ModalLi>
      </>
    ),
    myhome: (
      <>
        <ModalLi onClick={editPost}>수정</ModalLi>
        <ModalLi onClick={deletePost}>삭제</ModalLi>
      </>
    ),
    mypost: (
      <>
        <ModalLi onClick={editPost}>수정</ModalLi>
        <ModalLi onClick={deletePost}>삭제</ModalLi>
      </>
    ),
    mycomment: <ModalLi onClick={deleteComment}>삭제</ModalLi>,
    otherpost: <ModalLi onClick={postReport}>게시물 신고하기</ModalLi>,
    othercomment: <ModalLi onClick={commentReport}>댓글 신고하기</ModalLi>,
  };

  return (
    <ModalSection>
      <h2 className="sr-only">모달창</h2>
      <ModalDiv modal={modal}>
        <ModalUl>
          {ModalUI[type]} <ModalLi>취소</ModalLi>
        </ModalUl>
      </ModalDiv>
    </ModalSection>
  );
}
//  <img src={ModalImage} alt="모달창 아이콘" />
