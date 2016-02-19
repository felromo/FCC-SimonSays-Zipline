var React = require("react");
var ReactDOM = require("react-dom");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("./constants/AppConstants.js");
var AppDispatcher = require("./dispatcher/AppDispatcher.js");
var AppActions = require("./actions/AppActions.js");
var AppStore = require("./stores/AppStores.js");
var $ = require("jquery");

function runThroughSequence(sequence) {
  // take the sequence and run through every element
  var seconds = .6;
  var highlight_delay  = seconds * 1000;
  setTimeout(function () {
    sequence.forEach(function (value, index) {
      // for every element take the value and run it through ids to select the element
      console.log("my value is: " + value)
      setTimeout( function () {
        switch (value) {
          case "GREEN":
            // console.log("I'm running for green");
            console.log($("#GREEN").css("background"));
            // $("#GREEN").css("background", "#4af5be").delay(500).queue(function () {
            //   $("#GREEN").css("background", "#38ac87").dequeue();
            // });
            $("#GREEN").addClass("GREEN");
            setTimeout(function () {
              $("#GREEN").removeClass("GREEN");
            }, highlight_delay);
            break;
          case "RED":
            // console.log("I'm running for red");
            console.log($("#RED").css("background"));
            // $("#RED").css("background", "#f97487").delay(500).queue(function () {
            //   $("#RED").css("background", "#f73955").dequeue();
            // });
            $("#RED").addClass("RED");
            setTimeout(function () {
              $("#RED").removeClass("RED");
            }, highlight_delay);
            break;
          case "YELLOW":
            // console.log("I'm running for yellow");
            console.log($("#YELLOW").css("background"));
            // $("#YELLOW").css("background", "#f7d876").delay(500).queue(function () {
            //   $("#YELLOW").css("background", "#eec84c").dequeue();
            // });
            $("#YELLOW").addClass("YELLOW");
            setTimeout(function () {
              $("#YELLOW").removeClass("YELLOW");
            }, highlight_delay);
            break;
          case "BLUE":
            // console.log("I'm running for blue");
            console.log($("#BLUE").css("background"));
            // $("#BLUE").css("background", "#34bcec").delay(500).queue(function () {
            //   $("#BLUE").css("background", "#2a96bd").dequeue();
            // });
            $("#BLUE").addClass("BLUE");
            setTimeout(function () {
              $("#BLUE").removeClass("BLUE");
            }, highlight_delay);
            break;
        }
      }, 800 * index);
    });
  }, highlight_delay);

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
    AppActions.sequenceLengthIncremented(this.queue);
    runThroughSequence(this.queue);
    } else {
      this.queue = [];
      AppActions.sequenceLengthIncremented(this.queue);
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
      AppActions.sequenceLengthIncremented(this.queue);
      runThroughSequence(this.queue);
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
        <Menu powerSwitch={this._powerSwitch} queueLength={this.queue.length}/>
        <GameBlock id="GREEN" onButtonClick={this._onButtonClick}/>
        <GameBlock id="RED" onButtonClick={this._onButtonClick}/>
        <GameBlock id="YELLOW" onButtonClick={this._onButtonClick}/>
        <GameBlock id="BLUE" onButtonClick={this._onButtonClick}/>
      </div>
    );
  }
});

var Menu = React.createClass({
  render: function () {
    return (
      <div className="menu">
        <MenuDisplay queueLength={this.props.queueLength}/>
        <MenuPower powerSwitch={this.props.powerSwitch}/>
        <MenuStrictMode />
      </div>
    );
  }
});
var MenuPower = React.createClass({
  _onClickHandler: function () {
    // AppActions.flipPowerSwitch();
    this.props.powerSwitch();
  },
  render: function () {
    return (
      <div className="menu-power" onClick={this._onClickHandler}><i className="fa fa-power-off"></i></div>
    );
  }
});
var MenuStrictMode = React.createClass({
  _onClickHandler: function () {
    $('.menu-mode-label i').toggleClass('strict-mode-active');
  },
  render: function () {
    return (
      <div className="menu-mode" onClick={this._onClickHandler}>
        <p className="menu-mode-label">Strict<i className="fa fa-circle"></i></p>
      </div>
    );
  }
});
var MenuDisplay = React.createClass({
  componentWillMount: function () {
    AppStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    AppStore.removeChangeListener(this._onChange);
  },
  _onChange: function () {
    //TODO: here is where we should update the state that is being displayed
    console.log("I heard it");
    this.setState({
      queueLength: AppStore.getSequence().length
    });
  },
  getInitialState: function () {
    return {
      queueLength: 0
    };
  },
  render: function () {
    return (
      <div className="menu-display">
        <p>{this.state.queueLength}</p>
      </div>
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
      <button id={this.props.id} className="simon-button"onClick={this._onClickHandler}></button>
    );
  }
});

ReactDOM.render(
  <Board />,
  document.getElementById("game-board")
);
