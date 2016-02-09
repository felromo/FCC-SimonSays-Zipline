var React = require("react");
var ReactDOM = require("react-dom");

var Board = React.createClass({
  render: function () {
    return (
      <div>
        <Menu />
        <GameBlock />
        <GameBlock />
        <GameBlock />
        <GameBlock />
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
  render: function () {
    return (
      <button>I am a gameblock</button>
    );
  }
});

ReactDOM.render(
  <Board />,
  document.getElementById("game-board")
);
