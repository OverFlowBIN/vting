import React, { useEffect } from "react";
import "./Info.scss";
import AOS from "aos";
import "aos/dist/aos.css";

import Home from "../assets/1_vote_in_home_700.gif";
import Created from "../assets/2_created_vote_700.gif";
import SNS from "../assets/3_copy_share_600.gif";
import Result from "../assets/4_realtime_result_600.gif";
import Delete from "../assets/5_delete_dashboard_600.gif";
import Profile from "../assets/6_change_profile_600.gif";
import VoteCode from "../assets/7_voting_show_result_600.gif";
import NonMembers from "../assets/13_non_member_600.gif";
import { FaRegCheckSquare } from "react-icons/fa";
import { BiPoll, BiChat, BiCloud, BiHorizontalCenter } from "react-icons/bi";
import Created_Vote from "./Created_Vote";
import Smile from "../assets/vt_smile.png";

function Info() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="info_container">
      <div
        className="info_wrap"
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
      >
        <div className="info_vote_home">
          <div className="info_vote_home_title">
            <h1>다양한 설문에 참여하여 사람들과 의견을 나눠보세요.</h1>
          </div>
          <div className="wrap">
            <div
              className="info_vote_home_wrap"
              data-aos="fade-left"
              data-aos-anchor-placement="bottom-bottom"
            >
              <img
                className="info_vote_home_img"
                src={Home}
                alt="vote_in_Home"
              />
              <div className="info_vote_home_desc">
                <div className="info_vote_home_desc_title">
                  <h1>흥미돋는 설문을 찾아볼까요?</h1>
                </div>
                <p>
                  <FaRegCheckSquare /> 요즘 뜨는 설문을 찾을 수 있어요.
                </p>
                <p>
                  <FaRegCheckSquare /> 개성있는 설문을 찾을 수 있어요.
                </p>
                <p>
                  <FaRegCheckSquare /> 슬라이드로 원하는 설문을 찾을 수 있어요.
                </p>
                <p>
                  <FaRegCheckSquare /> 클릭만으로 간단하게 설문에 응답할 수
                  있어요.
                </p>
                <p>
                  <FaRegCheckSquare /> 설문 결과를 실시간으로 확인할 수 있어요.
                </p>
              </div>
            </div>
          </div>
          <div className="wrap">
            <div
              className="info_vote_home_wrap"
              data-aos="fade-left"
              data-aos-anchor-placement="bottom-bottom"
            >
              <img
                className="info_vote_home_img"
                src={Created}
                alt="created_vote"
              />
              <div className="info_vote_home_desc">
                <div className="info_vote_home_desc_title">
                  <h1>나만의 설문을 만들어보세요.</h1>
                </div>
                <p>
                  <FaRegCheckSquare /> 빠르고 쉽게 설문을 만들 수 있어요.
                </p>
                <p>
                  <FaRegCheckSquare /> 원하는 설문 옵션을 적용할 수 있어요.
                </p>
                <p>
                  <FaRegCheckSquare /> 설문 생성을 완료했다면, 주변 사람들에게
                  공유해보세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="info_vote_category">
          <div className="info_vote_category_title">
            <h1>여러가지 스타일의 설문을 만들어보세요.</h1>
          </div>

          <div className="vote_category">
            <div className="icon_wrap">
              <div className="icon_img">
                <BiPoll
                  className="vertical_graph_icon"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </div>
              <div className="icon_desc">
                <p>
                  선택지가 너무 많아 <br />뭘 골라야 할지 고민이 되나요? <br />
                  객관식 설문으로 <br /> 미리 선택지를 설정하고 <br /> 설문을
                  통해 순위를 가려보세요.
                </p>
              </div>
            </div>
            <div className="icon_wrap">
              <div className="icon_img">
                <BiPoll className="horizontal_graph_icon" />
              </div>
              <div className="icon_desc">
                <p>
                  답이 나오지 않을 때는 <br />
                  고개를 오른쪽으로 꺾어서 <br /> 바라보세요.
                  <br />
                  형태를 바꾸는 것이 결과 도출에 <br />
                  도움이 되기도 한답니다.
                </p>
              </div>
            </div>
            <div className="icon_wrap">
              <div className="icon_img">
                <BiHorizontalCenter className="versus_icon" />
              </div>
              <div className="icon_desc">
                <p>
                  당신은 고양이파? 혹은 강아지파? <br /> 원수는 외나무다리에서!{" "}
                  <br />
                  피할 수 없는 숙명의 양자대결이 <br /> 있을 때에는 대결형
                  설문으로 <br /> 우위를 가려보세요.
                </p>
              </div>
            </div>
            <div className="icon_wrap">
              <div className="icon_img">
                <BiChat className="chat_icon" />
              </div>
              <div className="icon_desc">
                <p>
                  때로는 답을 정해놓지 않고 <br /> 다양한 의견을 받는 것도{" "}
                  <br />
                  도움이 될거에요. <br /> 짧은 단어부터 긴 문장까지 <br /> 사용
                  가능한 주관식 형태로 <br /> 의견을 들어보세요.
                </p>
              </div>
            </div>
            <div className="icon_wrap">
              <div className="icon_img">
                <BiCloud className="cloud_icon" />
              </div>
              <div className="icon_desc">
                <p>
                  많은 호응을 받은 단어를 <br /> 더 강조할 수 있는 방법은
                  없을까요? <br /> 워드클라우드가 <br /> 여러분들을
                  도와줄거에요.
                  <br /> 답변의 형태를 더 재미있고 <br />
                  아름답게 만들어보세요.
                </p>
              </div>
            </div>
          </div>
          <Created_Vote />
        </div>

        <div
          className="info_vting_option"
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
        >
          <div className="info_vote_nonmember_title">
            <h1> V-ting은 모두에게 다양한 기능을 제공합니다.</h1>
          </div>
          <div className="info_nonmember_option">
            <div className="info_nonmember_option_item">
              <img
                className="info_nonmember_option_img"
                src={VoteCode}
                alt="vote_code_result"
              />
              <div className="info_nonmember_option_desc">
                <div className="info_nonmember_option_desc_title">
                  <h2>쉽고 간편하게 설문에 참여할 수 있어요.</h2>
                </div>
                <p>코드를 입력하여 해당 설문에 참여하세요.</p>
              </div>
            </div>

            <div className="info_nonmember_option_item">
              <div className="img_size">
                <img
                  className="info_nonmember_option_img"
                  src={Result}
                  alt="realtime_vote_result"
                />
              </div>
              <div className="info_nonmember_option_desc">
                <div className="info_nonmember_option_desc_title">
                  <h2>내가 만든 설문의 접속방법과 결과를 확인하세요.</h2>
                </div>
                <p>공개여부와 진행여부를 곧바로 변경할 수 있어요.</p>
                <p>설문결과를 실시간으로 확인할 수 있어요.</p>
              </div>
            </div>
          </div>

          <div className="info_nonmember_option">
            <div className="info_nonmember_option_item">
              <img
                className="info_nonmember_option_img"
                src={SNS}
                alt="copy_and_SNS_share"
              />
              <div className="info_nonmember_option_desc">
                <div className="info_nonmember_option_desc_title">
                  <h2>여러가지 방법으로 설문을 알려보세요.</h2>
                </div>
                <p>카카오톡 공유하기를 이용해보세요.</p>
                <p>QR code를 통해 모바일 접속이 가능합니다.</p>
                <p>URL 주소를 복사하여 주변 사람들에게 공유해보세요.</p>
                <p>메인페이지 상단에서 코드번호를 입력하면 접속할 수 있어요.</p>
              </div>
            </div>

            <div className="info_nonmember_option_item">
              <img
                className="info_nonmember_option_img"
                src={NonMembers}
                alt="non_Members"
              />
              <div className="info_nonmember_option_desc">
                <div className="info_nonmember_option_desc_title">
                  <h2>V-ting은 비회원에게도 다양한 기능을 제공합니다.</h2>
                </div>
                <p>V-ting은 언제나 열려있답니다.</p>
                <p>임시 비밀번호 설정을 통해 설문을 만들 수 있어요.</p>
                <p>앗! 유효시간은 60분입니다 시간이 지나면 사라져요.</p>
              </div>
            </div>
          </div>

          <div className="info_vote_member_title">
            <h1>회원가입을 통해 V-ting에서 제공하는 특별한 혜택을 누리세요.</h1>
          </div>

          <div className="info_member_option">
            <div
              className="info_member_option_item"
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
            >
              <img
                className="info_member_option_img"
                src={Delete}
                alt="delete_at_Dashboard"
              />
              <div className="info_member_option_desc">
                <div className="info_member_option_desc_title">
                  <h2>대시보드</h2>
                </div>
                <p>내가 생성한 설문들을 확인할 수 있어요.</p>
                <p>설문들의 옵션을 간편하게 수정/삭제 할 수 있어요.</p>
              </div>
            </div>

            <div
              className="info_member_option_item"
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
            >
              <img
                className="info_member_option_img"
                src={Profile}
                alt="change_profile_image"
              />
              <div className="info_member_option_desc">
                <div className="info_member_option_desc_title">
                  <h2>프로필 이미지</h2>
                </div>
                <p>
                  회원정보 수정 페이지에서 원하는 프로필 이미지를 설정할 수
                  있어요.
                </p>
                <p>
                  생성한 설문페이지에서 적용된 내 프로필을 확인할 수 있어요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="info_move_to_new">
        <img src={Smile} alt="Smile" style={{ width: "300px" }} />

        <Created_Vote />
      </div>
    </div>
  );
}

export default Info;
