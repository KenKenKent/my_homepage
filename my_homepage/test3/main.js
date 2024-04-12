var assets = {
    blocks: "images/parts.png",
    player: "images/player2.png",
    enemy: "images/Zombi.png",
    enemy2: "images/Zonbee.png",
    item: "images/pipo-etcchara001.png",
    arrow: "images/dannd2.png",
    haikei: "images/haikei.png",
    home: "images/home2.png",
    big2: "images/big2.png"
};


enchant();
var core;
window.onload = function(){
    // HACK: 画面サイズを変えてみましょう
    core = new Core(320, 320);
    // core = new Core(480, 480);
    // core = new Core(640, 640);
    // core = new Core(1280, 1280);
    // core.fps = 60;
    core.fps = 60;
    core.preload(assets);
    core.onload = function(){
        titleStart();
    };
    // HACK: core.start を core.debug に変えてみましょう
    // スプライトが赤く囲われて大きさがわかるようになります
    // core.debug();
    core.start();
}
