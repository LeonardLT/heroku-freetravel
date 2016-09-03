import React from 'react';
import BeautyPic from '../images/pictures-wall/beauty.jpeg';
import CountryPic from '../images/pictures-wall/country.jpg';
import FriendsPic from '../images/pictures-wall/friends.jpg';
import TentPic from '../images/pictures-wall/tent.jpg';
import WaterPic from '../images/pictures-wall/water.jpg';

require("../css/pictures-wall.css");

class PicturesWall extends React.Component {
  render() {
    return (
      <div id="ad-carousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#ad-carousel" data-slide-to="0" className="active"></li>
          <li data-target="#ad-carousel" data-slide-to="1"></li>
          <li data-target="#ad-carousel" data-slide-to="2"></li>
          <li data-target="#ad-carousel" data-slide-to="3"></li>
          <li data-target="#ad-carousel" data-slide-to="4"></li>
        </ol>
        <div className="carousel-inner">
          <div className="item active">
            <img src={BeautyPic} alt="1 slide"/>
            <div className="container">
              <div className="carousel-caption">
                <h2>遇见世界，遇见你</h2>
              </div>
            </div>
          </div>

          <div className="item">
            <img src={CountryPic} alt="2 slide"/>
            <div className="container">
              <div className="carousel-caption">
                <h2>身未动，心与世界邂逅</h2>
              </div>
            </div>
          </div>

          <div className="item">
            <img src={FriendsPic} alt="3 slide"/>
            <div className="container">
              <div className="carousel-caption">
                <h2>去追随</h2>
              </div>
            </div>
          </div>

          <div className="item">
            <img src={TentPic} alt="4 slide"/>
            <div className="container">
              <div className="carousel-caption">
                <h2>星空下的你星空下的你，如此美丽</h2>
              </div>
            </div>
          </div>

          <div className="item">
            <img src={WaterPic} alt="5 slide"/>

            <div className="container">
              <div className="carousel-caption">
                <h2>爱风景，爱生活</h2>
              </div>
            </div>
          </div>
        </div>
        <a className="left carousel-control" href="#ad-carousel" data-slide="prev"><span
          className="glyphicon glyphicon-chevron-left"></span></a>
        <a className="right carousel-control" href="#ad-carousel" data-slide="next"><span
          className="glyphicon glyphicon-chevron-right"></span></a>
      </div>
    )
  }
}
export default PicturesWall;
