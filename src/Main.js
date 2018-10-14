import Model from "./Model.js";
import History from "./History.js";
import * as PIXI from "pixi.js";

export default class Main extends PIXI.Container {
  constructor() {
    super();

    this.model = new Model();
    //this.history;

    this.createHistory();
    this.creatBoard();
    this.createResetButton();
  }

  creatBoard() {
    for (let dan of Object.keys(this.model.board).map(Number)) {
      for (let suzi of Object.keys(this.model.board[dan]).map(Number)) {
        // console.log("suzi: " + suzi);
        // console.log("dan: " + dan);
        const gridStatus = this.model.board[suzi][dan];
        let grid = this.getGrid(suzi, dan);

        const resetRightToLeftSuzi = this.model.suzi.end - suzi;
        const space = 5;
        grid.position.x = resetRightToLeftSuzi * (grid.width + space);
        grid.position.y = (dan - 1) * (grid.height + space);
        this.addChild(grid);
      }
    }
  }

  getPutKoma() {
    let ret;
    if (this.model.isFirstMove()) {
      ret = this.getMaru();
    } else {
      ret = this.getBatu();
    }

    return ret;
  }

  getMaru() {
    const maruObj = new PIXI.Text("○", {
      fontFamily: "Arial",
      fontSize: "30pt",
      fontWeight: "bold",
      fill: "white"
    });

    //grid.addChild(maruObj);
    return maruObj;
  }

  getBatu() {
    //const grid = this.getGrid(suzi, dan);
    const batuObj = new PIXI.Text("×", {
      fontFamily: "Arial",
      fontSize: "30pt",
      fontWeight: "bold",
      fill: "white"
    });

    //grid.addChild(batuObj);
    return batuObj;
  }

  getGrid(suzi, dan) {
    const grid = new PIXI.Graphics();
    grid.beginFill(0xff700b);
    // grid.fillAlpha = 0.7;
    grid.drawRect(0, 0, 50, 50);
    grid.buttonMode = true;
    grid.interactive = true;
    grid.on(
      "pointerdown",
      e => {
        if (this.model.isResult()) {
          console.log(this.model.history);
          alert("決着済みです");
          return;
        }

        this.putKoma(suzi, dan, () => {
          grid.addChild(this.getPutKoma());
        });
      },
      this
    );

    return grid;
  }

  putKoma(suzi, dan, callback) {
    if (this.model.isPut(suzi, dan)) {
      callback();

      this.model.putMarukaku(suzi, dan);
      this.update();
    }
  }

  createHistory() {
    this.history = new History(this.model);
    this.history.x = -70;
    this.history.y = 0;
    this.addChild(this.history);
  }

  update() {
    console.log("result " + this.model.isResult());
    this.history.update();
    if (this.model.isResult()) {
      if (this.model.isFirstMove()) {
        console.log("先手勝利");
        // alert('先手勝利');
      } else {
        console.log("後手勝利");
        // alert('後手勝利');
      }
      return;
    }

    this.model.addvanceTurn();
  }

  createResetButton() {
    const resetBtn = new PIXI.Graphics();
    resetBtn.beginFill(0xff00ff);
    // resetBtn.fillAlpha = 0.7;
    resetBtn.drawRect(0, 0, 50, 25);
    resetBtn.buttonMode = true;
    resetBtn.interactive = true;
    resetBtn.on(
      "pointerdown",
      e => {
        this.resetGame();
      },
      this
    );
    resetBtn.x = 170;
    resetBtn.y = 170;
    resetBtn.addChild(new PIXI.Text("reset", { fontSize: "10pt" }));
    this.addChild(resetBtn);
  }

  resetGame() {
    this.model.reset();
    this.creatBoard();
    console.log(this.history);
    this.history.removeChildren();
    this.history.update();
  }
}
