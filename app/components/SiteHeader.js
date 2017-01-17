var React = require("react");
var SiteNav = require("./SiteNav");

var SiteHeader = React.createClass({
    render: function () {
        return (
            <header id="header" className="header">
                <h1 className="logo">网讯</h1>
                <SiteNav />
            </header>
        );
    }
});

module.exports = SiteHeader;