var assets = {
    moji1 : "images/homep1.png",
    moji2 : "images/homep2.png",
    co : "images/clovph.png",
    meda : "images/medaru01.png",
    meda2: "images/medaru02.png",
    // 背景
    title : "images/homeph.png",
    back : "images/course02.png",
    back2 : "images/course02boss.png",
    // 惑星
    //"images/planet_05.png",
    // プレイヤー
   player :  "images/parts1.png",
   // "images/phoenixk.png",
    god : "images/kamida.png",
    // 弾
    bullet : "images/phtama.png",
    //"images/bullet_purple.png", 
    bang : "images/bang2.png",
    // 敵
    enemy : "images/goburin.png",
    enemy02 : "images/nessy02.png",
    kraken : "images/kraken.png",
    //"images/nessyk.png",
    //"images/krakenk.png",
    boss : "images//boss02.png",
    bomb : "images/jon.png",
    item: "images/itemf1.png",
    ai: "images/bossdan.png",
};


enchant();
var core;
window.onload = function () {
    core = new Core(320, 320);
    core.fps = 30;
    core.preload(assets);
    core.onload = function () {
        titleStart();
    };
    // HACK: core.start を core.debug に変えてみましょう
    // スプライトが赤く囲われて大きさがわかるようになります
    // core.debug();
    core.start();
}

// 配列の要素を繰り返す
// var ary = [1,2,3].repeatOneByOne(3);
// console.log(ary);
// -> [1,1,1,2,2,2,3,3,3] 
Array.prototype.repeatOneByOne = function (count) {
    var ary = [];
    var _ary = this;
    while ((__ary = _ary.shift()) !== undefined) {
        for (var i = 0; i < count; i++) {
            ary.push(__ary);
        }
    }
    return ary;
}
