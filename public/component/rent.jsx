import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'


import "../css/rent.css"

class SelectArea extends React.Component {
  constructor(props) {
    super(props);
    this.onSearch = this.props.onSearch;
  }

  render() {
    return (
      <div className="select">
        <div className="row row-select">
          <div className="col-xs-2" id="search">搜索:</div>
          <div className="input-group text-search">
            <input type="text" className="form-control" placeholder="请输入商品" onChange={this._searchItem.bind(this)}/>
            <span className="input-group-btn">
              <button className="btn btn-default btn-selete" type="button">搜索</button>
            </span>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    );
  }

  _searchItem(event) {
    let keyword = event.target.value;
    this.onSearch(keyword);
  }
}


class Picture extends React.Component {
  render() {
    const {keyword, product}  = this.props;
    return <div>
      {
        product.filter(item => item.productName.toLowerCase().includes(keyword.toLowerCase()))
          .map(i => <div>
            < div className="col-sm-4 col-md-3">
              <div className="thumbnail">
                <img src={"../images/goods/" + i.imgName + ".jpg"} className="picture"/>
                <p>￥{i.price}/天 {i.productName}</p>
                <p>
                  <button href="www.baidu.com" className="btn btn-primary" role="button"
                          onClick={this._knowMore(i.id)}>了解更多
                  </button>
                </p>
              </div>
            </div>
          </div>)
      }
    </div>
  }


  _knowMore(id) {
    return () => {
      // alert(productName);
      hashHistory.push('/goods-details/' + id);
    };
  }
}


class Rent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      keyword: ''
    }
  }

  componentDidMount() {
    request.get('/api/items')
      .end((err, data) => {
        this.setState({
          product: data.body
        });
      });
  }

  render() {
    return (
      <div>
        <SelectArea onSearch={(keyword) => this.setState({keyword: keyword})}/>

        <Picture keyword={this.state.keyword} product={this.state.product}/>
      </div>
    )
  }
}
export default Rent;



