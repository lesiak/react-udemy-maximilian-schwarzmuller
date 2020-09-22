import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
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
    this.setState({ selectedPostId: id });
  };

  render() {
    let postsComponents = <p>Something went wrong!</p>;
    if (!this.state.error) {
      postsComponents = this.state.posts.map((post) => (
        <Link key={post.id} to={'/' + post.id}>
          <Post title={post.title} author={post.author} onClick={() => this.postSelectedHandler(post.id)} />
        </Link>
      ));
    }

    return <section className="Posts">{postsComponents}</section>;
  }
}

export default Posts;
