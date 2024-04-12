function gameOver(){
    var scene = new Scene();
    core.pushScene(scene);

    // ゲームタイトル
    var title = new Label();
    title.width = scene.width;
    title.x = 0;
    title.y = scene.height * 0.4;
    title.color = "white";
    title.textAlign = "center";
    title.font = "20px PixelMplus10";
    title.text = "ゲームオーバー";
    scene.addChild(title);

    // 画面をクリックしたとき    
    scene.on(enchant.Event.TOUCH_START, function () {
        gameStart();
    });

}
function gameClear() {
    var scene = new Scene();
    core.pushScene(scene);

    // ゲームタイトル
    var title = new Label();
    title.width = scene.width;
    title.x = 0;
    title.y = scene.height * 0.4;
    title.color = "white";
    title.textAlign = "center";
    title.font = "20px PixelMplus10";
    title.text = "次回に期待して";
    scene.addChild(title);

    // 画面をクリックしたとき    
    scene.on(enchant.Event.TOUCH_START, function () {
        gameStart();
    });

}
