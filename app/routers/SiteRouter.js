var React = require("react");
var ReactRouter = require("react-router");
var createBrowserHistory  = require("history/lib/createBrowserHistory");
var SiteLayout = require("../components/SiteLayout");
var InfoList = require("../components/InfoList");
var PicList = require("../components/PicList");
var SiteMain = require("../components/SiteMain");
var IscrollContent = require("../components/IscrollContent");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

var routes = (
    <Router history={createBrowserHistory()}>
        <Route component={SiteLayout}>
            <Route component={SiteMain}>
                <Route path="/" component={IscrollContent} />
            </Route>
        </Route>
    </Router>
);

var SiteRouter = React.createClass({
    render: function () {
        return (routes);
    }
});

module.exports = SiteRouter;