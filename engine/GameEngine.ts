import uuid from "uuid/v1";
import Game from "./models/GameModel";
import Player from "./models/PlayerModel";

export default class GameEngine {
    public game: Game;

    public StartGame(): object {
        const randomNumber = Math.random();
        let player;

        if (randomNumber > 0.5) {
            player = "x";
        } else {
            player = "o";
        }

        this.game = new Game(uuid(), player, [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
        return { id: this.game.id, firstplayer: this.game.nextPlayer };
    }

    public CountRound(player: Player, id: string): object {
        // Confere se é a partida certa
        if (this.game.id !== id) return { msg: "Partida não encontrada" };

        // Confere se é o jogador certo
        if (this.game.nextPlayer !== player.player) return { msg: "Não é turno do jogador" };

         // Pega a posição para adicionar a letra
        const pos = this.MovementUpdate(player.position.x, player.position.y);
        
        // Testa se já tem letra na posição
        if (this.game.gameArray[pos] === "x" || this.game.gameArray[pos] === "o") return { msg: "Já foi feita uma jogada nesta posição" };
        
        // Testa se a posição é válida
        if (pos > 8) return { msg: "Posição inválida " };

        // Adiciona a letra na posição
        this.game.gameArray[pos] = player.player;

        //Reduz número de rodadas possíveis
        this.game.turns --;

        // Troca de player depois da jogada
        if (this.game.nextPlayer === "x") {
            this.game.nextPlayer = "o";
        } else { this.game.nextPlayer = "x"; }

        return this.TestRound(player.player);
    }

    public TestRound(l: string): object {
        if (this.game.gameArray[0] === l && this.game.gameArray[3] === l && this.game.gameArray[6] === l ||
            this.game.gameArray[1] === l && this.game.gameArray[4] === l && this.game.gameArray[7] === l ||
            this.game.gameArray[2] === l && this.game.gameArray[5] === l && this.game.gameArray[8] === l ||
            this.game.gameArray[0] === l && this.game.gameArray[1] === l && this.game.gameArray[2] === l ||
            this.game.gameArray[3] === l && this.game.gameArray[4] === l && this.game.gameArray[5] === l ||
            this.game.gameArray[6] === l && this.game.gameArray[7] === l && this.game.gameArray[8] === l ||
            this.game.gameArray[0] === l && this.game.gameArray[4] === l && this.game.gameArray[8] === l ||
            this.game.gameArray[2] === l && this.game.gameArray[4] === l && this.game.gameArray[6] === l) {
                return { status: "Partida finalizada", winner: l };
        }
        else if (this.game.turns <= 0) return { status: "Partida finalizada", winner: "Draw" }
        else { return { status: "Ninguém ganhou ainda !" }; }
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

    public ShowTikTakToe(): object {
        if (this.game != null) {
        return { id: this.game.id,
        turn: this.game.nextPlayer,
        lastTurns: this.game.turns,
        table1: this.game.gameArray[0] + "|" + this.game.gameArray[1] + "|" + this.game.gameArray[2],
        table2: this.game.gameArray[3] + "|" + this.game.gameArray[4] + "|" + this.game.gameArray[5],
        table3: this.game.gameArray[6] + "|" + this.game.gameArray[7] + "|" + this.game.gameArray[8]};
        }
        else return { msg: "Nenhum jogo criado" };
    }
}
