var React = require("react");
var ReactDOM = require("react-dom");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("./constants/AppConstants.js");
var AppDispatcher = require("./dispatcher/AppDispatcher.js");
var AppActions = require("./actions/AppActions.js");
var AppStore = require("./stores/AppStores.js");



var Board = React.createClass({
  _generateQueueElement: function () {
    return Math.floor(Math.random() * 4);
  },
  getInitialState: function () {
    return {
      queue: []
    };
  },
  render: function () {
    return (
      <div>
        <Menu />
        <GameBlock id="GREEN"/>
        <GameBlock id="RED"/>
        <GameBlock id="BLUE"/>
        <GameBlock id="YELLOW"/>
      </div>
    );
  }
});

var Menu = React.createClass({
  render: function () {
    return (
      <div>
        <MenuDisplay />
        <MenuPower />
        <MenuStrictMode />
      </div>
    );
  }
});
var MenuPower = React.createClass({
  _onClickHandler: function () {
    AppActions.flipPowerSwitch();
  },
  render: function () {
    return (
      <div>I am a power button</div>
    );
  }
});
var MenuStrictMode = React.createClass({
  render: function () {
    return (
      <div>I am strict mode switch</div>
    );
  }
});
var MenuDisplay = React.createClass({
  render: function () {
    return (
      <div>I am the display</div>
    );
  }
});

var GameBlock = React.createClass({
  _onClickHandler: function () {
    AppActions.clickedButton(AppConstants[this.props.id]);
  },
  render: function () {
    return (
      <button id={this.props.id} onClick={this._onClickHandler}>I am a gameblock</button>
    );
  }
});

ReactDOM.render(
  <Board />,
  document.getElementById("game-board")
);
