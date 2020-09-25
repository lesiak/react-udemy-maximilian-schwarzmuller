import React, { Component } from 'react';

class Course extends Component {
  render() {
    console.log(this.props);
    const courseId = this.props.match.params.id;
    return (
      <div>
        <h1>_COURSE_TITLE_</h1>
        <p>You selected the Course with ID: {courseId}</p>
      </div>
    );
  }
}

export default Course;
