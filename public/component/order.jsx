// import React, {Component} from 'react';
{/*require("./../css/order.css");*/}
{/*class OrderForm extends React.Component {*/}
  {/*render() {*/}
    {/*return (*/}
      {/*<div>*/}
        {/*<div className="input ">*/}
          {/*<label className="control-label" id="sizing-addon1">商品数量: </label>*/}
          {/*<input type="text" className="form-control input-lg " placeholder="1" required/>*/}
          {/*<label className="control-label" id="sizing-addon2">个</label>*/}
        {/*</div>*/}


        {/*<div className="input">*/}
          {/*<label className="control-label " id="sizing-addon2">租用时间: </label>*/}
          {/*<input type="text" className="form-control input-lg" placeholder="1" required/>*/}
          {/*<label className="control-label " id="sizing-addon2">天</label>*/}
        {/*</div>*/}


        {/*<div className="input">*/}
          {/*<label className="control-label " id="sizing-addon2">提货地址: </label>*/}
          {/*<input type="text" className="form-control input-lg" placeholder="详情地址:" required/>*/}
        {/*</div>*/}

      {/*</div>*/}
    {/*);*/}
  {/*}*/}
{/*}*/}

{/*class OrderPage extends React.Component {*/}
  {/*render() {*/}
    {/*return (*/}
      {/*<div className="details">*/}
        {/*<p className="p-size"> 亲，填写一下租用信息吧～</p>*/}
        {/*<form>*/}
          {/*<OrderForm/>*/}
          {/*<button type="submit" className="btn qqz">提交</button>*/}

        {/*</form>*/}
      {/*</div>*/}
    {/*)*/}
  {/*}*/}
{/*}*/}
{/*export default OrderPage;*/}

import React from 'react';
import {Link} from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal"
                data-target="#exampleModal" data-whatever="@mdo">Open modal for @mdo</button>

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="exampleModalLabel">New message</h4>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="recipient-name" className="control-label">Recipient:</label>
                    <input type="text" className="form-control" id="recipient-name"/>
                  </div>
                  <div className="form-group">
                    <label for="message-text" className="control-label">Message:</label>
                    <textarea className="form-control" id="message-text"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <Link to='www.baidu.com'><button type="button" className="btn btn-primary">Send message</button></Link>
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}
