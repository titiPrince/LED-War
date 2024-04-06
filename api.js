import express from "express";
import { playGame } from "./Controllers/GameController.js";
const router = express.Router();

// Controllers
// const {} = require("./controllers/");

router.all("/", (req, res) => {
    res.send("pong");
});

router.get("/players", (req, res) => {
    res.json
});

router.post("/game", (req, res) => {
    res.json(playGame(req));
});

export default router;