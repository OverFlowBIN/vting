import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, setIsLogin, setUserInfo } from "../store/index";
import "./SignIn.scss";

import Logo from "../assets/v-ting_logo_circle.png";

import { LoginGoogle, LoginFacebook } from "./OauthLogin";


interface User {
  email: string;
  password: string;
}
interface CreateUser {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  image?: string;
}
interface InOrUp {
  signIn: boolean;
}


const serverURL: string = process.env.REACT_APP_SERVER_URL as string;


function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state: RootState) => state.userInfo);

  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [newUser, setNewUser] = useState<CreateUser>({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    image: "",
  });
  const [isMatch, setIsMatch] = useState<boolean>(false);

  useEffect(() => {
    if (newUser.password === newUser.passwordConfirm) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
    if (!user.email.length) {
      setUserCheck(true);
    }
    if (!user.password.length) {
      setUserPasswordCheck(true);
    }
    if (!newUser.email.length) {
      setAlreadyUser(false);
    }
  }, [
    newUser.password,
    newUser.passwordConfirm,
    user.email,
    newUser.email,
    user.password,
  ]);

  const [isServerOk, setIsServerOk] = useState<boolean>(true);
  const [inOrUp, setInOrUp] = useState<InOrUp>({ signIn: true });

  const setSignUp = () => {
    setInOrUp({ signIn: false });
  };

  const setSignIn = () => {
    setInOrUp({ signIn: true });
  };

  const isCloseModal = () => {
    navigate(-1);
  };

  const [userCheck, setUserCheck] = useState<boolean>(true);
  const [alreadyUser, setAlreadyUser] = useState<boolean>(false);
  const [userPasswordCheck, setUserPasswordCheck] = useState<boolean>(true);

  const [loginOkModal, setLoginOkModal] = useState<boolean>(false);

  const LogInUser = async () => {
    await axios
      .post(serverURL + "/session", {
        user_id: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
          const userInfo = res.data.data.user_data;
          setUserCheck(true);
          setUserPasswordCheck(true);
          dispatch(setIsLogin(true));
          dispatch(
            setUserInfo({
              _id: userInfo._id,
              nickname: userInfo.nickname,
              email: userInfo.user_id,
              image: userInfo.image,
            })
          );
          setLoginOkModal(true);
        }
      })
      .catch((err) => {
        if (err.response.data.message === "There's no ID") {
          setUserCheck(false);
        } else if (err.response.data.message === "Wrong password") {
          setUserPasswordCheck(false);
        } else if (err.response.data.status === 400) {
          setIsServerOk(false);
        }
      });
  };

  const [signUpOkModal, setSignUpOkModal] = useState<boolean>(false);
  const SignUpUser = async () => {
    try {
      await axios
        .post(`${serverURL}/user/check`, {
          user_id: newUser.email,
        })
        .then((data) => {
          if (data.status === 200 && data.data.message === "Success verified") {
            setAlreadyUser(true);
          }
          if (data.status === 200 && data.data.message === "It doesn't match") {
            axios
              .post(serverURL + "/user", {
                user_id: newUser.email,
                nickname: newUser.name,
                password: newUser.password,
              })
              .then((data) => {
                if (data.status === 201) {
                  const userInfo = data.data.data.user_data;
                  localStorage.setItem(
                    "accessToken",
                    data.data.data.accessToken
                  );
                  dispatch(setIsLogin(true));
                  dispatch(
                    setUserInfo({
                      _id: userInfo._id,
                      nickname: userInfo.nickname,
                      email: userInfo.user_id,
                      image: userInfo.image,
                    })
                  );
                  setSignUpOkModal(true);
                }
              });
          }
        });
    } catch (err) {
      setIsServerOk(false);
      console.log(err);
    }
  };

  // ? SignUp input onChanges
  const lonIn_onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const lonIn_onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // ? SignIn input onChanges
  const signUp_onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  const signUp_onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  const signUp_onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  const signUp_onChangePasswordConfirm = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // ! Validation
  const [nameValid, setNameValid] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const nameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsBlur(true);
    if (newUser.name.match(/^[\w\W???-??????-??????-???]{2,20}$/)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const [emailValid, setEmailValid] = useState(false);
  const [isEmailBlur, setIsEmailBlur] = useState(false);

  const emailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEmailBlur(true);
    if (
      newUser.email.match(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      )
    ) {
      setEmailValid(true);
    } else if (
      user.email.match(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      )
    ) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const [passwordValid, setPasswordValid] = useState(true);
  const [isPasswordBlur, setIsPasswordBlur] = useState(false);

  const passwordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsPasswordBlur(true);
    if (
      newUser.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/i
      )
    ) {
      setPasswordValid(true);
    } else if (
      user.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/i
      )
    ) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [newPasswordBlur, setNewPasswordBlur] = useState(false);

  const newPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    setNewPasswordBlur(true);
    if (
      newUser.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/i
      )
    ) {
      setNewPasswordValid(true);
    } else {
      setNewPasswordValid(false);
    }
  };

  return (
    <div>
      <main>
        {inOrUp.signIn ? (
          <div className="signIn_container">
            <div className="signIn_background">
              <div className="signIn_modal">
                <button onClick={() => isCloseModal()} className="closeBtn">
                  X
                </button>
                <div className="img_wrap">
                  <img src={Logo} alt="Logo" style={{ width: "200px" }} />
                </div>

                <div className="email_wrap">
                  <input
                    onBlur={emailBlur}
                    value={user.email}
                    placeholder="?????????(?????????)??? ???????????????."
                    name="email"
                    type="email"
                    onChange={lonIn_onChangeEmail}
                  />
                  {isEmailBlur && !emailValid && (
                    <div className="email Error">
                      ???????????? ????????? ??????????????????.
                    </div>
                  )}

                  {!userCheck && (
                    <div className="server Error">
                      ???????????? ?????? ??????????????????.
                    </div>
                  )}
                </div>

                <div className="password_wrap">
                  <input
                    onBlur={passwordBlur}
                    value={user.password}
                    placeholder="??????????????? ???????????????."
                    name="password"
                    type="password"
                    onChange={lonIn_onChangePassword}
                  />

                  {isPasswordBlur && !user.password && (
                    <div className="password Empty">
                      ??????????????? ??????????????????
                    </div>
                  )}
                  {isPasswordBlur && user.password && (
                    <div className="password Success"></div>
                  )}
                  {!isServerOk && (
                    <div className="server Error">
                      ???????????? ????????? ??????????????????.
                    </div>
                  )}
                  {!userPasswordCheck && (
                    <div className="server Error">??????????????? ???????????????.</div>
                  )}
                </div>

                <div className="btn_wrap">
                  <button className="logInBtn" onClick={() => LogInUser()}>
                    ?????????
                  </button>
                  <div className="oauth_wrap">
                    <div className="google-button" style={{ width: "100%" }}>
                      <LoginGoogle inOrUp="in" />
                    </div>
                    <div>
                      <LoginFacebook inOrUp="in" />
                    </div>
                  </div>
                  <button className="signUpBtn" onClick={() => setSignUp()}>
                    ?????? ????????? ????????????????
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="signUp_container">
            <div className="signUp_background">
              <div className="signUp_modal">
                <button onClick={() => isCloseModal()} className="closeBtn">
                  X
                </button>
                <div className="img_wrap">
                  <img src={Logo} alt="Logo" style={{ width: "200px" }} />
                </div>

                <input
                  placeholder="?????????"
                  onBlur={nameBlur}
                  id="name"
                  value={newUser.name}
                  name="name"
                  type="text"
                  onChange={signUp_onChangeName}
                />
                {isBlur && !nameValid && (
                  <div className="nickname Error">
                    ??????, ??????, ????????? ???????????? 2-10?????? ??????????????????
                  </div>
                )}
                {isBlur && nameValid && (
                  <div className="nickname Success"></div>
                )}

                <div className="email_wrap">
                  <input
                    placeholder="?????????(?????????)"
                    onBlur={emailBlur}
                    value={newUser.email}
                    id="email"
                    name="email"
                    type="email"
                    onChange={signUp_onChangeEmail}
                  />
                  {isEmailBlur && !emailValid && (
                    <div className="email Error">
                      ???????????? ????????? ??????????????????.
                    </div>
                  )}
                  {alreadyUser && (
                    <div className="server Error">
                      ?????? ????????? ??????????????????.
                    </div>
                  )}
                  {isEmailBlur && emailValid && (
                    <div className="email Success"></div>
                  )}
                </div>

                <div className="password_wrap">
                  <input
                    onBlur={newPassword}
                    value={newUser.password}
                    placeholder="????????????"
                    type="password"
                    name="password"
                    id="password"
                    onChange={signUp_onChangePassword}
                  />
                  {newPasswordBlur && !newPasswordValid && (
                    <div className="password Error">
                      ??????, ??????, ???????????? ?????? 8???????????? ??????????????????.
                    </div>
                  )}
                  {newPasswordBlur && newPasswordValid && (
                    <div className="password Success"></div>
                  )}
                </div>

                <input
                  placeholder="???????????? ??????"
                  value={newUser.passwordConfirm}
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  onChange={signUp_onChangePasswordConfirm}
                />

                {!isMatch && (
                  <div className="password Error">
                    ??????????????? ???????????? ????????????.
                  </div>
                )}

                {!isServerOk && (
                  <div className="server Error">
                    ???????????? ????????? ??????????????????.
                  </div>
                )}

                <div className="signUp_wrap">
                  {nameValid && emailValid && passwordValid ? (
                    <button className="signUp_btn" onClick={() => SignUpUser()}>
                      ???????????? ????????????
                    </button>
                  ) : (
                    <button className="signUp_no" disabled>
                      ???????????? ????????????
                    </button>
                  )}
                </div>

                <div className="oauth_wrap">
                  <div>
                    <LoginGoogle inOrUp="out" />
                  </div>

                  <div>
                    <LoginFacebook inOrUp="out" />
                  </div>

                </div>
                <button className="back_login" onClick={() => setSignIn()}>
                  ????????????????????? ????????????
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      {loginOkModal && (
        <div className="loginOkModal_container">
          <div className="loginOkModal_background">
            <div className="loginOkModal_modal">
              <button
                className="loginOkModal_closeBtn"
                onClick={() => setLoginOkModal(false)}
              >
                X
              </button>
              <div className="loginOkModal_desc">
                <h3>{userInfo.nickname}???, ????????????????????????.</h3>
              </div>
              <div className="loginOkModal_btnWrap">
                <button
                  className="loginOkModal_ok"
                  onClick={() => navigate(-1)}
                >
                  ??????
                </button>
                <button
                  className="loginOkModal_cancel"
                  onClick={() => setLoginOkModal(false)}
                >
                  ??????
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {signUpOkModal && (
        <div className="SignUpOkModal_container">
          <div className="SignUpOkModal_background">
            <div className="SignUpOkModal_modal">
              <button
                className="SignUpOkModal_closeBtn"
                onClick={() => setSignUpOkModal(false)}
              >
                X
              </button>
              <div className="SignUpOkModal_desc">
                <h3>{userInfo.nickname}???, ??????????????? ?????????????????????.</h3>
              </div>

              <div className="SignUpOkModal_btnWrap">
                <button
                  className="SignUpOkModal_ok"
                  onClick={() => navigate("/")}
                >
                  ??????
                </button>
                <button
                  className="SignUpOkModal_cancel"
                  onClick={() => setSignUpOkModal(false)}
                >
                  ??????
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
