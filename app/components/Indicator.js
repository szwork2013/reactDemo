var React = require("react");

var Indicator = React.createClass({
    render: function () {
        return (
            <div className="title">
                <div className="f-l">
                    <span>safssdf</span>
                    <i className="demo-icon icon-picture">&#xe800;</i>
                </div>
                <div className="f-r">
                    <div className="dp-ilb">
                        <span className="dot"></span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Indicator;