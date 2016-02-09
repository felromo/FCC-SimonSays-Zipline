var React = require("react");
var ReactDOM = require("react-dom");

var Board = React.createClass({
  displayName: "Board",

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(Menu, null),
      React.createElement(GameBlock, null),
      React.createElement(GameBlock, null),
      React.createElement(GameBlock, null),
      React.createElement(GameBlock, null)
    );
  }
});

var Menu = React.createClass({
  displayName: "Menu",

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(MenuDisplay, null),
      React.createElement(MenuPower, null),
      React.createElement(MenuStrictMode, null)
    );
  }
});
var MenuPower = React.createClass({
  displayName: "MenuPower",

  render: function () {
    return React.createElement(
      "div",
      null,
      "I am a power button"
    );
  }
});
var MenuStrictMode = React.createClass({
  displayName: "MenuStrictMode",

  render: function () {
    return React.createElement(
      "div",
      null,
      "I am strict mode switch"
    );
  }
});
var MenuDisplay = React.createClass({
  displayName: "MenuDisplay",

  render: function () {
    return React.createElement(
      "div",
      null,
      "I am the display"
    );
  }
});

var GameBlock = React.createClass({
  displayName: "GameBlock",

  render: function () {
    return React.createElement(
      "button",
      null,
      "I am a gameblock"
    );
  }
});

ReactDOM.render(React.createElement(Board, null), document.getElementById("game-board"));
//# sourceMappingURL=main-babel.js.map
