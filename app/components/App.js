var React = require("react");
var SiteRouter = require('../routers/SiteRouter');

window.onorientationchange = function () {  
    var body=document.body;  
    var viewport=document.getElementById("viewport");  
    if(body.getAttribute("orient")=="landscape"){  
        body.setAttribute("orient","portrait");  
    }else{  
        body.setAttribute("orient","landscape");  
    }  
};  

React.render(<SiteRouter />, document.body);