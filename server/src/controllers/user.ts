import { db } from "..";
import jwt from "jsonwebtoken";
import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import { IncomingHttpHeaders, request } from "http";
import { AnyMxRecord } from "dns";
import dotenv from "dotenv";
import { isRegExp } from "util/types";
import { hash } from "bcryptjs";
dotenv.config();

const SALT_ROUNDS = 6;
const bcrypt = require("bcrypt");

// const clientID = process.env.GITHUB_CLIENT_ID;
// const clientSecret = process.env.GITHUB_CLIENT_SECRET;
// const axios = require("axios");

// export default {
//   post: async (req: Request, res: Response) => {
//     const { email } = req.body;

//     try {
//       if (email) {
//         const accessToken = jwt.sign({ email }, process.env.ACCESS_SECRET, {
//           expiresIn: "10h",
//         });

//         console.log("1", accessToken);

//         // email을 playload에 담은 토큰을 쿠키로 전달

//         res.cookie("accessToken", accessToken, {
//           sameSite: "none",
//         });

//         return res.status(200).send("OK");
//       }
//     } catch {
//       return res.status(400).send("NOT OK");
//     }
//   },
// };

interface UserType {
  user_id: string;
  nickname: string;
  password: string;
  image?: string;
  vote?: string[];
}

interface UserController {
  userCheck: { post: any };
  // passwordCheck: { post: any };
  signup: { post: any };
  // oauth: { post: any };
  resign: { delete: any };
  userInfo: { get: any; patch: any };
}

export let UserController = {
  //회원가입과 탈퇴시 모두 사용가능한 체크
  userCheck: {
    post: async (
      req: Request & { body: { user_id?: string; password?: string } },
      res: Response
    ) => {
      try {
        const { user_id, password } = req.body;

        if (user_id) {
          const findUserWithId = await db
            .collection("user")
            .findOne({ user_id: user_id });

          if (!findUserWithId) {
            return res.status(200).json({
              message: "It doesn't match",
            });
          } else {
            return res.status(200).json({
              message: "Success verified",
            });
          }
        } else if (password) {
          function getCookie(name: any) {
            let matches = req.headers.cookie.match(
              new RegExp(
                "(?:^|; )" +
                  name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                  "=([^;]*)"
              )
            );

            return matches ? decodeURIComponent(matches[1]) : undefined;
          }

          const accessToken = getCookie("accessToken");

          const decoded = jwt.verify(
            accessToken as string,
            process.env.ACCESS_SECRET as jwt.Secret
          );

          const findUserWithPw = await db
            .collection("user")
            .findOne({ user_id: decoded.user_id } && { password: password });

          if (!findUserWithPw) {
            return res.status(200).json({
              message: "It doesn't match",
            });
          } else {
            return res.status(200).json({
              message: "Success verified",
            });
          }
        }
      } catch {
        return res.status(400).json({ message: "Bad Request" });
      }
    },
  },

  signup: {
    post: async (req: Request & { body: UserType }, res: Response) => {
      const { user_id, nickname, password, image, vote } = req.body;

      try {
        if (user_id && password && nickname) {
          bcrypt.genSalt(SALT_ROUNDS, function (err: Error, salt: string) {
            if (err) {
              console.log("genSalt Error: " + err);
            } else {
              console.log("salt", salt);
              //genearte hash on separate function calls):
              var hashed = bcrypt.hash(
                password,
                salt,
                function (err: Error, hash: string) {
                  console.log("hash", hash);
                  db.collection("user").insertOne({
                    user_id: req.body.user_id,
                    nickname: req.body.nickname,
                    password: hash,
                    image: req.body.image,
                    vote: req.body.vote,
                  });
                  if (err) {
                    console.log("bycrpt hash method error : ", err.message);
                  } else {
                  }
                }
              );
            }
          });
          // user_id을 playload에 담아 토큰 생성
          const accessToken = jwt.sign(
            { user_id },
            process.env.ACCESS_SECRET as jwt.Secret,
            {
              expiresIn: 60 * 60,
            }
          );

          // user_id을 playload에 담은 토큰을 쿠키로 전달
          res.cookie("accessToken", accessToken, {
            sameSite: "none",
            secure: true,
          });

          let findUserId = await db
            .collection("user")
            .findOne({ user_id: req.body.user_id });
          console.log(findUserId);
          return res.status(201).json({
            data: {
              _id: findUserId._id,
              user_id: req.body.user_id,
              nickname: req.body.nickname,
              image: req.body.image,
              vote: req.body.vote,
            },
          });
        } else {
          return res.status(203).json({
            data: null,
            message: "Please fill in all required spaces",
          });
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Sign up failed" });
      }
    },
  },

  // oauth.post,

  resign: {
    delete: async (req: Request, res: Response) => {
      // FIXME: 만약토큰으로 작업하면 이 부분으로 작업하기
      function getCookie(name: string) {
        let matches = req.headers.cookie.match(
          new RegExp(
            "(?:^|; )" +
              name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
              "=([^;]*)"
          )
        );

        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      const accessToken = getCookie("accessToken");
      const decoded = jwt.verify(
        accessToken as string,
        process.env.ACCESS_SECRET as jwt.Secret
      );

      try {
        // 유저 정보 삭제하기
        await db.collection("user").deleteOne({ user_id: decoded.user_id });
        // 쿠키에 토큰 삭제하기
        await res.clearCookie("accessToken", {
          sameSite: "none",
          secure: true,
        });
        return res
          .status(200)
          .json({ message: "Successfully account deleted" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Bad request" });
      }
    },
  },

  userInfo: {
    get: async (req: Request, res: Response) => {
      function getCookie(name: any) {
        let matches = req.headers.cookie.match(
          new RegExp(
            "(?:^|; )" +
              name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
              "=([^;]*)"
          )
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

      const accessToken = getCookie("accessToken");

      const decoded = jwt.verify(
        accessToken as string,
        process.env.ACCESS_SECRET as jwt.Secret
      );

      try {
        const findUser = await db
          .collection("user")
          .findOne({ user_id: decoded.user_id });
        if (findUser) {
          return res.status(200).json({
            data: {
              _id: findUser._id,
              nickname: findUser.nickname,
              user_id: findUser.user_id,
              image: findUser.image,
              vote: findUser.vote,
            },
          });
        } else {
          return res.status(400).json({ message: "Bad request" });
        }
      } catch (err) {
        console.log(err);
      }
    },

    patch: async (
      req: Request & {
        body: { nickname?: string; password?: string; image?: string };
      },
      res: Response
    ) => {
      const { nickname, password, image } = req.body;

      function getCookie(name: string) {
        let matches = String(req.headers.cookie).match(
          new RegExp(
            "(?:^|; )" +
              name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
              "=([^;]*)"
          )
        );

        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      const accessToken = getCookie("accessToken");
      const decoded = jwt.verify(
        accessToken as string,
        process.env.ACCESS_SECRET as jwt.Secret
      );

      try {
        const findUser = await db
          .collection("user")
          .findOne({ user_id: decoded.user_id });
        await db.collection("user").updateOne(
          { user_id: decoded.user_id },

          //바디가 들어온것만 바꿈
          {
            $set: {
              nickname: req.body.nickname || findUser.nickname,
              image: req.body.image || findUser.image,
              password: req.body.password || findUser.password,
            },
          }
        );

        return res.status(200).json({ message: "Successfully updated" });
      } catch {
        return res.status(400).json({ message: "Bad request" });
      }
    },
  },
};
