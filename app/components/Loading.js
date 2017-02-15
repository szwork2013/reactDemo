var React = require("react");

var Loading = React.createClass({
    render: function () {
        return (
            <div className="loading">
                <i className="demo-icon icon-spin6 animate-spin">&#xe839;</i>
            </div>
        );
    }
});

module.exports = Loading;