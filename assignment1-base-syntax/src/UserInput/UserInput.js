import React, { Component } from 'react';
import './UserInput.css';

class UserInput extends Component {
  render() {
    return (
      <div className="UserInput">
        Change First user name:{' '}
        <input
          type="text"
          value={this.props.name}
          onChange={this.props.change}
        />
      </div>
    );
  }
}

export default UserInput;
