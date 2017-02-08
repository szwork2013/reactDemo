var React = require("react");
var InfoItem = require("./InfoItem");
var Refresh = require("./Refresh");
var IScroll = require("../../static/js/iscroll-probe");
var IScrollStore = require("../stores/IScrollStore");
var EventEmitter = require("../events/EventEmitter");

var InfoList = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            loading: true,
            downStatus: 0,
            refresh: 0
        };
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        this.dataChanged = nextState.data !== this.state.data;
        return true;
    },
    componentDidMount: function () {
        var pullDownOffset = document.getElementById("pullDown-" + this.props.idx).clientHeight;
        var options = {
            topOffset: pullDownOffset,
            startY: -pullDownOffset,
            preventDefault: false,
            probeType: 2,
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
                        refresh: this.state.refresh + 1,
                        data: [
                            { url: "/static/images/1_s.jpg", title: "标题111", time: "2016-11-12", id: 1 },
                            { url: "/static/images/2_s.jpg", title: "死贵死贵的风格发顺丰说如果特", time: "2016-11-12", id: 1 },
                            { url: "/static/images/3_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
                            { url: "/static/images/4_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
                            { url: "/static/images/5_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
                            { url: "/static/images/6_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
                            { url: "/static/images/7_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 }
                        ]
                    });
                }.bind(this), 1000);
            }
        }.bind(this));
        this.setState({
            data: [
                { url: "/static/images/1_s.jpg", title: "标题", time: "2016-11-12", id: 1 },
                { url: "/static/images/2_s.jpg", title: "死贵死贵的风格发顺丰说如果特", time: "2016-11-12", id: 1 },
                { url: "/static/images/3_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
                { url: "/static/images/4_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
                { url: "/static/images/5_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
                { url: "/static/images/6_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 },
                { url: "/static/images/7_s.jpg", title: "死贵死贵的风格发顺丰说如", time: "2016-11-12", id: 1 }
            ]
        });
        IScrollStore.changeEl(this.props.idx, this.iscroll);
    },
    componentDidUpdate: function () {
        if (this.dataChanged) {
            this.iscroll.refresh();
        }
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
        var infoitems = this.state.data.map(function (item, idx) {
            return (<InfoItem url={item.url} title={item.title} time={item.time} key={idx} id={item.id} refresh={this.state.refresh} />);
        }.bind(this));
        return (
            <div id={this.props.idx === 0 ? null : "wrap-" + this.props.idx} className="wrap">
                <div id={this.props.idx === 0 ? null : "scrl-" + this.props.idx} className="scrl">
                    <Refresh idx={this.props.idx} downStatus={this.state.downStatus} />
                    <ul onClick={this.ulClick}>
                        {infoitems}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = InfoList;