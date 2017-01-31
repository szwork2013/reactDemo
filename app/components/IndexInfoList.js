var React = require("react");
var InfoItem = require("./InfoItem");
var EventEmitter = require("../events/EventEmitter");

var IndexInfoList = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return this.props.refresh !== nextProps.refresh;
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
            <div className="inf-warp">
                <div className="inf-scrl">
                    <ul onClick={this.ulClick}>
                        {infoitems}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = IndexInfoList;