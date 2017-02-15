var React = require("react");
var Loading = require("./Loading");
var EventEmitter = require("../events/EventEmitter");
var ClassNames = require('classnames');

var InfoDetail = React.createClass({
    getInitialState: function () {
        return {
            loading: true,
            data: null
        };
    },
    componentDidMount: function () {
        EventEmitter.subscribe("infoShow", function () {
            setTimeout(function () {
                this.setState({ loading: false, data: 1 });
            }.bind(this), 2000);
        }.bind(this));
        EventEmitter.subscribe("infoInit", function () {
            this.setState({ loading: true, data: null });
        }.bind(this));
    },
    render: function () {
        var loading = (function () {
            if (this.state.loading) return (<Loading />);
        }.bind(this))();
        var data = (function () {
            var articleClass = ClassNames({
                "art": true,
                "animate-infoshow": !this.state.loading
            });
            if (this.state.loading !== null && !this.state.loading && this.state.data) {
                return (
                    <article id="art" className={articleClass}>
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        afsdfasdf<br />
                        fasdf<br />
                        fasdf<br />
                    </article>
                );
            }
        }.bind(this))();
        return (
            <div className="cont">
                {data}
                {loading}
            </div>
        );
    }
});

module.exports = InfoDetail;