var React = require("react");
var PicCarousel = require("./PicCarousel");
var IndexInfoList = require("./IndexInfoList");
var Refresh = require("./Refresh");
var IScroll = require("iscroll/build/iscroll-probe");
var IScrollStore = require("../stores/IScrollStore");

var IndexContent = React.createClass({
    getInitialState: function(){
        return { downStatus: 0, reflesh: false }
    },
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
        this.iscroll.on("scrollStart", function () {
            IScrollStore.scrollElStart();
        });
        this.iscroll.on("scroll", function () {
            IScrollStore.scrollEl();
            if (this.iscroll.y >= 5 && this.state.downStatus !== 1) {
                this.setState({ downStatus: 1 });
                this.iscroll.minScrollY = 0;
            } else if (this.iscroll.y < 5 && this.state.downStatus === 1) {
                this.setState({ downStatus: 0 });
                this.iscroll.minScrollY = -pullDownOffset;
            }
        }.bind(this));
        this.iscroll.on("scrollEnd", function () {
            IScrollStore.scrollElEnd();
            this.state.downStatus === 1 && this.setState({ downStatus: 2 });
            setTimeout(function () {
                this.iscroll.refresh();
                this.setState({ downStatus: 0, refresh: true });
            }.bind(this), 1000);
        }.bind(this));
        IScrollStore.changeEl(this.props.idx, this.iscroll);
    },
    render: function () {
        return (
            <div id={"wrap-" + this.props.idx} className="wrap">
                <div id={"scrl-" + this.props.idx} className="scrl">
                    <Refresh idx={this.props.idx} downStatus={this.state.downStatus} />
                    <PicCarousel refresh={this.state.refresh} />
                    <IndexInfoList refresh={this.state.refresh} />
                </div>
            </div>
        );
    }
});

module.exports = IndexContent;