var React = require("react");
var EventEmitter = require("../events/EventEmitter");

var Indicator = React.createClass({
    getInitialState: function () {
        return {
            picIdx: 1
        }
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return this.state.picIdx !== nextState.picIdx;
    },
    componentDidMount: function () {
        EventEmitter.subscribe("picScroll", function (picIdx) {
            this.setState({ picIdx: picIdx });
        }.bind(this));
    },
    render: function () {
        var title, i, len = 2;
        var dots = [];
        for (i = 0; i < len; i++) {
            i === this.state.picIdx - 1 ?
                dots.push((<span className="dot on"></span>)) :
                dots.push((<span className="dot"></span>));
        }
        dots.push((<span className="poly"></span>));
        if (this.state.picIdx === 0) title = "asdfasefweargteargte";
        else title = "打死哦及噶饿哦平日就给哦怕入股";
        return (
            <div className="title">
                <div className="f-l">
                    <span>{title}</span>
                    <i className="demo-icon icon-picture">&#xe800;</i>
                </div>
                <div className="f-r h-100pct">
                    <div className="h-100pct">
                        {dots}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Indicator;