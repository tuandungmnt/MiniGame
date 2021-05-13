var MenuScreen = cc.Layer.extend({
    winSize : null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        winSize = cc.director.getWinSize();
        this.initBackGround();
        this.initButtons();
    },

    initBackGround:function () {
        var backGround = new cc.Sprite(res.background_png);
        backGround.setScale(winSize.width / backGround.width);
        backGround.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(backGround);

        var title = new cc.LabelTTF("2048", res.lato_regular_ttf, 100);
        title.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(title);
    },

    initButtons: function () {
        var i;
        for (i = 4; i <= 6; ++i) {
            var button = new ccui.Button();
            button.setTitleText(i.toString() + 'x' + i.toString());
            button.setTitleFontSize(50);
            button.setPosition(winSize.width * (i - 3) / 4, winSize.height / 4);
            button.setPressedActionEnabled(true);
            if (i === 4) button.addClickEventListener(this.game4);
            if (i === 5) button.addClickEventListener(this.game5);
            if (i === 6) button.addClickEventListener(this.game6);
            this.addChild(button);
        }
    },

    game4: function () {
        MW.BOARD_SIZE = 4;
        cc.LoaderScene.preload(g_maingame, function () {
            cc.director.runScene(GameScreen.scene());
        }, this);
    },
    game5: function () {
        MW.BOARD_SIZE = 5;
        cc.LoaderScene.preload(g_maingame, function () {
            cc.director.runScene(GameScreen.scene());
        }, this);
    },
    game6: function () {
        MW.BOARD_SIZE = 6;
        cc.LoaderScene.preload(g_maingame, function () {
            cc.director.runScene(GameScreen.scene());
        }, this);
    },
})

MenuScreen.scene = function () {
    var scene = new cc.Scene();
    var layer = new MenuScreen();
    scene.addChild(layer);
    return scene;
};