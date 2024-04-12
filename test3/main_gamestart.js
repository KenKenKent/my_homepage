// ゲーム画面
function gameStart() {
    var scene = new Scene();
    core.replaceScene(scene, TRANSITION.FADE);

    scene.backgroundColor = "red";

    // ステージグループ
    var stage = new Group();
    scene.addChild(stage);
    // 背景グループ
    var backGroup = new Group();
    stage.addChild(backGroup);
    // 地面or壁グループ
    var groundGroup = new Group();
    stage.addChild(groundGroup);
    // 敵グループ
    var enemyGroup = new Group();
    stage.addChild(enemyGroup);
    // アイテムグループ
    var itemGroup = new Group();
    stage.addChild(itemGroup);
    // 銃グループ
    var shotGroup = new Group();
    // DEBUG: shotGroupはstageに追加しましょう
    // scene.addChild(shotGroup);
    stage.addChild(shotGroup);

    // 背景
    var haikei = new Sprite(1600, 500);
    haikei.image = core.assets.haikei;
    //haikei.x = 50;
    haikei.y = -50;
    backGroup.addChild(haikei);


    // 地面
    var ground = new Map(32, 32);
    ground.image = core.assets.blocks;
    // TODO: parseMapの使い方を学びましょう
    // 第一引数：TiledMapEditorで作成したファイルの名前
    // 第二引数：TiledMapEditorで指定したレイヤーの名前
    // 第三引数：イメージを表示するかどうか（true / false）
    ground.parseMap("background", "ground", true);
    groundGroup.addChild(ground);

    // TODO: Surfaceを理解しよう
    // 地面の画像
    var groundImage = new Surface(32, 32);
    // ソースの(64, 0)から横32, 縦32の領域を(0, 0)に横32, 縦32で描画する
    // スプライトシートから１部分のみを切り出している
    // groundImage.draw(core.assets.blocks, 64, 0, 32, 32, 0, 0, 32, 32);
    /*
        // 傾いた地面
        [
            { image: groundImage, width: 32 * 5, height: 32, x: 32 * 25, y: 32 * 4, rotation: -15 },
            { image: groundImage, width: 32 * 5, height: 32, x: 32 * 39, y: 32 * 4, rotation: 15 }
        ].forEach(function(value) {
            var ground = new Sprite(value.width, value.height);
            ground.image = value.image;
            ground.x = value.x;
            ground.y = value.y;
            groundGroup.addChild(ground);
            // 地面を傾ける
            ground.rotation = value.rotation;
        });
        */

    // TODO: プレイヤーの作成を別ファイルで実行していることを確認しよう（main_create_player.js）
    // プレイヤー
    var player = createPlayer();
    player.x = 32 * 3;
    player.y = 32 * 7 - 80;
    // Velocity（速度）
    player.vy = 0;
    // Gravity（重力）
    player.gy = 0.2;
    // Acceleration（加速度）
    player.ax = 2;
    player.ay = 5;
    stage.addChild(player);

    // TODO: setScrollRangeを使ってみよう
    // プレイヤーの移動に合わせて画面をスクロールする
    // setScrollRange（ターゲット、上のマージン、右のマージン、下のマージン、左のマージン）
    // nullの場合はマージンを設定しない、つまりスクロールしない。
    // DEBUG: 初期のマリオみたいに一回前に行ったら後ろに戻れないようにする 2020/09/14 今井
    // stage.setScrollRange(player, 32 * 5, 32 * 5, 32 * 2);
    stage.setScrollRange(player, 32 * 5, 32 * 5, 32 * 2, null);

    // TODO: 衝突の仕組みを理解しよう
    // 衝突設定
    player.outerTop.addCollision(groundGroup);
    player.innerTop.addCollision(groundGroup);
    player.outerBottom.addCollision(groundGroup);
    player.innerBottom.addCollision(groundGroup);
    player.outerLeft.addCollision(groundGroup);
    player.innerLeft.addCollision(groundGroup);
    player.outerRight.addCollision(groundGroup);
    player.innerRight.addCollision(groundGroup);

    // プレイヤーアニメーション
    player.on(Event.ENTER_FRAME, function () {
        var speed = 5;
        var frameArray = [0, 1, 2, 3, 4, 5, 6, 7];
        // HACK: アニメーションフレームの計算式を理解しましょう
        // scene.age: シーンが開始してからのフレーム数
        // speed: 値が大きいほどゆっくりになる
        var index = Math.floor(scene.age / speed) % frameArray.length;
        // frameColumn: プレイヤー画像の配列の長さ
        var frameColumn = core.assets.player.width / player.sprite.width;
        // playerImage.frameRow: １行目は下向き、２行目は左向き、３行目は右むき、４行目は上むき
        player.sprite.frame = frameArray[index] + frameColumn * player.sprite.frameRow;
        // HACK: コンソールで確認しましょう
        // core.fps=4; console.log("age", scene.age, "index", index, "frame", playerImage.frame);
        /*
        // 左キーが押されている時、左へ向きを変える
        if (core.input.left) {
            player.sprite.frameRow = 1;
        }
        // 右キーが押されている時、右へ向きを変える
        if (core.input.right) {
            player.sprite.frameRow = 2;
        }
        */
    });

    // プレイヤー左右の移動
    player.on(Event.ENTER_FRAME, function () {
        // 左のキーが押されている、かつ左の壁に衝突していない時、左へすすむ
        if (core.input.left && !player.outerLeft.isCollision) {
            // DEBUG: 初期のマリオみたいに一回前に行ったら後ろに戻れないようにする 2020/09/14 今井
            // player.x = player.x - player.ax;
            if (player.x > -stage.x) {
                player.x = player.x - player.ax;
            }
        }
        // 右キーが押されている時、かつ右の壁に衝突していない時、右へ進む
        if (core.input.right && !player.outerRight.isCollision) {
            player.x = player.x + player.ax;
        }
        if (player.x > 32 * 48) {
            gameClear();
        }
    });

    player.on(Event.ENTER_FRAME, function () {
        if (core.input.space == true) {
            if (shotGroup.childNodes.length > 0) return;
            // 矢を放つ        
            var arrow = new Sprite(7, 4);
            arrow.image = core.assets.arrow;
            arrow.x = player.x + 10;
            arrow.y = player.y + 12;
            shotGroup.addChild(arrow);
            arrow.tl.moveBy(320, 0, 13);
            arrow.tl.removeFromScene();
        }

    });


    // ジャンプ可能かどうか（ジャンプ方法２で使用する）
    player.canJump = true;
    // スペースキーを使えるようにする
    // DEBUG: スペースキーを使えるようにするために修正 2020/09/14 今井
    // core.keybind("38", "up");
    core.keybind("32", "space");
    // プレイヤー上下の移動（上昇と下降）
    player.on(Event.ENTER_FRAME, function () {
        // 頭が天井に当たっている時、かつ上昇中の時、落下し始める
        if (player.outerTop.isCollision && player.vy < 0) {
            // 速度に重力を設定
            player.vy = player.gy;
        }
        // 足の衝突判定
        // 地面に足がついている時、落下を止める（速度を0にする）
        if (player.outerBottom.isCollision) {
            // 上昇中でない時、速度を0に設定
            if (player.vy > 0) player.vy = 0;
        } else {
            // 速度が最大速度を超えていない時、速度に重力を加算する
            if (player.vy < player.ay) {
                // 速度に重力を加算
                player.vy = player.vy + player.gy;
                // HACK: 不動小数点を小数点第一位で切り捨てる時は以下のとおり
                // player.vy = (player.vy * 10 + player.gy * 10) / 10;
            }
            // ジャンプの頂点に達した時、落下し始める
            if (player.vy == 0) {
                // 速度を0に設定
                player.vy = 0;
            }
        }

        // ジャンプ方法１（ジャンプ方法２を採用している場合は以下コメントアウト）
        // HACK: スペースキーが押されている、かつ地面に足がついている、かつ頭が天井に触れていない時、ジャンプする（上向きの加速をつける）
        if (core.input.up && player.outerBottom.isCollision && !player.outerTop.isCollision) {
            // ジャンプ
            player.vy = -player.ay;
        }

        //ジャンプ方法２（ジャンプ方法１を採用している場合は以下コメントアウト）
        //HACK: スペースキーを押しっぱなしでジャンプさせないようにする
        //地面に足がついている、かつ頭が当たっていない時、一度スペースキーを離した場合にジャンプ可能とする
        if (player.outerBottom.isCollision && !player.outerTop.isCollision) {
            if (core.input.up) {
                if (player.canJump == true) {
                    player.canJump = false;
                    // ジャンプ
                    player.vy = -player.ay;
                }
            } else {
                player.canJump = true;
            }
        }

        // HACK: スペースキーが押されていない、かつジャンプ中の時、減速する（減速させない場合は以下コメントアウト）
        // if (!core.input.space && player.vy < 0) {
        // player.vy += player.gy * 2;
        // }

        // プレイヤーに加速度を反映
        player.y = player.y + player.vy;
        // HACK: 不動小数点を小数点第一位で切り捨てる時は以下のとおり
        // player.y = (player.y * 10 +player.vy * 10) / 10;

        // ゲームオーバー（画面の高さを超えたらゲームオーバー）
        if (player.y > 32 * 10) {
            gameOver();
        }
    });

    // TODO: 壁にめり込んだ時に元に戻す
    player.on(Event.ENTER_FRAME, function () {
        // プレイヤーの左位置調整
        if (player.innerLeft.judgeCollision()) {
            // 左の壁にめり込んでいる時、元に戻す
            player.x += 1;
        }
        // プレイヤーの右位置調整
        if (player.innerRight.judgeCollision()) {
            // 右の壁にめり込んでいる時、元に戻す
            player.x -= 1;
        }
    });

    // TODO: 床にめり込んだ時に元に戻す
    player.on(Event.RENDER, function () {
        // プレイヤーの下位置調整
        if (player.innerBottom.judgeCollision()) {
            // 地面にめり込んでいる時、元に戻す
            for (var i = 0; i < player.sprite.height; i++) {
                player.y -= 1;
                if (player.innerBottom.judgeCollision() == false) break;
            }
        }
    });

    // DEBUG: 動く床を消したらキャラクターがずっとジャンプしちゃいます
    // 先生のプログラムがバグってます。とりあえず暫定対応 2020/09/14 今井
    groundGroup.addChild(new Sprite(0, 0));

    // 敵
    var enemies = [
        { x: 32 * 7, y: 32 * 6 + 24 },
        { x: 32 * 9, y: 32 * 6 + 24 },
        { x: 32 * 13, y: 32 * 6 + 24 },
        { x: 32 * 18, y: 32 * 6 + 24 },
        { x: 32 * 21, y: 32 * 6 + 24 },
        { x: 32 * 28, y: 32 * 6 + 24 },
        { x: 32 * 35, y: 32 * 6 + 24 },
        { x: 32 * 39, y: 32 * 6 + 24 }
    ];

    for (var i = 0; i < enemies.length; i++) {
        var enemy = new Sprite(40, 40);
        enemy.image = core.assets.enemy;
        enemy.x = enemies[i].x;
        enemy.y = enemies[i].y;
        enemy.frame = [0, 0, 0, 1, 1, 1];
        enemyGroup.addChild(enemy);
        enemy.addCollision(player.center);
        enemy.addCollision(player.innerBottom);
        enemy.addCollision(shotGroup);
        enemy.hp = 10;
        enemy.on(Event.COLLISION, function (e) {
            // DEBUG: 増やすと倒せなくなる 2020/09/19 今井
            // Event.COLLISIONは player.center, player.innerBottom, shotGroupの
            // どれかと衝突すれば発生するイベントです。
            // どれと衝突したか判断しましょう。

            // //tamakesu
            // e.collision.target.remove();
            // enemy.hp -= 1;　
            // if (enemy.hp > 0) return;　　
            // //tekikesu
            // enemy.remove();

            // 衝突対象が所属するグループがshotGroupである場合、弾と衝突したことになる
            if (e.collision.target.parentNode == shotGroup) {
                //tamakesu
                e.collision.target.remove();
                this.hp -= 1;
                if (this.hp > 0) return;
                //tekikesu
                this.remove();
            }

            // HACK: 敵と衝突したときの仕組みを理解しよう
            if (e.collision.target == player.innerBottom) {
                // 足と衝突した場合（踏んづけた場合）、敵を消す
                enemy.remove();
            } else if (e.collision.target == player.center) {

                // if (e.collision.target == player.center || player.innerBottom) {
                // 体と衝突した場合、ゲームオーバー
                gameOver();

            }
        });
    }

    // 敵2
    var enemies2 = [
        { x: 32 * 10, y: 32 * 4 + 24 },
        { x: 32 * 14, y: 32 * 5 },
        { x: 32 * 16, y: 32 * 4 + 5 },
        { x: 32 * 20, y: 32 * 4 + 10 },
        { x: 32 * 25, y: 32 * 5 },
        { x: 32 * 30, y: 32 * 4 },
        { x: 32 * 34, y: 32 * 5 - 25 },
        { x: 32 * 36, y: 32 * 5 }
    ];
    for (var i = 0; i < enemies2.length; i++) {
        var enemy2 = new Sprite(31, 28);
        enemy2.image = core.assets.enemy2;
        enemy2.x = enemies2[i].x;
        enemy2.y = enemies2[i].y;
        enemy2.frame = [0, 0, 1, 1];
        enemyGroup.addChild(enemy2);
        enemy2.addCollision(player.center);
        enemy2.addCollision(player.innerBottom);
        enemy2.addCollision(shotGroup);
        enemy2.hp = 5;
        
        enemy2.on(Event.COLLISION, function (e) {
            if (e.collision.target.parentNode == shotGroup) {
                //tamakesu
                e.collision.target.remove();
                this.hp -= 1;
                if (this.hp > 0) return;
                //tekikesu
                this.remove();
            }

            // HACK: 敵と衝突したときの仕組みを理解しよう
            if (e.collision.target == player.innerBottom) {
                // 足と衝突した場合（踏んづけた場合）、敵を消す
                enemy2.remove();
            } else if (e.collision.target == player.center) {

                // if (e.collision.target == player.center || player.innerBottom) {
                // 体と衝突した場合、ゲームオーバー 
                gameOver();
            }
        });
    }

    var big2 = new Sprite(120, 96);
    big2.image = core.assets.big2;
    big2.x = 32 * 45;
    big2.y = 32 * 5 + 10;
    big2.frame = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
    enemyGroup.addChild(big2);
    big2.addCollision(player.center);
    big2.addCollision(player.innerBottom);
    big2.addCollision(shotGroup);

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