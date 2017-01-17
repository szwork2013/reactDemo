var React = require("react");

var PicCarouselItem = React.createClass({
    render: function () {
        return (
            <div className="slide" style={{width:this.props.w + "%"}}>
                <img className="imgfx" src={this.props.source} alt="remark" />
            </div>
        );
    }
});

module.exports = PicCarouselItem;