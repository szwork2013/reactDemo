var React = require("react");
var AttachInfo = require("./AttachInfo");

var PicItem = React.createClass({
    render: function () {
        return (
            <li className="pic-it retinab">
                <img className="pic-img" src={this.props.url} alt="" />
                <div className="pic-cont">
                    <h3 className="pic-title">{this.props.title}</h3>
                    <AttachInfo count={this.props.count} time={this.props.time} />
                </div>
            </li>
        );
    }
});

module.exports = PicItem;