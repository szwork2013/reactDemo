var React = require("react");

var SiteMain = React.createClass({
    render: function () {
        return (
            <main className="content">
                {this.props.children}
            </main>
        );
    }
});

module.exports = SiteMain;