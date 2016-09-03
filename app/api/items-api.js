import express from 'express';
import {Product} from '../db/schema';
const router = express.Router();

router.get('/', (req, res, next) => {
  Product.find({}, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

router.post('/details', function (req, res, next) {
  const id = req.body.id;
  console.log(id);
  Product.findOne({id}, (err, data) => {
    if (err) return next(err);
    console.log(data + '++++++');
    res.json(data);
  });
});
export default router;
