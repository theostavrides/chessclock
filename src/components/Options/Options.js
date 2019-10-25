import React, { Component, Fragment } from 'react';
import classes from './Options.module.css';

class Options extends Component {
  submit = event => {
    event.preventDefault();
    this.props.handleSubmit();
    this.props.history.push('./clock')
  }

  render(){
    return (
      <Fragment>
        <div className={classes.Options}>
          <div className={classes.Title}>
            Chess Clock
          </div>
          <form onSubmit={this.submit}>
            <label>
              <span>Time:</span>
              <input type="number" name="initialTime" value={this.props.initialTime} onChange={this.props.handleInputChange}></input>
            </label>
            <label>
              <span>Increment:</span>
              <input type="number" name="increment" value={this.props.increment} onChange={this.props.handleInputChange}></input>
            </label>
            <input type="submit" value="Start" />
          </form>
        </div>
      </Fragment>
    );
  }

}

export default Options;