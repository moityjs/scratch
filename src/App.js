import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import { Checkbox, Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { IconButton } from 'react-toolbox/lib/button';
import Navigation from 'react-toolbox/lib/navigation';
import { Route, BrowserRouter, NavLink } from 'react-router-dom';
import Menu from 'mdi-react/MenuIcon';
import Inbox from 'mdi-react/InboxIcon';
import Person from 'mdi-react/PersonBoxIcon';
import Close from 'mdi-react/CloseIcon';
import styles from './App.css';

class App extends Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false,
  };

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned });
  };

  toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned });
  };

  render() {
    const {
      drawerPinned,
      sidebarPinned,
      drawerActive,
    } = this.state;

    return (
      <BrowserRouter>
        <Layout>
          <NavDrawer
            active={drawerActive}
            pinned={drawerPinned} permanentAt="xxl"
            onOverlayClick={this.toggleDrawerActive}
          >
            <Navigation type="vertical" className={styles.navigation}>
              <NavLink to="/inbox"><div><Inbox/> Inbox</div></NavLink>
              <NavLink to="/profile"><div><Person/> Profile</div></NavLink>
            </Navigation>
          </NavDrawer>
          <Panel>
            <AppBar
              title="Scratch App"
              className={styles.header}
              leftIcon={<Menu/>}
              onLeftIconClick={this.toggleDrawerActive}
            />
            <Route
              exact path="/" render={() =>
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                  <h1>Main Content</h1>
                  <p>Main content goes here.</p>
                  <Checkbox label="Pin drawer" checked={drawerPinned} onChange={this.toggleDrawerPinned}/>
                  <Checkbox label="Show sidebar" checked={sidebarPinned} onChange={this.toggleSidebar}/>
                </div>
              }
            />
            <Route path="/inbox" render={() => <div>Inbox</div>}/>
            <Route path="/profile" render={() => <div>Profile</div>}/>
          </Panel>
          <Sidebar pinned={sidebarPinned} width={5}>
            <div><IconButton icon={<Close/>} onClick={this.toggleSidebar}/></div>
            <div style={{ flex: 1 }}>
              <p>Supplemental content goes here.</p>
            </div>
          </Sidebar>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
