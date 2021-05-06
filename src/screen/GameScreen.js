var GameScreen = cc.Layer.extend({
    blocks : null,
    boardSize : 0,
    winSize : null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        winSize = cc.director.getWinSize();

        this.initBackGround();
        this.initBoard();
        this.initBlocks();
        this.increaseRandomBlock();
        this.addTouchListener();
        this.addKeyBoardListener();
    },

    initBackGround:function () {
        var backGround = new cc.Sprite(res.background_png);
        backGround.setScale(winSize.width / backGround.width);
        backGround.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(backGround);
    },

    initBoard: function () {
        //Draw board layout
    },

    initBlocks: function () {
        this.boardSize = MW.BOARD_SIZE;
        this.blocks = Array.from(Array(this.boardSize), () => new Array(this.boardSize));

        var i, j;
        for (i = 0; i < this.boardSize; i++)
            for (j = 0; j < this.boardSize; j++) {
                this.blocks[i][j] = new Block();
                this.blocks[i][j].setBoardPosition(i, j);
                this.addChild(this.blocks[i][j]);
            }
    },

    increaseRandomBlock: function () {
        var i, j;
        var cnt = 0;
        for (i = 0; i < this.boardSize; ++i)
            for (j = 0; j < this.boardSize; ++j)
                if (this.blocks[i][j].value === 0) cnt++;

        var pos = Math.floor((Math.random() * cnt));
        var value = Math.floor((Math.random() * 2) + 1) * 2;

        console.log(cnt);
        console.log(pos);
        console.log(value);

        for (i = 0; i < this.boardSize; ++i)
            for (j = 0; j < this.boardSize; ++j)
                if (this.blocks[i][j].value === 0) {
                    if (pos === 0) this.blocks[i][j].setValue(value);
                    pos--;
                }
    },

    moveLeft: function () {
        console.log('left');
        this.increaseRandomBlock();
    },

    moveUp: function () {
        console.log('up');
    },

    moveRight: function () {
        console.log('right');
    },

    moveDown: function () {
        console.log('down');
    },

    addTouchListener: function () {

    },

    addKeyBoardListener: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (key, event) {
                switch (key) {
                    case MW.KEYS.LEFT:
                        self.moveLeft();
                        break;
                    case MW.KEYS.UP:
                        self.moveUp();
                        break;
                    case MW.KEYS.RIGHT:
                        self.moveRight();
                        break;
                    case MW.KEYS.DOWN:
                        self.moveDown();
                        break;
                }
            }
        }, this);
    },
});

GameScreen.scene = function () {
   var scene = new cc.Scene();
   var layer = new GameScreen();
   scene.addChild(layer);
   return scene;
}