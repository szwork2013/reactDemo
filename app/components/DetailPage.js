var React = require("react");
var InfoDetail = require("./InfoDetail");
var EventEmitter = require("../events/EventEmitter");
var ClassNames = require('classnames');

var DetailPage = React.createClass({
    getInitialState: function () {
        return {
            show: false
        };
    },
    componentDidMount: function () {
        EventEmitter.subscribe("showDetail", function () {
            this.setState({ show: true });
        }.bind(this));
    },
    backClick: function () {
        this.setState({ show: false });
    },
    render: function () {
        var detailClass = ClassNames({
            detail: true,
            l_100pct: !this.state.show,
            l_0: this.state.show
        });
        return (
            <div className={detailClass}>
                <div id="dh" className="dhead">
                    <span className="goback" onClick={this.backClick}>返回</span>
                    <span>栏目名</span>
                </div>
                <InfoDetail />
            </div>
        );
    }
});

module.exports = DetailPage;