var MenuScreen = cc.Layer.extend({
    winSize : null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        winSize = cc.director.getWinSize();
        this.initBackGround();
    },

    initBackGround:function () {
        var backGround = new cc.Sprite(res.background_png);
        backGround.setScale(winSize.width / backGround.width);
        backGround.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(backGround);

        var title = new cc.LabelTTF("2048", res.billy_ohio_ttf, 100);
        title.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(title);
    }



})

MenuScreen.scene = function () {
    var scene = new cc.Scene();
    var layer = new MenuScreen();
    scene.addChild(layer);
    return scene;
};