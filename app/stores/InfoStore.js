var AppStore = require("./AppStore");
var EventEmitter = require("../events/EventEmitter");

var InfoStore = function () {
    var store = new AppStore();
    store.infos = [];
    store.getInfoState = function () {
        return { infos: this.infos };
    };
    return store;
}();

var getInfos = function () {

}