// ゲーム画面
function createPlayer() {
    // プレイヤー
    var player = new EntityGroup(40, 40);
    　　
    
    // プレイヤー画像
    var playerSprite = new Sprite(40, 40);　   
    playerSprite.image = core.assets.player;
    //player.frame = (0, 1, 2, 3, 4, 5, 6, 7);
    // playerSprite.backgroundColor = "yellow"
    playerSprite.frameRow = 0;
    player.addChild(playerSprite);
    // プレイヤーの上（外側）
    var outerTop = new Sprite(4, 2);
    // TODO: 色をつけてどこに配置されるか確認しよう
    // outerTop.backgroundColor = "red"
    outerTop.centerX = player.centerX;
    outerTop.y = -outerTop.height;
    player.addChild(outerTop);
    // プレイヤーの上（中側）
    var innerTop = new Sprite(4, 2);
    // TODO: 色をつけてどこに配置されるか確認しよう
    // innerTop.backgroundColor = "blue"
    innerTop.centerX = player.centerX;
    innerTop.y = 0;
    player.addChild(innerTop);
    // プレイヤーの下（外側）
    var outerBottom = new Sprite(4, 2);
    // TODO: 色をつけてどこに配置されるか確認しよう
    // outerBottom.backgroundColor = "red"
    outerBottom.centerX = player.centerX;
    outerBottom.y = player.height;
    player.addChild(outerBottom);
    // プレイヤーの下（内側）
    var innerBottom = new Sprite(2, 2);
    // TODO: 色をつけてどこに配置されるか確認しよう
    // innerBottom.backgroundColor = "blue"
    innerBottom.centerX = player.centerX;
    innerBottom.y = player.height - innerBottom.height;
    player.addChild(innerBottom);
    // プレイヤーの左（外側）
    var outerLeft = new Sprite(2, 4);
    // TODO: 色をつけてどこに配置されるか確認しよう
    // outerLeft.backgroundColor = "red"
    outerLeft.x = -outerLeft.width;
    outerLeft.centerY = player.centerY;
    player.addChild(outerLeft);
    // プレイヤーの左（内側）
    var innerLeft = new Sprite(2, 4);
    // TODO: 色をつけてどこに配置されるか確認しよう
    // innerLeft.backgroundColor = "blue"
    innerLeft.x = 0;
    innerLeft.centerY = player.centerY;
    player.addChild(innerLeft);
    // プレイヤーの右（外側）
    var outerRight = new Sprite(2, 4);
    // TODO: 色をつけてどこに配置されるか確認しよう
    // outerRight.backgroundColor = "red"
    outerRight.x = player.width;
    outerRight.centerY = player.centerY;
    player.addChild(outerRight);
    // プレイヤーの右（内側）
    var innerRight = new Sprite(2, 4);
    // TODO: 色をつけてどこに配置されるか確認しよう
    // innerRight.backgroundColor = "blue"
    innerRight.x = player.width - innerRight.width;
    innerRight.centerY = player.centerY;
    player.addChild(innerRight);
    // プレイヤーの中央
    var center = new Sprite(4, 4);
    // TODO: 色をつけてどこに配置されるか確認しよう
    // center.backgroundColor = "black"
    // center.centerX = player.width * 0.5;
    center.centerX = player.centerX;
    center.centerY = player.centerY;
    player.addChild(center);

    player.sprite = playerSprite;
    player.innerTop = innerTop;
    player.innerBottom = innerBottom;
    player.innerLeft = innerLeft;
    player.innerRight = innerRight;
    player.outerTop = outerTop;
    player.outerBottom = outerBottom;
    player.outerLeft = outerLeft;
    player.outerRight = outerRight;
    player.center = center;

    // 作成したプレイヤーを呼び出し元に戻す
    return player;

}
