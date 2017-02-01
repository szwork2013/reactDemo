var React = require("react");
var InfoItem = require("./InfoItem");
var IScrollStore = require("../stores/IScrollStore");

var Items = React.createClass({
    getInitialState: function () {
        return {
            data: []
        }
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return this.props.refresh !== nextProps.refresh || this.state.data !== nextState.data;
    },
    componentDidMount: function () {
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
    },
    componentDidUpdate() {
        var iscroll = IScrollStore.getCurScrollEl();
        iscroll.refresh();
    },
    render: function () {
        var infoitems = this.state.data.map(function (item, idx) {
            return (<InfoItem url={item.url} title={item.title} time={item.time} key={idx} id={item.id} />);
        });
        return (
            <ul>
                {infoitems}
            </ul>
        )
    }
});

module.exports = Items;