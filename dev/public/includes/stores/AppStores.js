var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants.js");
var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var AppStore = assign({}, EventEmitter.prototype, {
  power: false,
  emitChange: function() {
    this.emit(AppConstants.CHANGE_EVENT);
  },
  emitError: function () {
    this.emit("error-change");
  },
  addChangeListener: function (callback) {
    this.on("change", callback);
  },
  addErrorListener: function (callback) {
    this.on("error-change", callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener("change", callback);
  },
  removeErrorListener: function (callback) {
    this.removeListener("error-change", callback);
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
      AppStore.emitChange();
      break;
    case "PLAYER_INPUT_INCORRECT_SEQUENCE":
      console.log("You made a mistake");
      AppStore.emitError();
      break;
    default:
      return true;
  }
  return true;
});

module.exports = AppStore;
