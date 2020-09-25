import React, { Component } from 'react';
import qs from 'qs';

class Course extends Component {
  render() {
    const courseId = this.props.match.params.id;
    const queryParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    return (
      <div>
        <h1>{queryParams.title}</h1>
        <p>You selected the Course with ID: {courseId}</p>
      </div>
    );
  }
}

export default Course;
