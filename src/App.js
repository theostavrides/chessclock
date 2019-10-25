import React, { Component } from 'react';
import Options from './components/Options/Options';
import Clock from './components/Clock/Clock';
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import './index.css';

const INTERVAL_TIME = 100;

class App extends Component {
  state = {
    turn: undefined,
    initialTime: 5,
    increment: 0,
    leftTime: 300000,
    rightTime: 300000,
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
        leftTime: prevState.initialTime * 60 * 1000,
        rightTime: prevState.initialTime * 60 * 1000,
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
      this.state.leftTime <= 0 ?
        clearInterval(this.state.Interval)
        : this.setState(prevState => ({ leftTime: prevState.leftTime - INTERVAL_TIME }));
    } else {
      this.state.rightTime <= 0 ?
        clearInterval(this.state.Interval)
        : this.setState(prevState => ({ rightTime: prevState.rightTime - INTERVAL_TIME }));
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
                leftTime={this.state.leftTime}
                rightTime={this.state.rightTime}
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
