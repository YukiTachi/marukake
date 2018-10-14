import * as PIXI from "pixi.js";

export default class Histroy extends PIXI.Container {
    constructor(model) {
        super();
        this.model = model;
    }

    update() {
        this.removeChildren();

        let index = 0;
        for (let move of this.model.history) {
            const moveText = new PIXI.Text(
                `${move.turn}手目 ${move.move}${move.suzi}${move.dan}`,
                {
                    fontFamily: "Arial",
                    fontSize: "10pt",
                    fill: "white"
                }
            );
            moveText.x = 0;
            moveText.y = 10 + (20 * index);
            this.addChild(moveText);
            index++;
        }
      }
}
