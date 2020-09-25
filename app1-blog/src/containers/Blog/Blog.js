import React, { Component, Suspense } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Posts from './Posts/Posts';

import './Blog.css';

const NewPostLazy = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
  state = {
    auth: true,
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts" exact activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-post',
                    // hash: '#submit',
                    // query: 'queryString'
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? (
            <Route
              path="/new-post"
              render={() => (
                <Suspense fallback={<div>Loading...</div>}>
                  <NewPostLazy />
                </Suspense>
              )}
            />
          ) : null}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Not found</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
