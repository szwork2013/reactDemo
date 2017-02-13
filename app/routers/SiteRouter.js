var React = require("react");
var ReactRouter = require("react-router");
var createBrowserHistory  = require("history/lib/createBrowserHistory");
var SiteLayout = require("../components/SiteLayout");
var InfoList = require("../components/InfoList");
var PicList = require("../components/PicList");
var SiteMain = require("../components/SiteMain");
var IscrollContent = require("../components/IscrollContent");
var Config = require("../stores/ConfigStore");
var EventEmitter = require("../events/EventEmitter");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

(function () {
    var supportOrientation = ("orientation" in window && "onorientationchange" in window);
    var init = function () {
        var updateOrientation = function () {
            if (supportOrientation) {
                Config.portrait = window.orientation === 0 || window.orientation === 180;
            } else {
                Config.portrait = window.innerHeight > window.innerWidth;
            }
            EventEmitter.dispatch("rotate");
        };
        if (supportOrientation) {
            window.addEventListener("orientationchange", updateOrientation, false);
        } else {
            window.addEventListener("resize",updateOrientation,false);
        }
        updateOrientation();
    };
    window.addEventListener("DOMContentLoaded", init, false);
})();

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