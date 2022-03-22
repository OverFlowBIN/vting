"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const jwt = require("jsonwebtoken");
exports.default = {
    signup: {
        post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            // "user_id" : "test@yof.com",
            // "nickname" : "test",
            // "password" : "1234",
            // "image" : null,
            // "vote" : null,
            const { user_id, nickname, password, image, vote } = req.body;
            console.log(req.body);
            try {
                // default로 필요한 데이터 받아왔는지 확인 하여 데이터 DB에 넣어주기
                if (user_id && password && nickname) {
                    // 새로운 유저에 대한 데이터 추가 in db
                    __1.db.collection("user").insertOne({
                        user_id,
                        nickname,
                        password,
                        image,
                        vote,
                    });
                    // user_id을 playload에 담아 토큰 생성
                    const accessToken = jwt.sign({ user_id }, process.env.ACCESS_SECRET, {
                        expiresIn: "10h",
                    });
                    console.log("1", accessToken);
                    // user_id을 playload에 담은 토큰을 쿠키로 전달
                    res.cookie("accessToken", accessToken, {
                        sameSite: "None",
                    });
                    return res
                        .status(201)
                        .json({ data: req.body, message: "Successfully created" });
                }
                else {
                    return res.status(203).json({
                        data: null,
                        message: "Please fill in all required spaces",
                    });
                }
            }
            catch (_a) {
                return res.status(400).json({ message: "Bad request" });
            }
        }),
    },
    //   userInfo: {
    //     get: async (req: any, res: any) => {
    //       function getCookie(name: any) {
    //         let matches = req.headers.cookie.match(
    //           new RegExp(
    //             "(?:^|; )" +
    //               name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
    //               "=([^;]*)"
    //           )
    //         );
    //         return matches ? decodeURIComponent(matches[1]) : undefined;
    //       }
    //       const accessToken = getCookie("accessToken");
    //       const { user_id } = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    //       try {
    //         if (user_id) {
    //           const userInfo = await db
    //             .collection("user")
    //             .findOne({ user_id: user_id });
    //           if (!userInfo) {
    //             return res.status(203).json({ message: "Bad request" });
    //           } else {
    //             return res.status(200).json({
    //               data: userInfo,
    //               message: "Success. you can get your informations",
    //             });
    //           }
    //         }
    //       } catch {
    //         return res.status(400).json({ message: "Bad request" });
    //       }
    //     },
    //   },
};
