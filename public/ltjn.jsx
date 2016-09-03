import React from 'react';
import LoginAndRegisterNav from './component/login-and-register-nav.jsx';
import TabsNavs from './component/navs.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div>
          <div className="conta">
            <TabsNavs/>
          </div>
          <div className="pull-right loginNavs">
            <LoginAndRegisterNav/>
          </div>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
