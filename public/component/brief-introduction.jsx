import React from "react";
import RentPic from "../images/brief-introduction/rent.png";
import FreePic from "../images/brief-introduction/free.png";
import FriendPic from '../images/brief-introduction/friend.png';
import {Link} from 'react-router';

require("../css/brief-introduction.css");

class BrifeIntroduction extends React.Component {
  render() {
    return (
      <div className="container summary">
        <div className="row" id="summary-container">
          <div className="col-md-4">
            <img className="img-circle" src={RentPic}/>
            <h2>出租</h2>
            <p>让你出门更轻松</p>
            <p><Link className="btn btn-default" to="/rent" role="button">点我了解</Link></p>
          </div>

          <div className="col-md-4">
            <img className="img-circle" src={FreePic}/>
            <h2>个性化</h2>
            <p>让生活更轻松</p>
            <p><a className="btn btn-default"  role="button" disabled="disabled">敬请期待</a></p>
          </div>
          <div className="col-md-4">
            <img className="img-circle" src={FriendPic}/>
            <h2>旅友</h2>
            <p>驴友带你飞</p>
            <p><a className="btn btn-default"  role="button" disabled="disabled">敬请期待</a></p>
          </div>
        </div>
      </div>
    )
  }
}
export default BrifeIntroduction;
