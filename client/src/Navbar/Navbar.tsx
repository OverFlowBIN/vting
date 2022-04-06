import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import Logo from "../assets/vt_logo_1.png";
import Profile from "../assets/yof_logo-17.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setIsLogin, setUserInfo } from "../store/index";
import axios from "axios";
import ProgressBar from "../Info/ProgressBar";

const serverURL: string = process.env.REACT_APP_SERVER_URL as string;

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [homeMode, setHomeMode] = useState(false);
  let location = useLocation();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  let isLoginState = useSelector((state: RootState) => state.isLogin);
  let loginState = isLoginState.login;

  useEffect(() => {
    NavbarUserInfo();
    // home 화면에서만 Vting 배너 출력
    if (location.pathname === "/") setHomeMode(true);
    else setHomeMode(false);
  }, [location]);

  const NavbarUserInfo = async () => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      await axios
        .get(`${serverURL}/auth`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            withCredentials: true,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            settingLogin();
            dispatch(
              setUserInfo({
                _id: res.data.data._id,
                nickname: res.data.data.nickname,
                email: res.data.data.user_id,
              })
            );
          } else {
            console.error("400 Error");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const settingLogin = () => {
    dispatch(setIsLogin(true));
  };

  const handleLogout = async () => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(serverURL + "/session", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          withCredentials: true,
        },
      });
      if (res.status === 200) {
        const token = res.data.data.accessToken;
        localStorage.setItem("accessToken", token);
        dispatch(setIsLogin(false));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      {homeMode ? <VotingBanner /> : ""}
      <div className="NavBar">
        <div className="NavLeft">
          <Link to="/">
            <img src={Logo} alt="logo" style={{ width: "140px" }} />
          </Link>
        </div>
        {loginState ? (
          <div className="NavRight">
            <Link className="nav-link link" to="/">
              Home
            </Link>
            <Link className="nav-link link" to="dashboard">
              Dashboard
            </Link>
            <Link className="nav-link link" to="new">
              Vote
            </Link>

            <div className="profile">
              <div>
                <img
                  src={userInfo.image}
                  alt="profile_img"
                  style={{ width: "60px", borderRadius: "50%" }}
                />

                <ul className="subMenu">
                  <div className="subMenuLi">
                    <div className="username">{userInfo.nickname} 님 🧡</div>
                    <Link className="nav-link link" to="myPage">
                      MyPage
                    </Link>
                    <div
                      className="nav-link link"
                      onClick={() => handleLogout()}
                    >
                      SingOut
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="NavRight">
            <Link className="nav-link link" to="/">
              Home
            </Link>
            <Link className="nav-link link" to="new">
              Vote
            </Link>
            <Link className="nav-link link" to="signIn">
              SignIn
            </Link>
          </div>
        )}
      </div>
      <ProgressBar />
    </div>
  );
}

function VotingBanner() {
  const [vtingCode, setVtingCode] = useState("");
  return (
    <div className="votingBannerCon">
      <div className="votingBanner">
        <div className="votingBannerText">Vting NOW!</div>
        <div className="votingBannerInput">
          <input
            type="text"
            placeholder="6자리 설문 코드를 입력하고 응답에 참여하세요!"
            value={vtingCode}
            onChange={(e) => setVtingCode(e.target.value)}
          ></input>
        </div>
        <a
          href={`${process.env.REACT_APP_CLIENT_URL}/${vtingCode}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>코드로 접속하기</button>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
