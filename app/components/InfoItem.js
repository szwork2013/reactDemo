var React = require("react");
var AttachInfo = require("./AttachInfo");

var InfoItem = React.createClass({
    render: function () {
        return (
            <li className="inf-it retinabb" data-id={this.props.id}>
                <img className="inf-img" src={this.props.url} alt="" />
                <div className="info-cont">
                    <h3 className="inf-title">{this.props.title}</h3>
                    <AttachInfo count={this.props.count} time={this.props.time} />
                </div>
            </li>
        );
    }
});

module.exports = InfoItem;