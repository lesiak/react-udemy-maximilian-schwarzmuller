import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get('/posts')
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const postWithAuthor = posts.map((post) => ({
          ...post,
          author: 'Max',
        }));
        this.setState({ posts: postWithAuthor });
      })
      .catch((error) => this.setState({ error: true }));
  }

  postSelectedHandler = (id) => {
    this.props.history.push({ pathname: '/posts/' + id });
  };

  render() {
    let postsComponents = <p>Something went wrong!</p>;
    if (!this.state.error) {
      postsComponents = this.state.posts.map((post) => (
        // <Link key={post.id} to={'/posts/' + post.id}>
        <Post key={post.id} title={post.title} author={post.author} onClick={() => this.postSelectedHandler(post.id)} />
        // </Link>
      ));
    }

    return (
      <div>
        <section className="Posts">{postsComponents}</section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
