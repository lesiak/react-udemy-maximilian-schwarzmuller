import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      const posts = response.data.slice(0, 4);
      const postWithAuthor = posts.map((post) => ({
        ...post,
        author: 'Max',
      }));
      this.setState({ posts: postWithAuthor });
    });
  }

  render() {
    const postsComponents = this.state.posts.map((post) => (
      <Post key={post.id} title={post.title} author={post.author} />
    ));
    return (
      <div>
        <section className="Posts">{postsComponents}</section>
        <section>
          <FullPost />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
