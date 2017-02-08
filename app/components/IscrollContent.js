var React = require("react");
var IScroll = require("../../static/js/iscroll-probe");
var Page = require("./Page");
var EventEmitter = require("../events/EventEmitter");
var SubjectStore = require("../stores/SubjectStore");
var IScrollStore = require("../stores/IScrollStore");

var IscrollContent = React.createClass({
    getInitialState: function(){
        return { subjects: [] }
    },
    componentWillMount: function () {
        var subjectState = SubjectStore.getSubjectState();
        this.setState({ subjects: subjectState.subjects });
    },
    componentDidMount: function () {
        var options = {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapSpeed: 400,
            preventDefault: false
        };
        this.iscroll = new IScroll("#main-wrap", options);
        var curIdx = 0;
        this.iscroll.on("scroll", function () {
            IScrollStore.scrollContent();
        });
        var self = this;
        this.iscroll.on("scrollEnd", function () {
            if (curIdx !== this.currentPage.pageX) {
                curIdx = this.currentPage.pageX;
                var subjectState = SubjectStore.getSubjectState();
                subjectState.subjects[curIdx].load = true;
                self.setState({ subjects: subjectState.subjects });
                IScrollStore.changeEl(curIdx);
                EventEmitter.dispatch("changeNav", curIdx);
            }
            IScrollStore.scrollContentEnd();
        });
        IScrollStore.setContent(this.iscroll);
        EventEmitter.subscribe("changePage", function (newIdx) {
            curIdx = newIdx;
            this.iscroll.goToPage(newIdx, 0, 0);
            var subjectState = SubjectStore.getSubjectState();
            subjectState.subjects[curIdx].load = true;
            this.setState({ subjects: subjectState.subjects });
            IScrollStore.changeEl(curIdx);
        }.bind(this));
    },
    touchStartHandler: function (e) {
        if (e.target.className === "imgfx") {
            this.iscroll.disable();
        }
    },
    touchEndHandler: function (e) {
        if (e.target.className === "imgfx") {
            this.iscroll.enable();
        }
    },
    render: function () {
        var len = this.state.subjects.length;
        var p = 100 / len;
        var pages = this.state.subjects.map(function (item, idx) {
            return (<Page key={idx} idx={idx} type={item.type} w={p} load={item.load} />);
        });
        return (
            <div id="main-wrap" className="main-wrap">
                <div id="main-scrl" ref="mainscrl" className="main-scrl clearfix" style={{width: 100 * len + "%"}} onTouchStart={this.touchStartHandler} onTouchEnd={this.touchEndHandler}>
                    {pages}
                </div>
            </div>
        );
    }
});

module.exports = IscrollContent;