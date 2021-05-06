var Block = cc.Sprite.extend({
    value: 0,
    label: null,
    blockSize: 0,
    blockSpace: 0,

    ctor:function () {
        this.blockSize = 60;
        this.blockSpace = 10;

        this._super(res.block_png);

        this.initLabel();
        this.setValue(0);
    },

    initLabel: function () {
        this.label = cc.LabelTTF('0', res.billy_ohio_ttf, 21);
        this.label.setPosition(this.blockSize / 2, this.blockSize / 2);
        this.addChild(this.label);
    },

    getValue: function () {
        return this.value;
    },

    setValue: function (x) {
        this.value = x;
        this.label.setString(x.toString());
    },

    setBoardPosition: function (i, j) {
        this.setPosition((i + 1) * (this.blockSize + this.blockSpace), (j + 1) * (this.blockSize + this.blockSpace));

    }
});