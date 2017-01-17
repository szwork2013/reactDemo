var React = require("react");

var Refresh = React.createClass({
    render: function () {
        return (
            <div id={"pullDown-" + this.props.idx} className="pullDown">
			    <span className="pullDownIcon"></span>
                <span className="pullDownLabel">Pull down to refresh...</span>
		    </div>
        );
    }
});

module.exports = Refresh;