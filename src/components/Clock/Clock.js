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
        <Side sideClick={() => this.props.sideClick('left')} time={this.props.leftTime} name="left"/>
        <Side sideClick={() => this.props.sideClick('right')} time={this.props.rightTime} name="right"/>
      </div>
    );
  }

}

export default Clock;