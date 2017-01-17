var React = require("react");

var Indicator = React.createClass({
    render: function () {
        return (
            <div id="indicator" className="indt">
	            <div className="dotl clearfix">
                    <span className="dot"></span>
                    <span className="dot mgl_d3r"></span>
                </div>
            </div>
        );
    }
});

module.exports = Indicator;