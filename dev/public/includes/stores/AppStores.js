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
  },
  sequence: [],
  getSequence: function () {
    return this.sequence;
  }
});

AppDispatcher.register(function (payload) {
  switch (payload.action.actionType) {
    case AppConstants.FLIPPED_SWITCH:
      console.log("Player turned game on");
      break;
    case AppConstants.CLICKED_BUTTON:
      console.log(payload.action.data);
      break;
    case "SEQUENCE_INCREMENTED":
      // console.log(payload.action.data);
      console.log("can you hear me I changed?");
      AppStore.sequence = payload.action.data;
      break;
    default:
      return true;
  }
  AppStore.emitChange();
  return true;
});

module.exports = AppStore;
