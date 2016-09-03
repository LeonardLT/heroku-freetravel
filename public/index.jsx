import React from 'react';
import BrifeIntroduciton from './component/brief-introduction.jsx';
import PicturesWall from './component/pictures-wall.jsx';
import Buttom from './component/buttom.jsx';
export default class Hello extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div>
          <div>
            <PicturesWall/>
          </div>

          <div>
            <BrifeIntroduciton/>
          </div>
        </div>
        <div>
          {this.props.children}
        </div>
        <div className="buttom">
          <Buttom/>
        </div>
      </div>
    );
  }
}
