import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import cssClasses from './Layout.module.css';

const Layout = (props) => (
  <>
    <div>
      <Toolbar />
    </div>
    <main className={cssClasses.content}>{props.children}</main>
  </>
);

export default Layout;
