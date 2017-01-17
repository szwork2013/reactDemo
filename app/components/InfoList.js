var React = require("react");
var InfoItem = require("./InfoItem");
var Refresh = require("./Refresh");
var IScroll = require("iscroll/build/iscroll-probe");
var IScrollStore = require("../stores/IScrollStore");
var EventEmitter = require("../events/EventEmitter");

var InfoList = React.createClass({
    getInitialState: function () {
        return {
            loading: true
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
            zoom: false,
            probeType: 3,
            bounce: true,
            click: true,
            scrollbars: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        };
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
        var data = [
            { url: "/static/images/1_s.jpg", title: "标题", time: "2016-11-12", id: 1 },
            { url: "/static/images/2_s.jpg", title: "死贵死贵的风格发顺丰说如果特", time: "2016-11-12", id: 1 },
            { url: "/static/images/3_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
            { url: "/static/images/4_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
            { url: "/static/images/5_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
            { url: "/static/images/6_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
            { url: "/static/images/7_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 }
        ];
        var infoitems = data.map(function (item, idx) {
            return (<InfoItem url={item.url} title={item.title} time={item.time} key={idx} id={item.id} />);
        });
        return (
            <div id={this.props.idx === 0 ? null : "wrap-" + this.props.idx} className="inf-warp">
                <div id={this.props.idx === 0 ? null : "scrl-" + this.props.idx} className="inf-scrl">
                    <Refresh idx={this.props.idx} />
                    <ul onClick={this.ulClick}>
                        {infoitems}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = InfoList;