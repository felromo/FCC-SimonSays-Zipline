var AppDispatcher = require("../dispatcher/AppDispatcher.js");
var AppConstants = require("../constants/AppConstants.js");

var AppActions = {
  clickedButton: function (button) {
    AppDispatcher.handleButtonAction({
      actionType:AppConstants.CLICKED_BUTTON,
      data: button
    });
  },
  flipPowerSwitch: function () {
    AppDispatcher.handlePowerSwitch({
      actionType:AppConstants.FLIPPED_SWITCH
    });
  },
  sequenceLengthIncremented: function (sequence) {
    AppDispatcher.handleSequenceLengthIncremented({
      actionType: "SEQUENCE_INCREMENTED",
      data: sequence
    });
  },
  playerInputIncorrectSequence: function () {
    AppDispatcher.handleSequenceLengthIncremented({
      actionType: "PLAYER_INPUT_INCORRECT_SEQUENCE"
    });
  }
};

module.exports = AppActions;
