import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import API from "../utils/api";
import Header from "../components/style/Header";
import NavBar from "../components/style/NavBar";
import ProfileInformation from "../components/profile/ProfileInformation";
import SortButtons from "../components/profile/SortButtons";

import Cards from "../components/common/Cards";
import GridCards from "../components/profile/GridCards";
import Modal from "../components/common/Modal";

const ProfilePagePostDiv = styled.div`
  height: 34.8rem;
`;

export default function ProfilePage() {
  const [myProfile, setMyProfile] = useState({});
  const [myPostData, setMyPostData] = useState({});
  const [listClick, setListClick] = useState(false);
  const [albumClick, setAlbumClick] = useState(true);

  const { account } = useParams();

  const getProfile = async () => {
    try {
      const res = await API.get("/user/myinfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const user = res.data.user;

      setMyProfile(user);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  };

  const getPost = async () => {
    try {
      const res = await API.get(`/post/${account}/userpost`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const post = res.data;

      setMyPostData(post);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getProfile();
    getPost();
  }, []);

  // console.log(myPostData.post);

  return (
    <div>
      <Header type="profile" />
      <ProfileInformation {...myProfile} />
      <SortButtons
        listClick={listClick}
        setListClick={setListClick}
        albumClick={albumClick}
        setAlbumClick={setAlbumClick}
      />
      <ProfilePagePostDiv>
        {listClick === true && albumClick === false ? (
          <Cards feed={myPostData.post} />
        ) : (
          <GridCards postData={myPostData.post} />
        )}
      </ProfilePagePostDiv>
      <Modal type="myprofile" />
      <NavBar type="프로필" />
    </div>
  );
}
