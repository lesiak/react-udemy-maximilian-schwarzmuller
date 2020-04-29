import React, { Component } from 'react';

class UserInput extends Component {
  render() {
    return (
      <div>
        Change First user name:{' '}
        <input type="text" onChange={this.props.change} />
      </div>
    );
  }
}

export default UserInput;
