import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setIsLogin } from "../store/index";

axios.defaults.withCredentials = true;

interface Props {
  text: string;
}

function Home({ text }: Props) {
  const isLogin = useSelector((state: RootState) => state.isLogin);
  const dispatch = useDispatch();

  const getAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://test.v-ting.net/session",
        {
          user_id: "test@yof.com",
          password: "1234",
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(setIsLogin(true));
        console.log("로그인에 성공하셨습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const logOut = () => {
  //   dispatch(setIsLogin(false));
  //   console.log("로그아웃 되었습니다", isLogin);
  // };

  const logOut = async () => {
    try {
      const response = await axios.({
        method: "get", // 통신 방식
        url: "https://test.v-ting.net/session", // 서버
        headers: { withCredentials: true } // 요청 헤더 설정
      });

      if (response.status === 200) {
        dispatch(setIsLogin(false));
        console.log("로그아웃에 성공하셨습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const test = async () => {
    try {
      const response = await axios({
        headers: {
          "Access-Control-Allow-Origin": "https://test.v-ting.net/",
          Accept: "application/json",
          "Content-Type": "application/json",
          Cache: "no-cache",
        },
        withCredentials: true,
        method: "get",
        url: "https://test.v-ting.net/",
      }).then((data) => console.log(data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {text}
      <button onClick={() => getAccessToken()}>login</button>
      <button onClick={() => logOut()}>logout</button>
      <button onClick={() => test()}>test</button>
    </div>
  );
}

Home.defaultProps = {
  text: "This is Home!",
};

export default Home;
