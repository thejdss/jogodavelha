import express from "express";
import Player from "../engine/models/PlayerModel";
import GameEngine from "../engine/GameEngine";

const app = express();

app.post("/", async (req: any, res: any) => {
    try {
        res.send(GameEngine.getInstance().StartGame());

        res.status(200);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

app.post("/:id/movement", async (req: any, res: any) => {
    try {
        var player: Player;
        player = req.body;

        res.send(GameEngine.getInstance().CountRound(player, req.params.id));

        res.status(200);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

app.post("/show/:id", async (req: any, res: any) => {
    try {
        res.send(GameEngine.getInstance().ShowTikTakToe(req.params.id));

        res.status(200);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

export default app;
