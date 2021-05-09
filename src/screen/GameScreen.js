var GameScreen = cc.Layer.extend({
    blocks : null,
    boardSize : 0,
    winSize : null,
    score: null,
    scoreLabel: null,
    boardBG: null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        winSize = cc.director.getWinSize();

        this.initBackGround();
        this.initBoard();
        this.initBlocks();
        this.initScore();
        this.addTouchListener();
        this.addKeyBoardListener();
        this.increaseRandomBlock();
    },

    initBackGround:function () {
        var backGround = new cc.Sprite(res.background_png);
        backGround.setScale(winSize.width / backGround.width);
        backGround.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(backGround);
    },

    initBoard: function () {
        this.boardBG = new cc.Sprite(res.blockbg_png);
        this.boardBG.setAnchorPoint(0.5, 0.5);
        this.boardBG.setScale(winSize.width * 0.94 / 200);
        this.boardBG.setPosition(winSize.width / 2, winSize.width / 2);
        this.addChild(this.boardBG);
    },

    initBlocks: function () {
        this.boardSize = MW.BOARD_SIZE;
        var blockSpace = winSize.width * 0.03;
        var blockSize = (winSize.width - blockSpace * (this.boardSize + 3)) / this.boardSize;

        this.blocks = Array.from(Array(this.boardSize), () => new Array(this.boardSize));

        var i, j;
        for (i = 0; i < this.boardSize; i++)
            for (j = 0; j < this.boardSize; j++) {
                this.blocks[i][j] = new Block(blockSize, blockSpace);
                this.blocks[i][j].setBoardPosition(i, j);
                this.addChild(this.blocks[i][j]);
            }
    },

    initScore: function () {
        this.score = 0;
        this.scoreLabel = new cc.LabelTTF('0', res.lato_regular_ttf, 40);
        this.setAnchorPoint(cc.p(0, 0));
        this.scoreLabel.setPosition(50, winSize.width + 50);
        this.addChild(this.scoreLabel);
    },

    endGame: function () {

    },

    addScore: function (value) {
        this.score += value;
        this.scoreLabel.setString(this.score.toString());
    },

    increaseRandomBlock: function () {
        var i, j;
        var cnt = 0;
        for (i = 0; i < this.boardSize; ++i)
            for (j = 0; j < this.boardSize; ++j)
                if (this.blocks[i][j].value === 0) cnt++;

        if (cnt === 0) {
            this.endGame();
        }

        var pos = Math.floor((Math.random() * cnt));
        var value = Math.floor((Math.random() * 2) + 1) * 2;

        for (i = 0; i < this.boardSize; ++i)
            for (j = 0; j < this.boardSize; ++j)
                if (this.blocks[i][j].value === 0) {
                    if (pos === 0) this.blocks[i][j].newBlock(value);
                    pos--;
                }
    },

    solveOneLine: function (type, array) {
        if (type === 1) array.reverse();

        var moveTo = [], value = [];
        var x = 0, i;

        for (i = 0; i < this.boardSize; ++i) {
            moveTo.push(-1);
            value.push(0);
        }

        for (i = 0; i < this.boardSize; ++i) {
            if (array[i] === 0) {
                moveTo[i] = x;
                continue;
            }
            if (value[x] === 0) {
                moveTo[i] = x;
                value[x] = array[i];
                continue;
            }

            if (value[x] === array[i]) {
                this.addScore(value[x] * 2);
                moveTo[i] = x;
                value[x] = - value[x] * 2;
                x++;
            }
            else {
                x++;
                moveTo[i] = x;
                value[x] = array[i];
            }
        }

        if (type === 1) {
            array.reverse();
            value.reverse();
            moveTo.reverse();

            for (i = 0; i < this.boardSize; ++i)
                moveTo[i] = this.boardSize - moveTo[i] - 1;
        }

        return [moveTo, value];
    },

    moveDown: function () {
        var i, j, check = false;
        for (i = 0; i < this.boardSize; ++i) {
            var array = [];
            for (j = 0; j < this.boardSize; ++j)
                array.push(this.blocks[i][j].value);

            var moveTo = [], value = [];
            [moveTo, value] = this.solveOneLine(0, array);

            for (j = 0; j < this.boardSize; ++j) {
                if (array[j] !== value[j]) check = true;
                if (value[j] >= 0) this.blocks[i][j].moveAndChange(i, moveTo[j], 0, value[j]);
                else this.blocks[i][j].moveAndChange(i, moveTo[j], 1, -value[j]);
            }
        }
        if (check) this.increaseRandomBlock();
    },

    moveRight: function () {
        var i, j, check = false;
        for (j = 0; j < this.boardSize; ++j) {
            var array = [];
            for (i = 0; i < this.boardSize; ++i)
                array.push(this.blocks[i][j].value);

            var moveTo = [], value = [];
            [moveTo, value] = this.solveOneLine(1, array);

            for (i = 0; i < this.boardSize; ++i) {
                if (array[i] !== value[i]) check = true;
                if (value[i] >= 0) this.blocks[i][j].moveAndChange(moveTo[i], j, 0, value[i]);
                else this.blocks[i][j].moveAndChange(moveTo[i], j, 1, -value[i]);
            }
        }
        if (check) this.increaseRandomBlock();
    },

    moveUp: function () {
        var i, j, check = false;
        for (i = 0; i < this.boardSize; ++i) {
            var array = [];
            for (j = 0; j < this.boardSize; ++j)
                array.push(this.blocks[i][j].value);

            var moveTo = [], value = [];
            [moveTo, value] = this.solveOneLine(1, array);

            for (j = 0; j < this.boardSize; ++j) {
                if (array[j] !== value[j]) check = true;
                if (value[j] >= 0) this.blocks[i][j].moveAndChange(i, moveTo[j], 0, value[j]);
                else this.blocks[i][j].moveAndChange(i, moveTo[j], 1, -value[j]);
            }
        }
        if (check) this.increaseRandomBlock();
    },

    moveLeft: function () {
        var i, j, check = false;
        for (j = 0; j < this.boardSize; ++j) {
            var array = [];
            for (i = 0; i < this.boardSize; ++i)
                array.push(this.blocks[i][j].value);

            var moveTo = [], value = [];
            [moveTo, value] = this.solveOneLine(0, array);

            for (i = 0; i < this.boardSize; ++i) {
                if (array[i] !== value[i]) check = true;
                if (value[i] >= 0) this.blocks[i][j].moveAndChange(moveTo[i], j, 0, value[i]);
                else this.blocks[i][j].moveAndChange(moveTo[i], j, 1, -value[i]);
            }
        }
        if (check) this.increaseRandomBlock();
    },

    addKeyBoardListener: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (key, event) {
                switch (key) {
                    case cc.KEY.left:
                        self.moveLeft();
                        break;
                    case cc.KEY.up:
                        self.moveUp();
                        break;
                    case cc.KEY.right:
                        self.moveRight();
                        break;
                    case cc.KEY.down:
                        self.moveDown();
                        break;
                }
            }
        }, this);
    },

    addTouchListener: function () {

    },
});

GameScreen.scene = function () {
   var scene = new cc.Scene();
   var layer = new GameScreen();
   scene.addChild(layer);
   return scene;
}