var React = require("react");

var InfoDetail = React.createClass({
    componentDidMount: function () {
        var header = document.getElementById("dh");
        var h = window.screen.height - header.clientHeight;
        var wrap = document.getElementById("art");
        wrap.style.height = h + "px";
    },
    render: function () {
        return (
            <article id="art" className="art">
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
});

module.exports = InfoDetail;