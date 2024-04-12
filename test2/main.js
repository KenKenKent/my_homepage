// HACK: 背景画像をTiled Map Editor で作りましょう
 var assets = [
    "images/119.png",
   // "images/pipo-charachip001.png",
   // "images/pipo-charachip019.png",
   // "images/pipo-etcchara001.png",
    "images/mati.png",
     "images/new town.png",
     "images/covit.png",
     "images/kan.png",
     "images/covitt.png",
];

enchant();
var core;
window.onload = function(){
    // HACK: 画面サイズを変えてみましょう
    // core = new Core(480, 480);
    // core = new Core(640, 640);
    // core = new Core(1280, 1280);
    core = new Core(320, 320);
    core.fps = 16;
    core.preload(assets);
    core.onload = function(){
        titleStart();
    };
    // HACK: core.start を core.debug に変えてみましょう
    // スプライトが赤く囲われて大きさがわかるようになります
    // core.debug();
    core.start();
}
