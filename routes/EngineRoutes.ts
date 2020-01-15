import express from "express";
import Player from "../engine/models/PlayerModel";
import GameEngine from "../engine/GameEngine";

const app = express();
const game = new GameEngine();

app.post("/", async (req: any, res: any) => {
    try {
        res.send(game.StartGame());

        res.status(200);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

app.post("/:id/movement", async (req: any, res: any) => {
    try {
        var player: Player;
        player = req.body;

        res.send(game.CountRound(player, req.params.id));

        res.status(200);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

app.get("/show", async (req: any, res: any) => {
    try {
        res.send(game.ShowTikTakToe());

        res.status(200);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

export default app;
