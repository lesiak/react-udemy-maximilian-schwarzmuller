import React, { Component } from 'react';
import qs from 'qs';

class Course extends Component {
  state = {
    courseId: null,
    title: null,
  };

  componentDidMount() {
    this.loadParamsFromQueryString();
  }

  componentDidUpdate() {
    this.loadParamsFromQueryString();
  }

  loadParamsFromQueryString() {
    const courseId = this.props.match.params.id;
    const queryParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    const title = queryParams.title;
    if (this.state.courseId !== courseId || this.state.title !== title) {
      this.setState({
        courseId: courseId,
        title: queryParams.title,
      });
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>You selected the Course with ID: {this.state.courseId}</p>
      </div>
    );
  }
}

export default Course;
