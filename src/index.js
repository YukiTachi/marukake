import { Main } from './Main.js';


(function() {

    const app = new PIXI.Application(320, 320, {
        backgroundColor : 0x1099bb
    });

    document.body.appendChild(app.view);
    const main = new Main();

    app.stage.addChild(main);
})();
