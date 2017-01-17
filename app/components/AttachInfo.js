var React = require("react");

var AttachInfo = React.createClass({
    render: function () {
        return (
            <p className="att-info clearfix">
                <span className="desc_l">{this.props.count}</span>
                <time className="desc_r">{this.props.time}</time>
            </p>
        );
    }
});

module.exports = AttachInfo;