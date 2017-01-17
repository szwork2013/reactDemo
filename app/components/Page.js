var React = require("react");
var Refresh = require("./Refresh");
var InfoList = require("./InfoList");
var PicList = require("./PicList");
var IndexContent = require("./IndexContent");

var Page = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return this.props.load !== nextProps.load;
    },
    render: function () {
        var type = this.props.type;
        var content;
        if (!this.props.load) {
            content = (<div style={{width: "100%", height: "30px"}}></div>);
        } else if (type === 0) {
            content = (
                <IndexContent idx={this.props.idx} />
            );
        } else if (type === 1) {
            content = (
                <InfoList idx={this.props.idx} />
            );
        } else {
            content = (
                <PicList idx={this.props.idx} />
            );
        }
        return (
            <div className="page" style={{width: this.props.w + "%"}}>
                {content}
            </div>
        );
    }
});

module.exports = Page;