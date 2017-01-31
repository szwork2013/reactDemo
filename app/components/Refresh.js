var React = require("react");
var RefreshStore = require("../stores/RefreshStore");

var Refresh = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return this.props.downStatus !== nextProps.downStatus;
    },
    render: function () {
        return (
            <div id={"pullDown-" + this.props.idx} className="pullDown">
			    <span className="pullDownIcon"></span>
                <span className="pullDownLabel">{RefreshStore.pullDownTips[this.props.downStatus]}</span>
		    </div>
        );
    }
});

module.exports = Refresh;