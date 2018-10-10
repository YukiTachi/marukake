import { Model } from './Model.js';

export default class Main {

    constructor() {
        this.masu = [];
        this.createBoard();

        this.model = new Model();
    }

    createBoard() {
        for (let suzi = 1; suzi <= 3; suzi++) {
            for (let dan = 1; dan <= 3; dan++) {
                masu[suzi][dan];
            }
        }
        console.log(mazu);
    }
}