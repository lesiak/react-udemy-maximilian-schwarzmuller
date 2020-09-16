import React from 'react';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import cssClasses from './Layout.module.css';

const Layout = (props) => (
  <>
    <div>
      <Toolbar />
      <SideDrawer />
    </div>
    <main className={cssClasses.content}>{props.children}</main>
  </>
);

export default Layout;
