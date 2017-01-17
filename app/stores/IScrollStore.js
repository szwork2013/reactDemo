var IScrollStore = {
    _nav: null,
    _content: null,
    _els: [],
    _length: 0,
    _curIdx: 0,
    _elMove: false,
    _contentMove: false,
    _scrollStartX: 0,
    _scrollStartY: 0,
    init: function (length) {
        this._length = length;
        this._els = new Array(length);
    },
    enableEl: function () {
        if (this._els[this._curIdx]) this._els[this._curIdx].enable();
    },
    disableEl: function () {
        if (this._els[this._curIdx]) this._els[this._curIdx].disable();
    },
    setNav: function (iscroll) {
        this._nav = iscroll;
    },
    setContent: function (iscroll) {
        this._content = iscroll;
    },
    scrollContent: function () {
        this.disableEl();
    },
    scrollContentEnd: function () {
        this.enableEl();
    },
    scrollElStart: function () {
        this._elMove = false;
        this._contentMove = false;
        this._scrollStartX = this._content.x;
        this._scrollStartY = this._els[this._curIdx].y;
    },
    scrollEl: function () {
        var moveX, moveY, curScroll = this._els[this._curIdx];
        if (!this._elMove && !this._contentMove) {
            moveX = Math.abs(this._content.x - this._scrollStartX);
            moveY = Math.abs(curScroll.y - this._scrollStartY);
            if (moveX > 5 || moveY > 5) {
                if (moveX > moveY) {
                    curScroll.disable();
                    curScroll.scrollTo(0, this._scrollStartY);
                    this._contentMove = true;
                } else {
                    this._content.disable();
                    this._content.goToPage(this._content.currentPage.pageX, 0);
                    this._elMove = true;
                }
            }
        }
    },
    scrollElEnd: function () {
        this._content.enable();
    },
    scrollElPrev: function () {
        if (this._curIdx !== 0) {
            this._content.goToPage(--this._curIdx, 0, 400);
        }
    },
    scrollElNext: function () {
        if (this._curIdx !== this._length - 1) {
            this._content.goToPage(++this._curIdx, 0, 400);
        }
    },
    changeEl: function (idx, iscroll) {
        this.disableEl();
        this._curIdx = idx;
        if (!this._els[this._curIdx]) this._els[this._curIdx] = iscroll;
        this.enableEl();
    }
};

module.exports = IScrollStore;