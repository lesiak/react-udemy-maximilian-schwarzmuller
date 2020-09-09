import React from 'react';

import cssClasses from './Layout.module.css';

const Layout = (props) => (
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={cssClasses.content}>{props.children}</main>
  </>
);

export default Layout;
