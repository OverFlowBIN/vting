import { db } from "..";
import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import { IncomingHttpHeaders, request } from "http";
import { AnyMxRecord } from "dns";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isRegExp } from "util/types";
dotenv.config();

interface UserType {
  user_id: string;
  password: string;
}

interface SessionController {
  signIn: { post: any };
  signOut: { get: any };
}

export let SessionController = {
  signIn: {
    post: async (req: Request, res: Response) => {
      // 로그인을 위한 이메일, 패스워드 받기
      const { user_id, password }: UserType = await req.body;
      console.log("잘 들어오고 있는지 확인 ===>", user_id);

      try {
        const findUser = await db
          .collection("user")
          .findOne({ user_id: req.body.user_id, password: req.body.password });

        if (findUser) {
          const accessToken = jwt.sign(
            { name: user_id },
            process.env.ACCESS_SECRET as jwt.Secret,
            { expiresIn: 60 * 60 }
          );

          // user_id을 playload에 담은 토큰을 쿠키로 전달
          res.cookie("accessToken", accessToken, {
            sameSite: "none",
            secure: true,
            maxAge: 10000 * 24 * 6 * 60,
            httpOnly: false,
          });

          console.log("엑세스 토큰은 잘 생성되는지 확인 =====>", accessToken);

          return res.status(200).json({ message: "Successfully logged in" });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Bad request" });
      }
    },
  },

  // logout, clear cookie
  signOut: {
    get: async (req: Request, res: Response) => {
      // function getCookie(name: string) {
      //   let matches = req.headers.cookie.match(
      //     new RegExp(
      //       "(?:^|; )" +
      //         name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
      //         "=([^;]*)"
      //     )
      //   );
      //   return matches ? decodeURIComponent(matches[1]) : undefined;
      // }
      // const accessToken = getCookie("accessToken");
      // console.log("logged out", accessToken);
      // // const accessToken = req.get("accessToken");
      // const user_id = jwt.verify(
      //   accessToken as string,
      //   process.env.ACCESS_SECRET as jwt.Secret
      // );

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

      const user_id = jwt.verify(
        accessToken as string,
        process.env.ACCESS_SECRET as jwt.Secret
      );

      try {
        if (user_id) {
          res.clearCookie("accessToken", { sameSite: "none", secure: true });
          return res.status(200).json({ message: "Successfully logged out" });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Failed logged out" });
      }
    },
  },
};
