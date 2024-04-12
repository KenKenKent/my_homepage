function gameOver() {
    var scene = new Scene();
    core.pushScene(scene);

    // 文字を表示    
    var label = new Label();
    label.width = 320;
    label.x = 0;
    label.y = 150;
    label.color = "white";
    label.textAlign = "center";
    label.font = "32px serif";
    label.text = "ゲームオーバー";
    scene.addChild(label);

    // 画面をクリックしたとき    
    scene.on(enchant.Event.TOUCH_START, function () {
        // タイトル画面を表示    
        titleStart();
    });
}

    function gameClear() {
        var scene = new Scene();
        core.pushScene(scene);

        // 文字を表示    
        var result = new Label();
        result.width = 320;
        result.x = 0;
        result.y = 150;
        result.font = "32px serif"
        result.color = "white";
        result.textAlign = "center";
        result.text = "ゲームクリア";
        scene.addChild(result);

        scene.tl.delay(8);
        scene.tl.then(function () {
            // 画面をクリックしたとき    
            scene.on(enchant.Event.TOUCH_START, function () {
                // タイトル画面を表示    
                titleStart();
            });
        });
    }
    