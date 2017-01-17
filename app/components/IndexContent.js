var React = require("react");
var PicCarousel = require("./PicCarousel");
var IndexInfoList = require("./IndexInfoList");
var Refresh = require("./Refresh");
var IScroll = require("iscroll/build/iscroll-probe");
var IScrollStore = require("../stores/IScrollStore");

var IndexContent = React.createClass({
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
            zoom: false,
            probeType: 3,
            bounce: true,
            scrollbars: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        }
        this.iscroll = new IScroll("#wrap-" + this.props.idx, options);
        this.iscroll.on("scrollStart", function () {
            IScrollStore.scrollElStart();
        });
        this.iscroll.on("scroll", function () {
            IScrollStore.scrollEl();
        });
        this.iscroll.on("scrollEnd", function () {
            IScrollStore.scrollElEnd();
        });
        IScrollStore.changeEl(this.props.idx, this.iscroll);
    },
    render: function () {
        return (
            <div id={"wrap-" + this.props.idx} className="wrap">
                <div id={"scrl-" + this.props.idx} className="scrl">
                    <Refresh idx={this.props.idx} />
                    <PicCarousel />
                    <IndexInfoList />
                </div>
            </div>
        );
    }
});

module.exports = IndexContent;