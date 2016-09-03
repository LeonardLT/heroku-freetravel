import React from 'react';
import github from '../images/buttom/github.png';
import wechat from '../images/buttom/wechat.png';
require('./../css/buttom.css');

class Buttom extends React.Component {

  render() {
    return (
      <div className=" summary-footer">
        <div className="row feature-footer">

          <div className="col-md-5">
            <h2 className="feature-footer-heading">地址:</h2>
            <p className="lead">陕西省 西安市 长安区 西安邮电大学 东区 FZ151</p>
          </div>

          <div className="col-md-7">
            <h2 className="feature-footer-heading">联系我们:</h2>
            <div className="col-md-1">
              <a href="https://github.com/TW-freetravel"><img className="pic" src={github}/></a>
            </div>

            <div className="col-md-1">
              <div className="pic"><img src={wechat}/>
              </div>
            </div>
          </div>

        </div>
        <hr className="active"/>
        <footer className="copyright">
          <p className="pull-left">Copyright © 2016：第三小组</p>
          <p className="pull-right"><a href="#">回到顶部</a></p>
        </footer>
      </div>
    )
  }
}

export default Buttom;
