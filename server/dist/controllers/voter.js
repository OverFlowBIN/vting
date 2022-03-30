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
exports.VoterController = void 0;
const jwt = require("jsonwebtoken");
exports.VoterController = {
    test: {
        get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            res.send("voter test");
        }),
    },
    // 유형별 투표하기
    // bar => 해당 idx countup
    vote_page: {
        get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            res.send(req.params);
            // const accessCode = req.params;
            // console.log("accessCode", accessCode);
            // const findVote = await db.collection("vote").findOne({ url: accessCode });
            // if (findVote) {
            //   res.send("ok");
            // }
        }),
    },
};
