export default class Game {
    public id: string;
    public nextPlayer: string;
    public turns: number;
    public gameArray: string[];

    constructor(id: string, nextPlayer: string, gameArray: string[]) {
        this.id = id;
        this.turns = 9;
        this.nextPlayer = nextPlayer;
        this.gameArray = gameArray;
    }
}
