import React, {Component} from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import '../css/personal-page.css';


export default class PersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'unknown',
      password: '',
      phone: '',
      email: '',
      userOrder: [],
      totalPayPrice: 0
    }
  }

  componentWillMount() {
    request
      .get('/api/personal')
      .end((err, res) => {
        console.log(err);
        if (err) {
          if (res.statusCode === 401) {
            alert('please login!');
            return hashHistory.push('/login');
          } else {
            return alert('请先登录!');
          }
        }
        console.log("statusCode:" + res.statusCode);
        const {username, phone, email, password} = res.body;
        this.setState({username: username, phone, email, password});
      });

    request.post('/api/orders/userOrder')
      .end((err, data) => {
        this.setState({
          userOrder: data.body,
          totalPayPrice: 0
        });
      });

  }

  _deleteOrder(id) {
    return () => {
      request.delete('/api/orders')
        .query({id: id})
        .end((err, data) => {
          this.setState({
            userOrder: data.body
          });
          alert("删除成功");
          this.state.totalPayPrice = 0;
        });
    };
  }

  _showUserInfo(username) {
    return () => {
      request.get('/api/users')
        .query({username: username})
        .end((err, res) => {
          const {name, phone, email, password} = res.body;
          this.setState({username: name, phone, email, password});
        });
    };
  }

  _pay() {
    alert("支付成功");
    this.state.totalPayPrice = 0;
    this.refs.buttonClose.click();
  }

  render() {
    this.state.totalPayPrice = 0;
    return <div className="container-fluid">
      <div className="col-md-2" role="tablist">
        <ul className="nav  nav-pills nav-stacked ">
          <li role="presentation" data-toggle="tab">
            <a className="list-group-item " role="presentation" data-toggle="collapse" href="#userInfo"
               aria-controls="userInfo" onClick={this._showUserInfo(this.state.username)}>个人信息</a>
          </li>
          <li role="presentation" data-toggle="tab">
            <a className="list-group-item " role="presentation" data-toggle="collapse" href="#orderInfomations"
               aria-controls="orderInfomations">个人订单</a>
          </li>
          <li role="presentation" data-toggle="tab">
            <a className="list-group-item " role="presentation" data-toggle="collapse" href="#setting"
               aria-controls="orderInfomations" onClick={this._showUserInfo(this.state.username)}>修改个人信息</a>
          </li>
        </ul>
      </div>


      <div className="col-md-10">
        <div className="tab-content">
          <div className="page-header">
            <h1> Welcome:
              <small>{this.state.username}</small>
            </h1>
          </div>

          <div className="collapse" id="userInfo">
            <div className="well col-md-12 ">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>password</th>
                    <th>phone</th>
                    <th>email</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>{this.state.username}</td>
                    <td>{this.state.password}</td>
                    <td>{this.state.phone}</td>
                    <td>{this.state.email}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="collapse" id="setting">
            <div className="well col-md-12 ">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>password</th>
                    <th>phone</th>
                    <th>email</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td className="col-md-3"><input name="name" type="text" className="form-control"
                                                    placeholder={this.state.username}/></td>
                    <td className="col-md-3"><input className="form-control" placeholder={this.state.password}/></td>
                    <td className="col-md-3"><input className="form-control" placeholder={this.state.phone}/></td>
                    <td className="col-md-3"><input className="form-control" placeholder={this.state.email}/></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>


          <div className="collapse" id="orderInfomations">
            <div className="well  col-md-12 " id="userOrder">
              {

                this.state.userOrder.map(order =>
                  <div className="media">
                    <div className="media-left  media-middle">
                      <img className="img-order" src={"../images/goods/" + order.orderImgName + ".jpg"} alt="加载失败"/>
                    </div>
                    <div className="media-body">
                      <hr/>
                      <table className="table">
                        <thead>
                        <tr>
                          <th>#</th>
                          <th>P-Id</th>
                          <th>Price</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>OtherMessage</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td key={order._id}>1</td>
                          <td>{order.orderProductId}</td>
                          <td>{order.orderPrice}</td>
                          <td>{order.name}</td>
                          <td>{order.phone}</td>
                          <td>{order.address}</td>
                          <td>{order.otherMessage}</td>
                          <div className="hidden">{
                            this.state.totalPayPrice += order.orderPrice}</div>
                        </tr>
                        </tbody>
                      </table>
                      <div className="col-md-10"></div>
                      <div className="col-md-2">
                        <button type="button" className="btn btn-danger" onClick={this._deleteOrder(order._id)}>删除
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              <div className="col-md-10 ">
              </div>
              <div className="col-md-2">
                <hr/>

                <div>总金额:{this.state.totalPayPrice}</div>
                <hr/>
                <button type="button" className="btn btn-success btn-pay" data-toggle="modal" data-target="#myModal"> 支付
                </button>
              </div>

              <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title" id="myModalLabel">确认订单</h4>
                    </div>
                    <div className="modal-body">
                      商品名称:{this.state.userOrder.map(order =>
                      <div>
                        <div><li className="col-md-10">{order.orderProductName}</li><div>{order.orderPrice}</div></div>
                        <hr/>
                      </div>)}
                      总金额:{this.state.totalPayPrice}
                    </div>
                    <div className="modal-footer">
                      <button ref="buttonClose" type="button" className="btn btn-default" data-dismiss="modal">Close
                      </button>
                      <button type="button" className="btn btn-primary" onClick={this._pay.bind(this)}>确认支付</button>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="messages">3</div>
          <div role="tabpanel" className="tab-pane" id="settings">4</div>
        </div>


      </div>


    </div>;

  }
}


