function gameStart() {
    var scene = new Scene();
    core.replaceScene(scene);
/*
    // BGM
    var  = core.assets["sounds/cf1415/bgm_maoudamashii_8bit10.mp3"].clone();
    bgm.play();
    bgm.src.loop = true;
    bgm.volume = 0.1;
*/
    // 背景色
    scene.backgroundColor = "black";

    // ボス背景
    var back2 = new Sprite(320, 320);
    back2.image = core.assets.back2;
    back2.y = -320;
    scene.addChild(back2);

    // 背景
    var back = new Sprite(320, 2400);
    back.image = core.assets.back;
    back.y = -320;
    scene.addChild(back);
    back.tl.moveTo(0, -2400 + 320, 0);
    back.tl.moveBy(0, 2400, 800);
    back2.tl.delay(650);
    back2.tl.moveBy(0, 320, 130);

    // 弾のグループ
    var shotGroup = new Group();
    scene.addChild(shotGroup);
    // 弾のグループ
    var itemGroup = new Group();
    scene.addChild(itemGroup);
    // 敵のグループ
    var enemyGroup = new Group();
    scene.addChild(enemyGroup);
    // 電車のグループ
    var krakenGroup = new Group();
    scene.addChild(krakenGroup);
    // 電車1の影
    var shadowGroup = new Group();
    scene.addChild(shadowGroup);
    // 電車2のグループ
    var kraken2Group = new Group();
    scene.addChild(kraken2Group);
    // 電車2の影
    var shadow2Group = new Group();
    scene.addChild(shadow2Group);
    // ボス
    var bossGroup = new Group();
    scene.addChild(bossGroup);

    // プレイヤー
    var player = new Sprite(70, 29);
    player.image = core.assets.player;
    player.x = 144;
    player.y = 280;
    player.hp = 3;
    scene.addChild(player);

/*
    var item2 = new Sprite(32, 32);
    item2.image = core.assets.item;
    item2.x = 320 / 2;
    item2.y = 0;
    item2.tl.moveBy(0, 320, 60);
    itemGroup.addChild(item2);
*/
    // 弾を撃つ
    core.keybind("32", "space");
    scene.on(Event.ENTER_FRAME, function () {
        if (core.input.space == true) {

             /*
            var sound = core.assets["sounds/cf1415/se_maoudamashii_battle_gun05.mp3"].clone();
            sound.play();
            sound.volume = 0.1;
             */

            player.bullet();
        }
    });

    player.shotPatern = 1;

    // 弾を撃つ
    var bullet = function (x) {
        var bullet = new Sprite(9, 9);
        bullet.image = core.assets.bullet;
        bullet.x = player.x + player.width * 0.5 - bullet.width * 0.5;
        bullet.y = player.y + 12;
        shotGroup.addChild(bullet);
        bullet.tl.moveBy(x, -320, 15);
        bullet.tl.removeFromScene();
    }

    // 弾を撃つ
    player.bullet = function () {
        // 連射できるか
        // 連射
        this.bullet_reload = this.bullet_reload || 0;
        if (this.bullet_reload > 0) {
            this.bullet_reload -= 1;
            return;
        }
        if (this.shotPatern == 1) {
            this.bullet_reload = 3;
        } else {
            this.bullet_reload = 5;
        }
        // 弾の向き
        if (this.shotPatern == 1) {
            // １方向か
            bullet(0);
        } else if (this.shotPatern == 2) {
            // ３方向
            for (var i = -1; i <= 1; i++) {
                // TODO: i の変化を確認しよう
                // -1, 0, 1
                bullet(i * 80);
            }
        }
    };

    // 定期的に弾を発射する
    //player.on(Event.ENTER_FRAME, function () {
   //     this.bullet();
   // });
  
    // プレイヤーの操作
    scene.on(Event.ENTER_FRAME, function () {
        if (core.input.left == true) {
            player.x = player.x - 6;
            //player.frame = [2];
        }
        if (core.input.right == true) {
            player.x = player.x + 6;
            //player.frame = [1];
        }
        if (core.input.up == true) {
            player.y = player.y - 6;
            // player.frame = [0];
        }
        if (core.input.down == true) {
            player.y = player.y + 6;
            //player.frame = [0];
        }
        if (player.x < 0) player.x = 0;
        if (player.x > 320 - 35) player.x = 320 - 35;
        if (player.y < 0) player.y = 0;
        if (player.y > 320 - 29) player.y = 320 - 29;
    });

    var protect = new Sprite(320, 320);
    protect.x = 0;
    protect.y = -320;
    scene.addChild(protect);

    //衝突                        
    protect.addCollision(shotGroup);
    protect.on(Event.COLLISION, function (e) {
        e.collision.target.remove();
    });

    var item = new Sprite(32, 32);
    item.image = core.assets.item;
    item.x = 320 / 2;
    item.y = -32;
    item.tl.delay(80);
    item.tl.moveBy(0, 320, 80);
    item.scale(0.5, 0.5);
    itemGroup.addChild(item);

    //ボス（1）
    var boss = new Sprite(250, 164);
    boss.image = core.assets.boss;
    boss.x = 320 / 2 - 250 / 2;
    boss.y = -180;
    boss.frame = [0, 0, 1, 1];
    boss.hp = 500;
    boss.tl.delay(800);
    boss.tl.moveBy(0, 100, 80); 

    //ばんぐ 
    scene.tl.then(function () {
        var bang = new Sprite(28, 79);
        bang.image = core.assets.bang;
        bang.x = boss.x + 250 / 2 + 28 / 2;
        bang.y = -80;
        bang.frame = [0,1];
        bossGroup.addChild(bang);
        bang.tl.delay(880);
        bang.tl.moveBy(player.x - 135, 400, 35);
        //ばんぐ2
        var bang2 = new Sprite(28, 79);
        bang2.image = core.assets.bang;
        bang2.x = boss.x + 250 / 2 + 28 / 2;
        bang2.y = -80;
        bang.frame2 = [0, 1];
        bossGroup.addChild(bang2);
        bossGroup.addChild(boss);
        bang2.tl.delay(920);
        bang2.tl.moveBy(player.x - 135, 400, 35);
    });
    scene.tl.delay(30);
    scene.tl.loop();

    //衝突                        
    boss.addCollision(shotGroup);
    boss.on(Event.COLLISION, function (e) {
        this.hp -= 1;
        if (this.hp > 0) return;
/*
        // 効果音
        var sound4 = core.assets["sounds/bomb_l.mp3"].clone();
        sound4.play();
        sound4.volume = 0.1;
*/
        var bomb4 = new Sprite(32, 32);
        bomb4.image = core.assets.bomb;
        bomb4.x = boss.x;
        bomb4.y = boss.y;
        scene.addChild(bomb4);
        bomb4.scale(2, 2);
        bomb4.frame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
        bomb4.on(Event.ANIMATION_END, function () {
        });
        // 得点を加算
        scoreLabel.addScore(3000);
        // 敵を消す        
        bossGroup.remove();
        //bgm.stop();
        // 弾を消す
        e.collision.target.remove();

        gameClear(scoreLabel);
    });

    // ボス用のBGM
    /*
    var bgm2 = core.assets
    ["sounds/bgm_maoudamashii_8bit09.mp3"].clone();
*/

    // 繰り返し
    scene.tl.then(function () {
        if (boss.y > -60) {
            //bgm.stop();
            // ボス用のBGM
            //bgm2.play();
            //bgm2.volume = 0.1;
            this.tl.unloop();
            return;
        }
        var timer = new Node();
        scene.addChild(timer);
        timer.tl.then(function() {
            // 敵を表示
            var enemy = new Sprite(32, 37);
            enemy.image = core.assets.enemy;
            enemy.x = getRandom(32, 320 - 32);
            enemy.y = -32;
            enemy.scale(0.7, 0.7);
            enemy.frame = [0, 1];
            enemyGroup.addChild(enemy);
            // 前進
            enemy.on(Event.ENTER_FRAME, function () {
                this.y = this.y + 9;
                if (this.y > 320) {
                    this.remove();
                }
            });
            // 衝突
            enemy.addCollision(shotGroup);
            enemy.on(Event.COLLISION, function (e) {
                /*
                            // 効果音
                            var sound4 = core.assets["sounds/se_maoudamashii_retro12.mp3"].clone();
                            sound4.play();
                            sound4.volume = 0.1;
                */
               
                var bomb4 = new Sprite(32, 32);
                bomb4.image = core.assets.bomb;
                bomb4.x = enemy.x;
                bomb4.y = enemy.y;
                scene.addChild(bomb4);
                bomb4.frame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
                bomb4.on(Event.ANIMATION_END, function () {
                });
                // 得点を加算
                scoreLabel.addScore(100);
                // 敵を消す        
                enemy.remove();
                // 弾を消す
                e.collision.target.remove();
            });
        });
        timer.tl.delay(25);
        timer.tl.then(function() {
            // 敵を表示
            var enemy2 = new Sprite(32, 37);
            enemy2.image = core.assets.enemy;
            enemy2.x = getRandom(32, 320 - 32);
            enemy2.y = -32;
            enemy2.scale(0.7, 0.7);
            enemy2.frame = [0, 1];
            enemyGroup.addChild(enemy2);
            // 前進
            enemy2.on(Event.ENTER_FRAME, function () {
                this.y = this.y + 9;
                if (this.y > 320) {
                    this.remove();
                }
            });
            // 衝突
            enemy2.addCollision(shotGroup);
            enemy2.on(Event.COLLISION, function (e) {
                /*
                            // 効果音
                            var sound4 = core.assets["sounds/se_maoudamashii_retro12.mp3"].clone();
                            sound4.play();
                            sound4.volume = 0.1;
                */

                var bomb4 = new Sprite(32, 32);
                bomb4.image = core.assets.bomb;
                bomb4.x = enemy2.x;
                bomb4.y = enemy2.y;
                scene.addChild(bomb4);
                bomb4.frame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
                bomb4.on(Event.ANIMATION_END, function () {
                });
                // 得点を加算
                scoreLabel.addScore(100);
                // 敵を消す        
                enemy2.remove();
                // 弾を消す
                e.collision.target.remove();
            });

        });
        timer.tl.removeFromScene();


    });
    scene.tl.delay(15);
    scene.tl.loop();

    //
    //電車
    var kraken = new Sprite(50, 140);
    kraken.image = core.assets.kraken;
    kraken.x = -140;
    kraken.y = 60;
    kraken.frame = [0, 1];
    kraken.tl.delay(200);
    kraken.tl.moveBy(145, 0, 65);
    kraken.hp = 60;
    krakenGroup.addChild(kraken);

    //電車（左）と弾の衝突
    kraken.addCollision(shotGroup);
    kraken.on(Event.COLLISION, function (e) {
        // 弾を消す
        e.collision.target.remove();
        this.hp -= 1;
        if (this.hp > 0) return;
        /*
        var sound5 = core.assets["sounds/se_maoudamashii_retro12.mp3"].clone();
        sound5.play();
        sound5.volume = 0.5;
*/
        // 
        var bomb5 = new Sprite(32, 32);
        bomb5.image = core.assets.bomb;
        bomb5.x = kraken.x;
        bomb5.y = kraken.y + 140 / 2;
        scene.addChild(bomb5);
        bomb5.scale(3, 3);
        bomb5.frame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
        bomb5.on(Event.ANIMATION_END, function () {
       
        // 得点を加算
        scoreLabel.addScore(500);
        // 敵を消す 
        //shadowkraken.remove();       
        krakenGroup.remove();
       
        });
    });

    //電車2
    var kraken2 = new Sprite(50, 140);
    kraken2.image = core.assets.kraken;
    kraken2.x = 320;
    kraken2.y = 60;
    kraken2.frame = [0, 1];
    kraken2.tl.delay(230);
    kraken2.tl.moveBy(-55, 0, 40);
    kraken2.hp = 60;
    kraken2Group.addChild(kraken2);

    //電車（右）と弾の衝突
    kraken2.addCollision(shotGroup);
    kraken2.on(Event.COLLISION, function (e) {
        // 弾を消す
        e.collision.target.remove();
        this.hp -= 1;
        if (this.hp > 0) return;
        /*
        var sound5 = core.assets["sounds/se_maoudamashii_retro12.mp3"].clone();
        sound5.play();
        sound5.volume = 0.5;
*/
        // 
        var bomb6 = new Sprite(32, 32);
        bomb6.image = core.assets.bomb;
        bomb6.x = kraken2.x;
        bomb6.y = kraken2.y + 140 / 2;
        scene.addChild(bomb6);
        bomb6.scale(3, 3);
        bomb6.frame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
        bomb6.on(Event.ANIMATION_END, function () {
        });
        // 得点を加算
        scoreLabel.addScore(500);
        // 敵を消す 
        //shadowkraken2.remove();       
        kraken2Group.remove();
    });

    // 敵を表示(電車)
    scene.tl.then(function () {
        var enemy3 = new Sprite(32, 37);
        enemy3.image = core.assets.enemy02;
        enemy3.x = -50;
        enemy3.y = getRandom(50, 180);
        enemy3.scale(0.7, 0.7);
        krakenGroup.addChild(enemy3);
        enemy3.frame = [0, 1];
        enemy3.tl.delay(300);
        enemy3.tl.moveBy(getRandom(110, 200), 0, 5);
        enemy3.tl.delay(2);
        enemy3.tl.moveBy(0, 320, 15);

        //衝突                        
        enemy3.addCollision(shotGroup);
        enemy3.on(Event.COLLISION, function (e) {
            /*
            // 効果音
            var sound7 = core.assets["sounds/se_maoudamashii_retro12.mp3"].clone();
            sound7.play();
            sound7.volume = 0.1;
            */
            // 
            // 
            var bomb7 = new Sprite(32, 32);
            bomb7.image = core.assets.bomb;
            bomb7.x = enemy3.x;
            bomb7.y = enemy3.y;
            scene.addChild(bomb7);
            bomb7.frame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
            bomb7.on(Event.ANIMATION_END, function () {
            });
            // 得点を加算
            scoreLabel.addScore(100);
            // 敵を消す        
            enemy3.remove();
            // 弾を消す
            e.collision.target.remove();
        });
    });
    scene.tl.delay(1);
    scene.tl.loop();

    // 敵を表示(電車2)
    scene.tl.then(function () {
        var enemy4 = new Sprite(32, 37);
        enemy4.image = core.assets.enemy02;
        enemy4.x = 320 + 50;
        enemy4.y = getRandom(50, 180);
        enemy4.scale(0.7, 0.7);
        kraken2Group.addChild(enemy4);
        enemy4.frame = [0, 1];
        enemy4.tl.delay(300);
        enemy4.tl.moveBy(getRandom(-150, -260), 0, 5);
        enemy4.tl.delay(10);
        enemy4.tl.moveBy(0, 320, 15);

        //衝突                        
        enemy4.addCollision(shotGroup);
        enemy4.on(Event.COLLISION, function (e) {
            /*
            // 効果音
            var sound3 = core.assets["sounds/se_maoudamashii_retro12.mp3"].clone();
            sound3.play();
            sound3.volume = 0.1;
*/
            // 
            var bomb3 = new Sprite(32, 32);
            bomb3.image = core.assets.bomb;
            bomb3.x = enemy4.x;
            bomb3.y = enemy4.y;
            scene.addChild(bomb3);
            bomb3.frame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
            bomb3.on(Event.ANIMATION_END, function () {
            });
            // 得点を加算
            scoreLabel.addScore(100);
            // 敵を消す        
            enemy4.remove();
            // 弾を消す
            e.collision.target.remove();
        });
    });
    scene.tl.loop();
//
    
/*
    // 繰り返し
    scene.tl.delay(10);
    scene.tl.then(function () {



        // 敵を表示
        var enemy2 = new Sprite(32, 37);
        enemy2.image = core.assets.enemy;
        enemy2.x = 320;
        enemy2.y = player.y + getRandom(-15, 15);
        enemyGroup.addChild(enemy2);
        enemy2.tl.moveBy(-320, 0, 64);
        enemy2.tl.removeFromScene();
        enemy2.frame = [0, 0, 1, 1];

        if (enemy2.y > 320 - 40) {
            enemy2.y = 320 - 40;
        }
        if (enemy2.y < 135) {
            enemy2.y = 135;
        }


        // 敵を表示
        var enemy = new Sprite(32, 37);
        enemy.image = core.assets.enemy;
        enemy.x = 320;
        enemy.y = getRandom(160, 288);
        enemyGroup.addChild(enemy);
        enemy.tl.moveBy(-320, 0, 64);
        enemy.tl.removeFromScene();
        enemy.frame = [0, 0, 1, 1];

        // 衝突
        enemy.addCollision(shotGroup);
        enemy.on(Event.COLLISION, function (e) {
            // 得点を加算
            scoreLabel.addScore(10);
            // 敵を消す        
            enemy.remove();
            // 弾を消す
            e.collision.target.remove();
        });

        // 衝突
        enemy2.addCollision(shotGroup);
        enemy2.on(Event.COLLISION, function (e) {
            // 得点を加算
            scoreLabel.addScore(10);
            // 敵を消す        
            enemy2.remove();
            // 弾を消す
            e.collision.target.remove();
        });
    });
    scene.tl.loop();
*/
    var hp = new Sprite(70, 29);
    hp.image = core.assets.player;
    hp.x = -28 + 10;
    hp.y = 5;
    hp.hp = 3;
    hp.scale(0.7, 0.7);
    scene.addChild(hp);

    var hp2 = new Sprite(70, 29);
    hp2.image = core.assets.player;
    hp2.x = 0 + 10;
    hp2.y = 5;
    hp2.hp = 3;
    hp2.scale(0.7, 0.7);
    scene.addChild(hp2);

    var hp3 = new Sprite(70, 29);
    hp3.image = core.assets.player;
    hp3.x = 28 + 10;
    hp3.y = 5;
    hp3.hp = 3;
    hp3.scale(0.7, 0.7);
    scene.addChild(hp3);

    var hp4 = new Sprite(70, 29);
    hp4.image = core.assets.player;
    hp4.x = 56 +10;
    hp4.y = 5;
    hp4.hp = 3;
    hp4.scale(0.7, 0.7);

    // 衝突
    player.addCollision(enemyGroup);
    player.addCollision(krakenGroup);
    player.addCollision(kraken2Group);
    player.addCollision(bossGroup);
    player.addCollision(itemGroup);
    // 衝突設定
    player.on(Event.COLLISION, function (e) {
        // TODO: 衝突の振り分けを理解しましょう
        // addCollisionに設定した衝突対象はすべてEvent.COLLISIONでイベントが発生します
        // 衝突対象の所属するグループで判定しましょう
        var target = e.collision.target;
        var parent = target.parentNode;
        // アイテムと衝突したとき
        if (parent == itemGroup) {
            // パワーアップ
            this.shotPatern += 1;
            target.remove();       
            player.hp += 1;
            scene.addChild(hp4);
            player.frame = [1];
        }

        // 敵と衝突したとき
    if (parent == enemyGroup || parent == krakenGroup || parent == kraken2Group || parent == bossGroup) {    
     
/*
        // 効果音
        var sound2 = core.assets["sounds/se_maoudamashii_retro12.mp3"].clone();
        sound2.play();
        sound2.volume = 0.1;
*/
        //this.shotpatern -= 1;

        var bomb2 = new Sprite(32, 32);
        bomb2.image = core.assets.bomb;
        bomb2.x = player.x;
        bomb2.y = player.y;
        scene.addChild(bomb2);
        bomb2.frame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
        bomb2.on(Event.ANIMATION_END, function () {
        });

        this.hp -= 1;
        //hpの表示
        if (this.hp <= 3) {
            hp4.remove();
            player.frame = [0];
            this.shotPatern = 1;
        }
        if (this.hp <= 2) {
            hp3.remove();
        }
        if (this.hp <= 1) {
            hp2.remove();
        }
        if (this.hp <= 0) {
            hp.remove();
        }

        if (this.hp > 0) return;

       

        // BGMを停止    
        //bgm.stop();
        //bgm2.stop();
/*
        // 効果音
        var sound = core.assets["sounds/se_maoudamashii_retro12.mp3"].clone();
        sound.play();
        sound.volume = 0.1;
*/
        var bomb = new Sprite(32, 32);
        bomb.image = core.assets.bomb;
        bomb.x = player.x;
        bomb.y = player.y;
        scene.addChild(bomb);
        bomb.frame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
        bomb.on(Event.ANIMATION_END, function () {
        });
        // ゲームオーバー    
        gameOver();

     
    } 

    });

    // 得点表示
    var scoreLabel = new Label();
    scoreLabel.width = 90;
    scoreLabel.x = 220;
    scoreLabel.y = 10;
    scoreLabel.font = "16px arial";
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