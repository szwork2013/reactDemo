var React = require("react");
var PicItem = require("./PicItem");
var Refresh = require("./Refresh");
var IScroll = require("iscroll/build/iscroll-probe");
var IScrollStore = require("../stores/IScrollStore");

var PicList = React.createClass({
    componentDidMount: function () {
        var header = document.getElementById("header");
        var h = window.screen.height - header.clientHeight;
        var wrap = document.getElementById("wrap-" + this.props.idx);
        wrap.style.height = h + "px";
        var pullDownOffset = document.getElementById("pullDown-" + this.props.idx).clientHeight;
        var options = {
            topOffset: pullDownOffset,
            startY: -pullDownOffset,
            preventDefault: false,
            probeType: 1,
            bounce: true,
            scrollbars: false,
            fadeScrollbars: true
        }
        this.iscroll = new IScroll("#wrap-" + this.props.idx, options);
        this.iscroll.on("scroolEnd", function () {
            var a = 1;
        });
        IScrollStore.changeEl(this.props.idx, this.iscroll);
    },
    render: function () {
        var data = [
            { url: "/static/images/1_s.jpg", title: "标题", time: "2016-11-12", count: 4 },
            { url: "/static/images/2_s.jpg", title: "死贵死贵的风格发顺丰说如果特", time: "2016-11-12", count: 4 },
            { url: "/static/images/3_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", count: 4 },
            { url: "/static/images/4_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", count: 4 }
        ];
        var picitems = data.map(function (item, idx) {
            return (<PicItem key={idx} url={item.url} title={item.title} time={item.time} count={item.count} />);
        });
        return (
            <div id={"wrap-" + this.props.idx} className="pic-warp">
                <div id={"scrl-" + this.props.idx} className="pic-scrl">
                    <Refresh idx={this.props.idx} />
                    <ul id="pic_ul">
                        {picitems}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = PicList;