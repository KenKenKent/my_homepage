// ゲーム画面
function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene, TRANSITION.FADE);

    scene.backgroundColor = "black";

    // ステージグループ
    var stage = new Group();
    scene.addChild(stage);
    // 背景グループ
    var backGroup = new Group();
    stage.addChild(backGroup);
    // 敵グループ
    var enemyGroup = new Group();
    stage.addChild(enemyGroup);
    // アイテムグループ
    var itemGroup = new Group();
    stage.addChild(itemGroup);

    var back = new Sprite(320 * 1.625, 320 * 1.625);
    back.image = core.assets["images/mati.png"];
    backGroup.addChild(back);

    // プレイヤー
    var player = new Sprite(19, 20);
    player.image = core.assets["images/119.png"];
    player.x = 32 * 9;
    player.y = 32 * 9;
    player.frame = [0, 0, 1, 1, 2, 2, 1, 1];
    stage.addChild(player);

    // プレイヤー操作
    player.on(Event.ENTER_FRAME, function() {
        if (core.input.left) {
            player.frame = [3, 3, 4, 4, 5, 5, 4, 4];
            player.x = player.x - 4;
        }
        if (core.input.right) {
            player.frame = [6, 6, 7, 7, 8, 8, 7, 7];
            player.x = player.x + 4;
        }
        if (core.input.up) {
            player.frame = [9, 9, 10, 10, 11, 11, 10, 10];
            player.y = player.y - 4;
        }
        if (core.input.down) {
            player.frame = [0, 0, 1, 1, 2, 2, 1, 1];
            player.y = player.y + 4;
        }
        // プレイヤーを画面の中央に常に表示する
        stage.x = scene.width / 2 - player.centerX;
        stage.y = scene.height / 2 - player.centerY;
    });

    // 敵
   
    
        var enemy = new Sprite(32, 32);
        enemy.image = core.assets["images/pipo-charachip019.png"];
        enemy.x = enemies[i].x;
        enemy.y = enemies[i].y;
        enemy.frame = [0, 0, 1, 1, 2, 2, 1, 1];
        enemyGroup.addChild(enemy);
        enemy.addCollision(player);
        enemy.on(Event.COLLISION, function(e) {
            resultStart("GAME OVER");
        });
    

    // 得点表示
    var scoreLabel = new Label();
    scoreLabel.width = 90;
    scoreLabel.x = 220;
    scoreLabel.y = 10;
    scoreLabel.font = "14px PixelMplus10";
    scoreLabel.color = "white";
    scoreLabel.textAlign = "right";
    scoreLabel.score = 0;
    scoreLabel.text = 0;
    scoreLabel.addScore = function (score) {
        this.score = this.score + score;
        scoreLabel.text = this.score;
    }
    scene.addChild(scoreLabel);

    
    
}
