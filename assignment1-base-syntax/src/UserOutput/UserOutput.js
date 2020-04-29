import React, { Component } from 'react';

class UserOutput extends Component {
  render(props) {
    const componentStyle = {
      margin: '10px',
      padding: '10px',
      backgroundColor: '#efefef',
    };

    return (
      <div style={componentStyle}>
        <p>Hello {this.props.name}</p>
        <p>You have no tasks planned for today</p>
      </div>
    );
  }
}

export default UserOutput;
