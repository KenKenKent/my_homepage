// タイトル画面
function titleStart(){
    var scene = new Scene();
    core.replaceScene(scene, TRANSITION.FADEIN);

    // タイトル
    var title = new Sprite(320, 320);
    title.image = core.assets["images/covitt.png"];
    scene.addChild(title);

    // 画面をクリックしたとき    
    scene.on(enchant.Event.TOUCH_START, function () {
        gameStart();
    });

}
