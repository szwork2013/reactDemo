var React = require("react");
var InfoItem = require("./InfoItem");
var Items = require("./Items");
var Refresh = require("./Refresh");
var IScroll = require("iscroll/build/iscroll-probe");
var IScrollStore = require("../stores/IScrollStore");
var EventEmitter = require("../events/EventEmitter");

var InfoList = React.createClass({
    getInitialState: function () {
        return {
            loading: true,
            downStatus: 0,
            refresh: 0,
            refresh: 0
        };
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
            click: true,
            scrollbars: false,
            fadeScrollbars: true
        };
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
            if (this.state.downStatus === 1) {
                this.setState({ downStatus: 2 });
                setTimeout(function () {
                    this.iscroll.refresh();
                    this.setState({
                        downStatus: 0,
                        refresh: this.state.refresh + 1
                    });
                }.bind(this), 1000);
            }
        }.bind(this));
        IScrollStore.changeEl(this.props.idx, this.iscroll);
    },
    ulClick: function (e) {
        e.preventDefault();
        var idx, tar = e.target;
        while (tar.nodeName.toLowerCase() !== "li") {
            if (tar.nodeName.toLowerCase() === "ul") return;
            tar = tar.parentElement;
        }
        var id = tar.getAttribute("data-id");
        EventEmitter.dispatch("showDetail", id);
    },
    render: function () {
        return (
            <div id={this.props.idx === 0 ? null : "wrap-" + this.props.idx} className="inf-warp">
                <div id={this.props.idx === 0 ? null : "scrl-" + this.props.idx} className="inf-scrl">
                    <Refresh idx={this.props.idx} downStatus={this.state.downStatus} />
                    <Items refresh={this.state.refresh} />
                </div>
            </div>
        );
    }
});

module.exports = InfoList;