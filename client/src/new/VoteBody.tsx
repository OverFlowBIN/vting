import React from "react";
import VotePreview from "./VotePreview";
import VoteMaker from "./VoteMaker";
import "./new.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import { useAlert } from "react-alert";
import axios from "axios";

function VoteBody() {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const newVote = useSelector((state: RootState) => state.makeNewVote);
  const isLogin = useSelector((state: RootState) => state.isLogin);
  const newVoteFormat = newVote.format;

  const alert = useAlert();

  const serverURL = "http://localhost:8000";

  const sendNewVote = async () => {
    const sendBody = loginVoteBody();
    console.log(userInfo);
    console.log(sendBody);
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.post(serverURL + "/vting", sendBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          withCredentials: true,
        },
      });
      if (res.status === 201) {
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loginVoteBody = () => {
    let sendVoteBody = {};

    if (isLogin.login) {
      switch (newVoteFormat) {
        case "bar":
          sendVoteBody = {
            title: newVote.title,
            format: newVote.format,
            type: newVote.type,
            items: newVote.items,
            manytimes: newVote.manytimes,
            multiple: newVote.multiple,
            user_id: userInfo.email,
          };
          return sendVoteBody;
        case "open":
          sendVoteBody = {
            title: newVote.title,
            format: newVote.format,
            manytimes: newVote.manytimes,
            user_id: userInfo.email,
          };
          return sendVoteBody;
        case "versus":
          sendVoteBody = {
            title: newVote.title,
            format: newVote.format,
            items: newVote.items,
            manytimes: newVote.manytimes,
            multiple: newVote.multiple,
            user_id: userInfo.email,
          };
          return sendVoteBody;
        case "word":
          sendVoteBody = {
            title: newVote.title,
            format: newVote.format,
            manytimes: newVote.manytimes,
            user_id: userInfo.email,
          };
          return sendVoteBody;
        default:
          console.log("오류 발생 : 투표 포맷이 선택되지 않음");
          return;
      }
    } else {
      alert.show();
    }
  };

  if (newVoteFormat) {
    return (
      <div className="vote-body">
        <div className="vote-making">
          <VoteMaker />
          <VotePreview />
        </div>
        <div className="vote-button">
          <button className="vtingButton" onClick={() => sendNewVote()}>
            투표 생성하기
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="vote-body">
        <div className="vote-making">
          <VoteMaker />
          <VotePreview />
        </div>
      </div>
    );
  }
}

export default VoteBody;
