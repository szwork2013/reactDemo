var React = require("react");
var SiteHeader = require("./SiteHeader");
var DetailPage = require("./DetailPage");

var MainLayout = React.createClass({
    render: function () {
        return (
            <div className="app">
                <SiteHeader />
                {this.props.children}
                <DetailPage />
            </div>
        );
    }
});

module.exports = MainLayout;