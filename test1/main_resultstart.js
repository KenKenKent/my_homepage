function gameOver() {
    var scene = new Scene();
    core.pushScene(scene);

    //オーバー
    var co = new Sprite(221, 68);
    co.image = core.assets.co;
    co.x = 320 / 2 - 221 / 2;
    co.y = 320 / 2 - 68 / 2;
    co.frame = [1];
    co.scale(0, 0);
    scene.addChild(co);
    co.tl.scaleTo(1, 1, 5);

    // 画面をクリックしたとき    
    scene.on(enchant.Event.TOUCH_START, function () {
        // タイトル画面を表示    
        titleStart();
    });
}

function gameClear(score) {
    var scene = new Scene();
    core.pushScene(scene);

    //クリア
    var co2 = new Sprite(221, 68);
    co2.image = core.assets.co;
    co2.x = 320 / 2 - 221 / 2;
    co2.y = 320 / 2 - 68 / 2;
    co2.frame = [0];
    co2.scale(0, 0);
    scene.addChild(co2);
    co2.tl.scaleTo(1, 1, 5);

    var meda = new Sprite(68, 96);
    meda.image = core.assets.meda;
    meda.x = 320 / 2 - 68 / 2;
    meda.y = 320 / 2 - 96 / 2;
    meda.scale(2.5, 2.5);
    meda.frame = [0];
    scene.addChild(meda);
    meda.tl.scaleTo(1, 1, 10);
    meda.tl.and();
    meda.tl.moveTo(40, 195, 10);

    var meda2 = new Sprite(68, 96);
    meda2.image = core.assets.meda2;
    meda2.x = 320 / 2 - 68 / 2 + 68;
    meda2.y = 320 / 2 - 96 / 2;
    meda2.scale(2.5, 2.5);
    meda2.frame = [0];
    scene.addChild(meda2);
    meda2.tl.delay(5);
    meda2.tl.scaleTo(1, 1, 10);
    meda2.tl.and();
    meda2.tl.moveTo(40 + 78, 195, 10);

    scene.tl.delay(8);
    scene.tl.then(function () {
        // 画面をクリックしたとき    
        scene.on(enchant.Event.TOUCH_START, function () {

            // タイトル画面を表示    
            titleStart();
        });
    });
}
