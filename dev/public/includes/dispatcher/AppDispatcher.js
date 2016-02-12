var Dispatcher = require("flux").Dispatcher;
var assign = require("object-assign");
var AppConstants = require("../constants/AppConstants.js");

var AppDispatcher = assign(new Dispatcher(), {
  handleAction: function (action) {
    this.dispatch({
      source: "VIEW_ACTION",
      action: action
    });
  }
});

module.exports = AppDispatcher;
