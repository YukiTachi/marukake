import Model from "./Model.js";
import * as PIXI from 'pixi.js';

export class Main extends PIXI.Container {
    constructor() {
        super();

        this.model = new Model();
        this.creatBoard();
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

    getMaru() {
        //const grid = this.getGrid(suzi, dan);
        const maruObj = new PIXI.Text("○", {
            fontFamily:'Arial',
            fontSize:'30pt',
            fontWeight:'bold',
            fill:'white'
        });

        //grid.addChild(maruObj);
        return maruObj;
    }

    getBatu() {
        //const grid = this.getGrid(suzi, dan);
        const batuObj = new PIXI.Text("×",
            {
                fontFamily:'Arial',
                fontSize:'30pt',
                fontWeight:'bold',
                fill:'white'
            }
        );

        //grid.addChild(batuObj);
        return batuObj;
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

    getGrid(suzi, dan) {
        const grid = new PIXI.Graphics();
        //area.lineStyle(1, 0x0000FF, 1);
        grid.beginFill(0xFF700B);
        grid.fillAlpha = 0.7;
        grid.drawRect(0, 0, 50, 50);
        grid.interactive = true;
        grid.buttonMode = true;
        grid.on('pointerdown', (e) => {
            if(this.model.isResult()){
                alert('決着済みです');
                return;
            }

            this.putKoma(suzi, dan, () => {
                grid.addChild(this.getPutKoma());
            });
        }, this);

        return grid;
    }

    putKoma (suzi, dan, callback) {
        if (this.model.isPut(suzi, dan)) {
            callback();

            this.model.putMarukaku(suzi, dan);
            this.update();
        }
    }

    createText() {
        const maruObj = new PIXI.Text("○");
        maruObj.position.x = 100;
        maruObj.position.y = 100;
    
        this.addChild(maruObj);
    }

    update() {
        console.log("result "+ this.model.isResult());
        if(this.model.isResult()){
            if(this.model.isFirstMove()) {
                console.log("先手勝利");
                alert('先手勝利');
            } else {
                console.log("後手勝利");
                alert('後手勝利');
            }
            return;
        }

        this.model.addvanceTurn();
    }
}
