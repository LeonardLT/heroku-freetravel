import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import {hashHistory} from 'react-router'


import '../css/rent-details.css';

class GoodsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      address: '',
      otherMessage: '',
      product: {},
      username: 'unknown',
    }
  }

  componentDidMount() {
    request.post('/api/items/details')
      .send({id: this.props.params.id})
      .end((err, data) => {
        this.setState({
          product: data.body
        });
      });
    request
      .get('/api/personal')
      .end((err, res) => {
        console.log(err);
        if (err) {
          if (res.statusCode === 401) {
            // alert('please login!');
            // return hashHistory.push('/login');
          } else {
            return alert('请先登录!');
          }
        }
        console.log("statusCode:" + res.statusCode);
        const {username} = res.body;
        this.setState({username});
      })
  }

  _submitOrder(event) {
    event.preventDefault();
    request.post('/api/orders')
      .send({
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
        otherMessage: this.state.otherMessage,
        orderProductId: this.props.params.id,
        orderProductName: this.state.product.productName,
        orderImgName: this.state.product.imgName,
        orderPrice: this.state.product.price
      })
      .end((err, res) => {
        if (res.statusCode === 400 && res.text === 'Please finish the form') {
          alert("Please finish the form!");
        }
        if (res.statusCode === 400 && res.text === 'The phone number is error') {
          alert("The phone number is error!");
        }
        if (res.statusCode === 409) {
          alert("已存在!");
        }
        if (res.statusCode === 201) {
          alert("预约成功!");
          this.refs.buttonClose.click();
        }
      });
    this.ref.closeButton.click();
  }

  _nameOnChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  _phoneOnChange(event) {
    this.setState({
      phone: event.target.value
    });
  }

  _addressOnChange(event) {
    this.setState({
      address: event.target.value
    });
  }

  _otherMessageOnChange(event) {
    this.setState({
      otherMessage: event.target.value
    });
  }

  _isLogin() {
    return () => {
      if (this.state.username === "unknown") {
        alert('no login');
        hashHistory.push('/login');
      }
    };
  }


  render() {
    const productData = this.state.product;
    return (
      <div className="goods-details">
        <div className="goods-header">
          <div className="left-pic">
            <div className="img-main-rent">
              <img className="main-img" src={"../images/goods/" + productData.imgName + ".jpg"}/>
            </div>
            <div className="img-other">
              <img src={"../images/goods/" + productData.imgName + "/" + "001.jpg"}/>
              <img src={"../images/goods/" + productData.imgName + "/" + "002.jpg"}/>
              <img src={"../images/goods/" + productData.imgName + "/" + "003.jpg"}/>
            </div>
          </div>
          <div className="goods-information">
            <p className="goods-name">{productData.productName}</p><br/>
            <div className="separate-left"></div>
            <div className="separate-right"></div>
            <p className="goods-price">商品租价：<b>{productData.price}</b>元/天</p>
            <p className="goods-address">商品所在地：<span>陕西省 西安市 长安区</span></p>
            <div className="btn-zuyong">
              <button type="button" className="btn btn-primary enter-renter btn-zuyong" data-toggle="modal"
                      data-target="#exampleModal" data-whatever="@mdo" onClick={this._isLogin()}>租用
              </button>
              {this.state.username !== "unknown" ?
                <div>
                  <form onSubmit={this._submitOrder.bind(this)}>
                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                              aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="exampleModalLabel">确认订单</h4>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="form-group">
                                <label for="recipient-name" className="control-label">收货人姓名:</label>
                                <input type="text" className="form-control" id="recipient-name"
                                       value={this.state.name}
                                       onChange={this._nameOnChange.bind(this)}/>
                                {this.state.name}
                              </div>
                              <div className="form-group">
                                <label for="recipient-name" className="control-label">联系电话:</label>
                                <input type="text" className="form-control" id="recipient-name"
                                       value={this.state.phone}
                                       onChange={this._phoneOnChange.bind(this)}/>
                                {this.state.phone.length}
                              </div>
                              <div className="form-group">
                                <label for="recipient-name" className="control-label">收货地址:</label>
                                <input type="text" className="form-control" id="recipient-name"
                                       value={this.state.address}
                                       onChange={this._addressOnChange.bind(this)}/>
                                {this.state.address}
                              </div>
                              <div className="form-group">
                                <label for="message-text" className="control-label">备注:</label>
                                <textarea className="form-control" id="message-text"
                                          value={this.state.otherMessage}
                                          onChange={this._otherMessageOnChange.bind(this)}/>
                                {this.state.otherMessage}
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button ref="buttonClose" type="button" className="btn btn-default" data-dismiss="modal">
                              Close
                            </button>
                            <input type="submit" value="确认租用" className="btn btn-primary"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                :
                <div class="alert alert-danger" role="alert">
                  请先<Link to="/login" class="alert-link">登录 </Link>!登陆后才能租用
                </div>
              }

            </div>


          </div>
        </div>
        <div className="goods-introduce">
          <div className="goods-text-wall">
            <h1>商品介绍：</h1>
            <h2>商品描述：</h2>
            <p>
              {productData.description}
            </p>
            <h2>商品其他信息：</h2>
            <p>
              {productData.otherDescription}
            </p>
            <h2>一句话描述：</h2>
            <p>
              出门旅游，必备良品！*-*
            </p>
          </div>
          <div className="goods-pictures-wall">
            <img className="img-start-end" src={"../images/goods/" + productData.imgName + "/" + "001.jpg"}/>
            <img src={"../images/goods/" + productData.imgName + "/" + "002.jpg"}/>
            <img src={"../images/goods/" + productData.imgName + "/" + "003.jpg"}/>
            <img className="img-start-end" src={"../images/goods/" + productData.imgName + ".jpg"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default GoodsDetails;
