/* global module */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import AppBar from 'react-toolbox/lib/app_bar';
import { IconButton } from 'react-toolbox/lib/button';
import { Checkbox } from 'react-toolbox/lib/checkbox/index';
import {
  Layout,
  NavDrawer,
  Panel,
  Sidebar,
} from 'react-toolbox/lib/layout/index';
import Navigation from 'react-toolbox/lib/navigation';
import { Route, BrowserRouter, NavLink } from 'react-router-dom';
import * as Icons from './icons';
import styles from './App.css';
import Unread from './Unread';

const App = hot(module)(
  class App extends Component {
    state = {
      drawerActive: false,
      drawerPinned: false,
      sidebarPinned: false,
    };

    toggleDrawerActive = () => {
      this.setState(({ drawerActive }) => ({ drawerActive: !drawerActive }));
    };

    toggleDrawerPinned = () => {
      this.setState(({ drawerPinned }) => ({ drawerPinned: !drawerPinned }));
    };

    toggleSidebar = () => {
      this.setState(({ sidebarPinned }) => ({ sidebarPinned: !sidebarPinned }));
    };

    render() {
      const { drawerPinned, sidebarPinned, drawerActive } = this.state;

      return (
        <BrowserRouter>
          <Layout>
            <NavDrawer
              active={drawerActive}
              onOverlayClick={this.toggleDrawerActive}
            >
              <Navigation type="vertical" className={styles.navigation}>
                <Route path="/inbox">
                  {({ match }) => (
                    <NavLink to="/inbox" active={!!match}>
                      <div>
                        <Icons.Inbox /> Inbox
                      </div>
                    </NavLink>
                  )}
                </Route>
                <NavLink to="/profile">
                  <div>
                    <Icons.Person /> Profile
                  </div>
                </NavLink>
              </Navigation>
            </NavDrawer>
            <Panel>
              <AppBar
                title="Scratch"
                className={styles.header}
                leftIcon={<Icons.Menu />}
                onLeftIconClick={this.toggleDrawerActive}
              />
              <Route
                exact
                path="/"
                render={() => (
                  <div
                    style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}
                  >
                    <h1>Main Content</h1>
                    <p>Main content goes here.</p>
                    <Checkbox
                      label="Pin drawer"
                      checked={drawerPinned}
                      onChange={this.toggleDrawerPinned}
                    />
                    <Checkbox
                      label="Show sidebar"
                      checked={sidebarPinned}
                      onChange={this.toggleSidebar}
                    />
                  </div>
                )}
              />
              <Route
                path="/inbox"
                render={() => (
                  <div>
                    Inbox Unread: <Unread />
                  </div>
                )}
              />
              <Route path="/profile" render={() => <div>Profile</div>} />
            </Panel>
            <Sidebar pinned={sidebarPinned} width={5}>
              <div>
                <IconButton
                  icon={<Icons.Close />}
                  onClick={this.toggleSidebar}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p>Supplemental content goes here.</p>
              </div>
            </Sidebar>
          </Layout>
        </BrowserRouter>
      );
    }
  }
);

export default App;
