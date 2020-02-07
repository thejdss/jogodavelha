import uuid from "uuid/v1";
import Game from "./models/GameModel";
import Player from "./models/PlayerModel";

export default class GameEngine {
    private static instance: GameEngine;
    public games: Game[] = [];

    public static getInstance(): GameEngine {
        if (!GameEngine.instance) {
            GameEngine.instance = new GameEngine();
        }
        return GameEngine.instance;
    }

    public StartGame(): object {
        const randomNumber = Math.random();
        let player;

        if (randomNumber > 0.5) {
            player = "x";
        } else {
            player = "o";
        }

        const newGame = new Game(uuid(), player, [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
        this.games.push(newGame);

        return { id: newGame.id, firstplayer: newGame.nextPlayer };
    }

    public CountRound(player: Player, id: string): object {
        for (let index = 0; index < this.games.length; index++) {
            if (this.games[index].id === id) {
                // Confere se é o jogador certo
                if (this.games[index].nextPlayer !== player.player) return { msg: "Não é turno do jogador" };

                // Pega a posição para adicionar a letra
                const pos = this.MovementUpdate(player.position.x, player.position.y);
        
                // Testa se já tem letra na posição
                if (this.games[index].gameArray[pos] === "x" || this.games[index].gameArray[pos] === "o") return { msg: "Já foi feita uma jogada nesta posição" };
        
                // Testa se a posição é válida
                if (pos > 8) return { msg: "Posição inválida " };

                // Adiciona a letra na posição
                this.games[index].gameArray[pos] = player.player;

                //Reduz número de rodadas possíveis
                this.games[index].turns --;

                // Troca de player depois da jogada
                if (this.games[index].nextPlayer === "x") {
                    this.games[index].nextPlayer = "o";
                } else { this.games[index].nextPlayer = "x"; }

                return this.TestRound(this.games[index], player.player, index);
            }
        }
        return { msg: "Essa partida não existe" };
    }

    public TestRound(game: Game, l: string, index: number): object {
        if (game.gameArray[0] === l && game.gameArray[3] === l && game.gameArray[6] === l ||
            game.gameArray[1] === l && game.gameArray[4] === l && game.gameArray[7] === l ||
            game.gameArray[2] === l && game.gameArray[5] === l && game.gameArray[8] === l ||
            game.gameArray[0] === l && game.gameArray[1] === l && game.gameArray[2] === l ||
            game.gameArray[3] === l && game.gameArray[4] === l && game.gameArray[5] === l ||
            game.gameArray[6] === l && game.gameArray[7] === l && game.gameArray[8] === l ||
            game.gameArray[0] === l && game.gameArray[4] === l && game.gameArray[8] === l ||
            game.gameArray[2] === l && game.gameArray[4] === l && game.gameArray[6] === l) {
                this.games.splice(index, 1);
                return { status: "Partida finalizada", winner: l };
        } else if (game.turns <= 0) {
            this.games.splice(index, 1);
            return { status: "Partida finalizada", winner: "Draw" }
        } else { return { status: "Ninguém ganhou ainda !" }; }
    }

    public MovementUpdate(x: number, y: number): number {
        if (x === 0 && y === 0) {
            return 6;
        } else if (x === 0 && y === 1) {
            return 3;
        } else if (x === 0 && y === 2) {
            return 0;
        } else if (x === 1 && y === 0) {
            return 7;
        } else if (x === 1 && y === 1) {
            return 4;
        } else if (x === 1 && y === 2) {
            return 1;
        } else if (x === 2 && y === 0) {
            return 8;
        } else if (x === 2 && y === 1) {
            return 5;
        } else if (x === 2 && y === 2) {
            return 2;
        } else { return 9; }
    }

    public ShowTikTakToe(id: string): object {
        for (let index = 0; index < this.games.length; index++) {
            if (this.games[index].id === id) {
                return {
                    id: this.games[index].id,
                    turn: this.games[index].nextPlayer,
                    lastTurns: this.games[index].turns,
                    table1: this.games[index].gameArray[0] + "|" + this.games[index].gameArray[1] + "|" + this.games[index].gameArray[2],
                    table2: this.games[index].gameArray[3] + "|" + this.games[index].gameArray[4] + "|" + this.games[index].gameArray[5],
                    table3: this.games[index].gameArray[6] + "|" + this.games[index].gameArray[7] + "|" + this.games[index].gameArray[8]};
            }
        }
        return { mgs: "Nenum jogo criado " };
    }

    public GetGame(id: string): object {
        for (let index = 0; index < this.games.length; index++) {
            if (this.games[index].id === id) {
                return {
                    game: this.games[index].gameArray
                };
            }
        }
    }
}
