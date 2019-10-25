import React, { Component } from 'react';
import classes from './Side.module.css';
import chessTimeParser from '../../../helpers/chessTimeParser';

class Side extends Component {
  render(){
    const timeString = chessTimeParser(this.props.time);

    let wrapperClass;
    if (timeString.length < 6) {
      wrapperClass = classes['timeWrapperNoMilliseconds']
    } else {
      wrapperClass = classes['timeWrapperMilliseconds']
    }

    let sideClasses = [classes.Side];
    this.props.turn ? sideClasses.push(classes.Turn) : sideClasses.push(classes.NotTurn);
    this.props.name === 'left' ? sideClasses.push(classes.BorderRight) : sideClasses.push(classes.BorderLeft)

    return(
      <div onClick={this.props.sideClick} className={sideClasses.join(' ')}>
        <div className={wrapperClass}>
          <p>
            {timeString}
          </p>
        </div>
      </div>
    )
  }

}

export default Side;