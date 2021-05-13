var Block = cc.Sprite.extend({
    value: 0,
    label: null,
    blockSize: 0,
    blockSpace: 0,
    posX: 0,
    posY: 0,
    winSize: null,
    boardSize: 0,

    ctor:function (blockSize, blockSpace) {
        this.blockSize = blockSize;
        this.blockSpace = blockSpace;

        this._super(res.block_png, cc.rect(0, 0, this.blockSize, this.blockSize));

        this.initLabel();
        this.setValue(0);
    },

    exchangePositionX: function (i) {
        return i * (this.blockSize + this.blockSpace) + this.blockSpace * 2 + this.blockSize / 2;
    },

    exchangePositionY: function (i) {
        return i * (this.blockSize + this.blockSpace) + this.blockSpace * 2 + this.blockSize / 2;
    },

    initLabel: function () {
        this.label = cc.LabelTTF('0', res.lato_regular_ttf, 21);
        this.label.setPosition(this.blockSize / 2, this.blockSize / 2);
        this.addChild(this.label);
    },

    getValue: function () {
        return this.value;
    },

    setValue: function (x) {
        this.value = x;
        this.label.setString(x.toString());
        if (this.value === 0) this.setVisible(false);
            else this.setVisible(true);
    },

    moveAndChange: function(i, j, type, value) {
        this.value = value;
        var action1 = cc.moveTo(0.1, cc.p(this.exchangePositionX(i), this.exchangePositionY(j)));
        var action2 = cc.moveTo(0, cc.p(this.exchangePositionX(this.posX), this.exchangePositionY(this.posY)));

        var action3 = cc.callFunc(function () { this.setValue(value) }, this);

        var action4 = cc.ScaleBy(0, 0.8);
        var action5 = cc.ScaleBy(0.05, 1.25);

        var seq;
        if (type === 0) {
            seq = cc.sequence(action1, action2, action3);
        }
        else {
            seq = cc.sequence(action1, action2, action3, action4, action5);
        }
        this.runAction(seq);
    },

    newBlock: function (value) {
        this.value = value;
        var action1 = cc.callFunc(function () { this.setValue(value) }, this);

        var action2 = cc.ScaleBy(0, 0.8);
        var action3 = cc.ScaleBy(0.05, 1.25);

        var seq = cc. sequence(cc.delayTime(0.11), action1, action2, action3);
        this.runAction(seq);
    },

    setBoardPosition: function (i, j) {
        this.posX = i;
        this.posY = j;
        this.setPosition(this.exchangePositionX(i), this.exchangePositionY(j));
    }
});