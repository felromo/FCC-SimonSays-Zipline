var AppDispatcher = require("../dispatcher/AppDispatcher.js");
var AppConstants = require("../constants/AppConstants.js");

var AppActions = {
  clickedButton: function (button) {
    AppDispatcher.handleAction({
      actionType:AppConstants.CLICKED_BUTTON,
      data: button
    });
  },
  flipPowerSwitch: function () {
    AppDispatcher.handleAction({
      actionType:AppConstants.FLIPPED_SWITCH
    })
  }
};

module.exports = AppActions;
