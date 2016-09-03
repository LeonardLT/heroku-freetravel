import express from 'express';
const router = express.Router();
import {Order} from '../db/schema';
import {validatePhone} from '../shared/user-field-validation';


function existEmpty(orderData) {
  return !(orderData.name === '' || orderData.otherMessage === '' || orderData.address === '' || orderData.phone === '');
}


function isPhoneRight(orderData) {
  return validatePhone(orderData) !== false;
}

function isOrderInformationLegal(orderData) {
  const isEmpty = existEmpty(orderData);
  const isPhone = isPhoneRight(orderData);

  if (isEmpty === false) {
    return {type: false, message: 'Please finish the form'};
  }
  else if (isPhone === false) {
    return {type: false, message: 'The phone number is error'};
  }
  return {type: true, message: 'type is true'};
}


// function isExist(orderData, next, callback) {
//   Order.findOne({name: orderData.name}, function (err, doc) {
//     if (err) return next(err);
//
//     callback(null, doc);
//   });
// }

router.post('/', function (req, res, next) {
  const orderData = req.body;
  const legal = isOrderInformationLegal(orderData);


  if (legal.type === true) {

    // isExist(orderData, next, function (err, doc) {
    //   if (err) return next(err);
    //   if (doc === null) {
    var order = new Order({
      name: orderData.name,
      otherMessage: orderData.otherMessage,
      address: orderData.address,
      phone: orderData.phone,
      orderProductId: orderData.orderProductId,
      orderProductName: orderData.orderProductName,
      orderImgName: orderData.orderImgName,
      orderPrice: orderData.orderPrice
    });
    order.save(function (err) {
      if (err) return next(err);
      console.log('save status:', err ? 'failed' : 'success');
      res.status(201).send('order success');
    });
      // }
      // else if (doc !== null) {
      //   res.status(409).send('is exist');
      // }
    // });


  }
  else {
    res.status(400).send(legal.message);
  }
});


router.post('/userOrder', (req, res, next) => {
  Order.find({}, (err, orderData) => {
    if (err) return next(err);
    res.json(orderData);
  });
});

router.delete('/', (req, res, next) => {
  const id = req.query.id;
  Order.find({_id: id}).remove(err => {
    if (err) return next(err);
    Order.find({}, (err, newOrderData) => {
      if (err) return next(err);
      res.json(newOrderData);
    });
  });

});
export default router;
