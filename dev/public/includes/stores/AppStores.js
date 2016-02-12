var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants.js");
var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var AppStore = assign({}, EventEmitter.prototype, {
  power: false,
  emitChange: function() {
    this.emit(AppConstants.CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    this.on("change", callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener("change", callback);
  }
});

AppDispatcher.register(function (payload) {
  switch (payload.action.actionType) {
    case AppConstants.FLIPPED_SWITCH:
      console.log("Player turned game on");
      AppStore.emitChange();
      break;
    case AppConstants.CLICKED_BUTTON:
      console.log("Player clicked button");
      break;
  }
  return true;
});

module.exports = AppStore;
