var AppStore = require("./AppStore");
var EventEmitter = require("../events/EventEmitter");

var SubjectStore = function () {
    var store = new AppStore();
    store.curIdx = 0;
    store.subjects = [];
    store.getSubjectState = function () {
        return { subjects: this.subjects, curIdx: this.curIdx };
    };
    return store;
}();

var getSubjects = function () {
    SubjectStore.subjects = [
        { name: "首页", type: 0, load: true },
        { name: "总行快讯", type: 1, load: false },
        { name: "图片新闻", type: 2, load: false },
        { name: "信息栏目1", type: 1, load: false },
        { name: "图片栏目1", type: 2, load: false },
        { name: "信息栏目2", type: 1, load: false },
        { name: "图片栏目2", type: 2, load: false }
    ];
    EventEmitter.dispatch("subjectListDid");
};

EventEmitter.subscribe("subjectList", getSubjects);

module.exports = SubjectStore;