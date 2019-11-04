import React, { Component } from 'react';
import Options from './components/Options/Options';
import Clock from './components/Clock/Clock';
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import './index.css';
import chessTimeParser from './helpers/chessTimeParser';


const INTERVAL_TIME = 100;

class App extends Component {
  state = {
    turn: undefined,
    initialTime: 5,
    increment: 0,
    leftTime: 15000,
    leftTimeString: chessTimeParser(15000),
    rightTime: 15000,
    rightTimeString: chessTimeParser(15000),
    clockVisible: false,
    interval: null,
  }

  isGameOver = () => {
    return (this.state.leftTime <= 0 || this.state.rightTime <= 0) ? true : false;
  }

  getOtherSide = (side) => {
    return side === 'left' ? 'right' :  'left';
  }

  handleSubmit = () => {
    this.setState((prevState, prevProps) => {
      return {
        leftTime: prevState.initialTime * 60000,
        leftTimeString: chessTimeParser(prevState.initialTime * 60000),
        rightTime: prevState.initialTime * 60000,
        rightTimeString: chessTimeParser(prevState.initialTime * 60000),
        clockVisible: true,
      };
    });
  }

  handleInputChange = (event) => {
    const inputName = event.target.name;
    let value = parseInt(event.target.value, 10);
    value = isNaN(value) ? '' : value;
    this.setState({[inputName]: value});
  }

  handleSideClick = (side) => {
    if (this.isGameOver()) return

    if (!this.state.turn) {
      this.setState({turn: side}, () => {
        this.switchSides();
      });
    }

    if (this.state.turn === side) {
      this.switchSides();
    }
  }

  handleSpaceBarPressed = () => {
    if (this.isGameOver()) return
    this.switchSides();
  }

  switchSides = () => {
    this.setState(prevState => {
      clearInterval(prevState.interval);
      const side = prevState.turn;
      const otherSide = this.getOtherSide(side);
      const nextState = {
        interval: setInterval(() => this.decreaseTime(otherSide), INTERVAL_TIME),
        turn: otherSide
      }

      if (prevState.increment) {
        nextState[side + "Time"] = prevState[side + "Time"] + prevState.increment * 1000;
        return nextState;
      } else {
        return nextState;
      }
    });
  };

  decreaseTime = (side) => {
    if (side === 'left'){
      if (this.state.leftTime <= 0) {
        clearInterval(this.state.Interval)
      } else {
        this.setState(prevState => {
          const leftTime = prevState.leftTime - INTERVAL_TIME;
          let leftTimeString = chessTimeParser(leftTime);
          return {
            leftTime,
            leftTimeString,
          }
        });
      }
    } else {
      if (this.state.rightTime <= 0) {
        clearInterval(this.state.Interval)
      } else {
        this.setState(prevState => {
          const rightTime = prevState.rightTime - INTERVAL_TIME;
          let rightTimeString = chessTimeParser(rightTime);
          return {
            rightTime,
            rightTimeString,
          }
        });
      }
    }
  }

  resetState = () => {
    this.setState({
      turn: undefined,
      leftTime: this.state.initialTime * 60 * 1000,
      rightTime: this.state.initialTime * 60 * 1000,
      clockVisible: false,
      interval: null
    })
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>

            <Route path='/clock'>
              <Clock
                turn={this.state.turn}
                leftTimeString={this.state.leftTimeString}
                rightTimeString={this.state.rightTimeString}
                sideClick={this.handleSideClick}
                handleSpaceBarPressed={this.handleSpaceBarPressed}
                resetState={this.resetState}
                interval={this.state.interval}
              />
            </Route>

            <Route
              path='/options'
              render={(props) =>
                <Options
                  {...props}
                  initialTime={this.state.initialTime}
                  increment={this.state.increment}
                  handleInputChange={this.handleInputChange}
                  handleSubmit={this.handleSubmit}
                />
              }
            />

            <Redirect to='/options' />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
