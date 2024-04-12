function titleStart() {
    var scene = new Scene();
    core.replaceScene(scene);

    //タイトル
    var title = new Sprite(320, 320);
    title.image = core.assets.title;
    scene.addChild(title);

    //タイトル(文字2)
    var moji2 = new Sprite(99, 14);
    moji2.image = core.assets.moji2;
    moji2.x = 320 / 2 - 99 / 2;
    moji2.y = 197;
    scene.addChild(moji2);

    // G O D  C O M E S   
    moji2.on(enchant.Event.TOUCH_START, function () {
        //神
        var god = new Sprite(64, 96);
        god.image = core.assets.god;
        god.x = 0;
        god.y = 320;
        god.frame = [1, 2];
        scene.addChild(god);
        god.tl.moveBy(0, -100, 50);
        god.tl.delay(45);
        god.tl.moveBy(0, 100, 50);
 /*
        var sound4 =
            core.assets["sounds/se_maoudamashii_effect04.mp3"].clone();
        sound4.play();
        sound4.volume = 0.1;
*/
    });
    
    //タイトル(文字１)
    var moji1 = new Sprite(153, 15);
    moji1.image = core.assets.moji1;
    moji1.x = 320 / 2 - 153 / 2;
    moji1.y = 174;
    scene.addChild(moji1);

    // 画面をクリックしたとき    
    moji1.on(Event.TOUCH_START, function () {
        // ゲーム画面を表示    
        gameStart();
        /*
        var sound5 = core.assets["sounds/se_maoudamashii_retro03.mp3"].clone();
        sound5.play();
        sound5.volume = 0.1;
        */
    });
}
