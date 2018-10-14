import { Main } from './Main.js';


(function() {

    const app = new PIXI.Application(320, 320, {
        backgroundColor : 0x1099bb
    });

    document.body.appendChild(app.view);
    const main = new Main();
    console.dir(app.view);
    console.dir(main);
    main.x = (app.view.width - main.width) / 2;
    main.y = (app.view.height - main.height) / 2;

    app.stage.addChild(main);
})();
