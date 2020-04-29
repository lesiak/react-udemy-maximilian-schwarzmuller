import React, { Component } from 'react';

class UserOutput extends Component {
  render(props) {
    return (
      <div>
        <p>Hello {this.props.name}</p>
        <p>You have no tasks planned for today</p>
      </div>
    );
  }
}

export default UserOutput;
