var React = require("react");
var ReactRouter = require("react-router");
var IScroll = require("iscroll/build/iscroll-probe");
var EventEmitter = require("../events/EventEmitter");
var SubjectStore = require("../stores/SubjectStore");
var IScrollStore = require("../stores/IScrollStore");

var Link = ReactRouter.Link;

var SiteNav = React.createClass({
    getInitialState: function(){
        return { curIdx: 0, subjects: [] }
    },
    componentWillMount: function () {
        EventEmitter.subscribe("subjectListDid", function () {
            var subjectState = SubjectStore.getSubjectState();
            this.setState({ subjects: subjectState.subjects });
        }.bind(this));
        EventEmitter.dispatch("subjectList");
    },
    componentDidMount: function () {
        var options = { scrollX: true, scrollY: false, click: true };
        var navscrl = React.findDOMNode(this.refs.navscrl);
        var lis = navscrl.getElementsByTagName("li");
        var len = lis.length, i, w = 0;
        for (i = 0; i < len; i++) {
            w += lis[i].clientWidth;
        }
        navscrl.style.width = w + "px";
        var self = this;
        this.iscroll = new IScroll("#nav_wrap", options);
        this.iscroll.on("beforeScrollStart", function () {
        });
        IScrollStore.init(this.state.subjects.length);
        IScrollStore.setNav(this.iscroll);
        EventEmitter.subscribe("changeNav", function (newIdx) {
            self.setState({
                curIdx: newIdx
            });
            var item = lis[newIdx];
            self.iscroll.scrollToElement(item, 400, true);
        });
    },
    ulClick: function (e) {
        e.preventDefault();
        var idx, tar = e.target;
        if (tar.nodeName.toLowerCase() === "li") {
            idx = +tar.getAttribute("data-reactid").match(/.*\$(\d*)/i)[1];
            if (idx !== this.state.curIdx) {
                this.setState({
                    curIdx: idx
                });
                EventEmitter.dispatch("changePage", idx);
                this.iscroll.scrollToElement(tar, 400, true);
            }
        }
    },
    render: function () {
        var lis = this.state.subjects.map(function (item, idx) {
            if (idx === this.state.curIdx) {
                return (<li key={idx} className="navli-s on">{item.name}</li>);
            } else {
                return (<li key={idx} className="navli-s">{item.name}</li>);
            }
        }.bind(this));
        return (
            <nav id="nav_wrap" className="nav">
                <div id="nav_scrl" className="nav-scrl" ref="navscrl">
                    <ul className="navul-s" ref="navul" onClick={this.ulClick}>
                        {lis}
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = SiteNav;