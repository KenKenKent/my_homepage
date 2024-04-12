// タイトル画面
function titleStart(){
    var scene = new Scene();
    core.replaceScene(scene, TRANSITION.FADEIN);

    // 背景色
    scene.backgroundColor = "black";

    // ゲームタイトル
    var home = new Sprite(320, 320);
    home.image = core.assets.home;
    scene.addChild(home);

    var message = new Label();
    message.width = scene.width;
    message.x = 0;
    message.y = scene.height * 0.6;
    message.color = "white";
    message.textAlign = "center";
    message.font = "15px PixelMplus10";
    message.text = "TAP TO START";
    scene.addChild(message);
    message.opacity = 0;

    // 画面をクリックしたとき    
    scene.on(enchant.Event.TOUCH_START, function () {
        gameStart();
    });

}
