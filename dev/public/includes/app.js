var React = require("react");
var ReactDOM = require("react-dom");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("./constants/AppConstants.js");
var AppDispatcher = require("./dispatcher/AppDispatcher.js");
var AppActions = require("./actions/AppActions.js");
var AppStore = require("./stores/AppStores.js");

function incrementQueue() {

}

var Board = React.createClass({
  power: false,
  strict_mode: false,
  queue: [],
  user_queue: [], 
  _powerSwitch: function () {
    this.power = !this.power;
    if (this.power) {
    this.queue.push(this._generateQueueElement());
    console.log(this.queue);
    } 
  },
  _generateQueueElement: function () {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
          return AppConstants.GREEN;
        break;
      case 1:
          return AppConstants.RED;
        break;
      case 2:
          return AppConstants.BLUE;
        break;
      case 3:
          return AppConstants.YELLOW;
        break;
    }
  },
  _onButtonClick: function (button) {
    var self = this;
    this.user_queue.push(button);
    // don't do any of the logic until the sequences are the same length
    if (this.user_queue.length != this.queue.length) {
      // detect errors automatically as they happen
      if (this.queue[this.user_queue.length-1] != this.user_queue[this.user_queue.length-1]) {
        this.user_queue = []; 
        console.log("Error please start the sequence over!");
      }
      return;
    } 
    var sequence_correct = this.queue.every(function (value, index) {
      return self.user_queue[index] == value;
    });
    // before you start adding elements check, if we got the sequence correct first
    if (sequence_correct && (this.user_queue.length == this.queue.length)) {      
      var tmp = this._generateQueueElement();
      this.queue.push(tmp);
      console.log("button click generation: " + tmp);
    } else {
      // if strict mode on
      if (this.strict_mode) {
        // clear queue && user_queue if we got it wrong
        this.queue = [];
      } else { // if strict mode off
        // remove the last button pressed by the user and let him try again
        this.user_queue = [];
      }
    }
    this.user_queue = [];
    console.log(this.queue);
  },
  // componentWillMount: function () {
  //   this.setState({
  //     queue: this.queue.push(this._generateQueueElement())
  //   });
  // },
  componentDidMount: function () {
   console.log(this.queue);
  },
  render: function () {
    return (
      <div className="board">
        <Menu powerSwitch={this._powerSwitch}/>
        <GameBlock id="GREEN" onButtonClick={this._onButtonClick}/>
        <GameBlock id="RED" onButtonClick={this._onButtonClick}/>
        <GameBlock id="BLUE" onButtonClick={this._onButtonClick}/>
        <GameBlock id="YELLOW" onButtonClick={this._onButtonClick}/>
      </div>
    );
  }
});

var Menu = React.createClass({
  render: function () {
    return (
      <div className="menu">
        <MenuDisplay />
        <MenuPower powerSwitch={this.props.powerSwitch}/>
        <MenuStrictMode />
      </div>
    );
  }
});
var MenuPower = React.createClass({
  _onClickHandler: function () {
    AppActions.flipPowerSwitch();
    this.props.powerSwitch();
  },
  render: function () {
    return (
      <div onClick={this._onClickHandler}>I am a power button</div>
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
    this.props.onButtonClick(AppConstants[this.props.id]);
  },
  render: function () {
    return (
      <button id={this.props.id} className="simon-button"onClick={this._onClickHandler}>{"I am a " + this.props.id + "gameblock"}</button>
    );
  }
});

ReactDOM.render(
  <Board />,
  document.getElementById("game-board")
);
