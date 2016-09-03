import async from 'async';
import db from '../app/db/db';
import {Product} from '../app/db/schema';
import productData from './initData/product.json';


async.series([
  (cb) => {db.connect('product',cb);},
  (cb) => Product.find().remove(cb),
  (cb) => {console.log('--products delete');cb();},
  (cb) => Product.create(productData,cb),
  (cb) => {console.log('--products created');cb();}
], () => {
  console.log('db init complete!');
});
