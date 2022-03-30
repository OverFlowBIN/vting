"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");


const voter_1 = require("../controllers/voter");
const router = (0, express_1.Router)();
// router.post("/", controller.post);
router.get("/test", voter_1.VoterController.test.get);
router.get("/:access-code", voter_1.VoterController.vote_page.get);
// router.delete("/:id", VoterController.delete.delete);
// router.patch("/:id", VoterController.undergoing.patch);

exports.default = router;
