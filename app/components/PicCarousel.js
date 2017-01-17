var React = require("react");
var PicCarouselItem = require("./PicCarouselItem");
var Indicator = require("./Indicator");
var IScroll = require("iscroll/build/iscroll-probe");

var PicCarousel = React.createClass({
    getInitialState: function () {
        return {
            data: []
        }
    },
    iscrollCircle: function (t) {
        var curPage = this.iscroll.currentPage.pageX,
            nextPage = curPage + 1,
            pageSize = this.iscroll.pages.length;
        clearTimeout(t.timer);
        if (curPage === 0) {
            this.iscroll.goToPage(pageSize - 2, 0, 0);
            nextPage = pageSize - 1;
        } else if (curPage === pageSize - 1) {
            this.iscroll.goToPage(1, 0, 0);
            nextPage = 2;
        }
        t.timer = setTimeout(function () {
            this.iscroll.goToPage(nextPage, 0);
        }.bind(this), 2000);
    },
    componentWillMount: function () {
        this.setState({
            data: [
                { src: "/static/images/1.jpg" },
                { src: "/static/images/2.jpg" }
            ]
        });
    },
    componentDidMount: function () {
        var options = {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapSpeed: 400,
            keyBindings: true,
            preventDefault: true
        };
        var t = { timer: null };
        this.iscroll = new IScroll("#pic_carl", options);
        this.iscroll.goToPage(1,0,0);
        this.iscroll.on("scrollStart", function () {
            clearTimeout(t.timer);
            t.timer = setTimeout(function () {
                this.iscrollCircle(t);
            }.bind(this), 2000);
        }.bind(this));
        this.iscroll.on("scrollEnd", function () {
            this.iscrollCircle(t);
        }.bind(this));
        this.iscrollCircle(t);
    },
    render: function () {
        var _data = this.state.data;
        _data.unshift(_data[_data.length - 1]);
        _data.push(_data[1]);
        var p = 100 / _data.length;
        var pcis = _data.map(function (item, idx) {
            return (<PicCarouselItem key={idx} source={item.src} w={p} />)
        });
        var len = _data.length;
        return (
            <div id="pic_carl" className="carl" style={{height:window.screen.width * 0.75 + "px"}}>
                <div id="pic_scrl" className="scrl clearfix" style={{width:100 * len + "%"}}>
                    {pcis}
                </div>
                <Indicator />
            </div>
        );
    }
});

module.exports = PicCarousel;