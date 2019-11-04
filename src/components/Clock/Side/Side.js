import React, { Component } from 'react';
import classes from './Side.module.css';

class Side extends Component {
  shouldComponentUpdate(nextProps){
    if (this.props.timeString !== nextProps.timeString || this.props.isTurn !== nextProps.isTurn) return true
    return false
  }

  render(){
    let sideClasses = [classes.Side];
    this.props.isTurn ? sideClasses.push(classes.Turn) : sideClasses.push(classes.NotTurn);
    this.props.name === 'left' ? sideClasses.push(classes.Border1) : sideClasses.push(classes.Border2)

    return(
      <div onClick={this.props.sideClick} className={sideClasses.join(' ')}>
        <div>
          <p>
            {this.props.timeString}
          </p>
        </div>
      </div>
    )
  }

}

export default Side;