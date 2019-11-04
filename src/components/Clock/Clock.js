import React, { Component } from 'react';
import Side from './Side/Side';
import classes from './Clock.module.css';

class Clock extends Component {
  componentDidMount(){
    document.addEventListener("keyup", this.handleKeyBoardEvent, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keyup", this.handleKeyBoardEvent, false);
    clearInterval(this.props.interval)
    this.props.resetState();
  }

  handleKeyBoardEvent = (event) =>{
    if (event.code === "Space") {
      this.props.handleSpaceBarPressed();
    }
  }

  render(){
    return (
      <div className={classes.Clock}>
        <Side
          sideClick={() => this.props.sideClick('left')}
          timeString={this.props.leftTimeString}
          name="left"
          isTurn={this.props.turn === 'left'}
        />
        <Side
          sideClick={() => this.props.sideClick('right')}
          timeString={this.props.rightTimeString}
          name="right"
          isTurn={this.props.turn === 'right'}
        />
      </div>
    );
  }

}

export default Clock;