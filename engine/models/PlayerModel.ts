export default class Player {
    public id: string;
    public player: string;
    public position: {
        x: number,
        y: number;
    };

    constructor(id: string, player: string) {
        this.id = id;
        this.player = player;
    }
}