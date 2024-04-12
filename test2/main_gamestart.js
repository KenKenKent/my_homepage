// ゲーム画面
function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene);

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

    // HACK: 背景画像をTiled Map Editor で作りましょう
    var back = new Sprite(320 * 1.625, 320 * 1.625);
    back.image = core.assets["images/mati.png"];
    backGroup.addChild(back);

    var back2 = new Sprite(320 * 1.625, 320 * 1.625);
    back2.image = core.assets["images/new town.png"];
    backGroup.addChild(back2);
    back2.addCollision(player);
    back2.on(Event.COLLISION, function (e) {

            if (this.centerY < e.collision.target.centerY) {
                e.collision.target.y += 80;
            }
           
    });

    // プレイヤー
    var player = new Sprite(19, 20);
    player.image = core.assets["images/119.png"];
    player.x = 14 * 1.625;
    player.y = 305 * 1.625;
    player.frame = [0, 1];
    stage.addChild(player);

    // プレイヤー操作
    player.on(Event.ENTER_FRAME, function() {
        if (core.input.left) {
            player.frame = [4, 5];
            player.x = player.x - 4;
        }
        if (core.input.right) {
            player.frame = [2, 3];
            player.x = player.x + 4;
        }
        // TODO: プレイヤーを上下に移動できるようにしたい
        if (core.input.up) {
            player.frame = [0, 1];
            player.y = player.y - 4;
        }
        if (core.input.down) {
            player.frame = [6, 7];
            player.y = player.y + 4;
        }
        // プレイヤーを画面の中央に常に表示する
        stage.x = scene.width / 2 - player.centerX;
        stage.y = scene.height / 2 - player.centerY;

    });

    // 看護師
    var kan = new Sprite(9, 14);
    kan.image = core.assets["images/kan.png"];
    kan.x = 470;
    kan.y = 115;
    stage.addChild(kan);
    
    kan.addCollision(player);
    kan.on(Event.COLLISION, function (e) {
        gameClear();
    });

    // TODO: 敵が座標(0, 0)に配置されているので修正したい
    // 敵
        var enemy = new Sprite(5, 5);
        enemy.image = core.assets["images/covit.png"];
        enemy.x = 0;
        enemy.y = 0;
        enemyGroup.addChild(enemy);
        enemy.addCollision(player);
       
        enemy.on(Event.ENTER_FRAME, function(){
            if (this.centerX > player.centerX){
                this.centerX = this.centerX - 3;
            }
            if (this.centerX < player.centerX) {
                this.centerX = this.centerX + 3;
            }
            if (this.centerY > player.centerY){
                this.centerY = this.centerY - 3;
            }
            if (this.centerY < player.centerY){
                this.centerY = this.centerY + 3;
            }
        });
    

    // 衝突
    player.addCollision(enemyGroup);
    player.on(Event.COLLISION, function (e) {
        gameOver();
    });

    // HACK: フォントを変えてみましょう
    // style.css の font-family に指定されている文字列を設定してみましょう
    // 得点表示
    var scoreLabel = new Label();
    scoreLabel.width = 90;
    scoreLabel.x = 220;
    scoreLabel.y = 10;
    scoreLabel.font = "14px Robot";
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
