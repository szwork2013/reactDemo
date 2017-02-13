var React = require("react");

var PicCarouselItem = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return this.props.refresh !== nextProps.refresh;
    },
    render: function () {
        return (
            <div className="slide" style={{width:this.props.w + "%"}}>
                <img className="imgfx" src={this.props.source} alt="remark" />
            </div>
        );
    }
});

module.exports = PicCarouselItem;