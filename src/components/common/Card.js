import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../assets/image/basic-profile-img-post.png";
import moreImage from "../../assets/image/icon-more-post.png";
import heartImage from "../../assets/image/icon-heart.png";
import heartClickImage from "../../assets/image/icon-heart-fill.png";
import commentImage from "../../assets/image/icon-comment.png";
import API from "../../utils/api";
import PostImage from "../home/PostImage";
import Modal from "./Modal";

const smallFont = css`
  font-size: ${(props) => props.theme.smallFontSize};
  color: ${(props) => props.theme.darkLightColor};
`;

const CardHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
`;

const CardHeaderImage = styled.img`
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 50%;
  cursor: pointer;
`;

const CardHeaderStrong = styled.strong`
  font-size: ${(props) => props.theme.baseFontSize};
  font-weight: 500;
  padding-left: 1.5rem;
  cursor: pointer;
`;
const CardHeaderP = styled.p`
  ${smallFont}
  margin-top: 0.2rem;
  padding-left: 1.5rem;
  cursor: pointer;
  &::before {
    content: "@ ";
  }
`;
const CardHeaderButton = styled.button`
  margin-left: auto;
  padding: 0;
`;
const CardBodyUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.8rem;
  margin-left: 0.5rem;
`;
const CardBodySpan = styled.span`
  ${smallFont}
  vertical-align: middle;
  margin-left: 0.9rem;
`;
const CardBodyImage = styled.img`
  vertical-align: middle;
  width: 2rem;
  height: 2rem;
`;
const CardBodyP = styled.p`
  font-size: ${(props) => props.theme.baseFontSize};
  padding: 0 1.3rem;
`;
const CardBodyTime = styled.time`
  ${smallFont};
  display: flex;
  gap: 0.5rem;
  padding: 1.3rem;
`;

export default function Card({ post, setFeed, fullArray }) {
  const {
    author,
    content,
    image,
    hearted,
    heartCount,
    commentCount,
    createdAt,
    id,
  } = {
    ...post,
  };

  const navigate = useNavigate();
  const param = useParams();

  const { account } = useParams();

  const [heart, setHeart] = useState(hearted);
  const [heartCounting, setHeartCounting] = useState(heartCount);
  const [homeModal, setIsHomeModal] = useState(false);
  const [postModal, setIsPostModal] = useState(false);
  const [myAccountname, setMyAccountname] = useState();

  const getMyAccountname = async () => {
    const response = await API.get("/user/myinfo", {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const result = await response.data;
    const myId = await result.user.accountname;

    setMyAccountname(myId);
  };

  useEffect(() => {
    getMyAccountname();
  }, []);

  const heartButtonClick = async () => {
    if (heart) {
      setHeart(false);
      setHeartCounting(heartCounting - 1);
      const response = await API.delete(`/post/${id}/unheart`, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      });

      return response;
    }

    setHeart(true);
    setHeartCounting(heartCounting + 1);
    const response = await API.post(`post/${id}/heart`, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    });

    return response;
  };
  const refineImageData = (filename) => {
    const url = filename.split(",");

    if (!filename) {
      return defaultImage;
    }

    if (url[0].includes("https://mandarin.api.weniv.co.kr")) {
      return url[0];
    } else {
      return `https://mandarin.api.weniv.co.kr/${url[0]}`;
    }
  };

  return (
    <>
      {post && myAccountname ? (
        <li>
          <CardHeaderDiv>
            <CardHeaderImage
              src={refineImageData(author.image)}
              onClick={() => navigate(`/${author.accountname}`)}
            />
            <div>
              <div>
                <CardHeaderStrong
                  onClick={() => navigate(`/${author.accountname}`)}
                >
                  {author.username}
                </CardHeaderStrong>
                <CardHeaderP onClick={() => navigate(`/${author.accountname}`)}>
                  {author.accountname}
                </CardHeaderP>
              </div>
            </div>
            <CardHeaderButton
              type="button"
              onClick={() => {
                account
                  ? setIsPostModal((prev) => !prev)
                  : setIsHomeModal((prev) => !prev);
              }}
            >
              <img src={moreImage} alt="설정" />
            </CardHeaderButton>
          </CardHeaderDiv>
          <PostImage image={image} />
          <CardBodyUl>
            <li style={{ width: "4rem" }}>
              <button type="button" onClick={heartButtonClick}>
                <CardBodyImage src={heart ? heartClickImage : heartImage} />
              </button>
              <CardBodySpan>{heartCounting}</CardBodySpan>
            </li>
            <li>
              <button
                onClick={() => {
                  param.id ? (
                    <></>
                  ) : (
                    navigate(`/${author.accountname}/post/${id}`)
                  );
                }}
              >
                <CardBodyImage
                  src={commentImage}
                  style={
                    param.id ? { cursor: "default" } : { cursor: "pointer" }
                  }
                />
              </button>

              <CardBodySpan style={{ transform: "translateY(-5%)" }}>
                {commentCount}
              </CardBodySpan>
            </li>
          </CardBodyUl>
          <CardBodyP>{content}</CardBodyP>
          <CardBodyTime dateTime={createdAt}>
            <span>{createdAt.slice(0, 4)}년</span>
            <span>{createdAt.slice(5, 7)}월</span>
            <span>{createdAt.slice(8, 10)}일</span>
          </CardBodyTime>
          {myAccountname === author.accountname ? (
            <>
              {!account ? (
                <Modal
                  isModal={setIsHomeModal}
                  modal={homeModal}
                  type="myhome"
                  postId={id}
                  accountname={author.accountname}
                  setFeed={setFeed}
                  fullArray={fullArray}
                />
              ) : (
                <Modal
                  isModal={setIsPostModal}
                  modal={postModal}
                  type="mypost"
                  postId={id}
                />
              )}
            </>
          ) : (
            <>
              {!account ? (
                <Modal
                  isModal={setIsHomeModal}
                  modal={homeModal}
                  type="otherpost"
                  postId={id}
                />
              ) : (
                <Modal
                  isModal={setIsPostModal}
                  modal={postModal}
                  type="otherpost"
                  postId={id}
                />
              )}
            </>
          )}
        </li>
      ) : (
        <></>
      )}
    </>
  );
}
