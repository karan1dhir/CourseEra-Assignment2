const express = require('express');
const bodyparser = require('body-parser');
const promoRouter = express.Router();
const Promotions = require('../models/promotions');
promoRouter.use(bodyparser.json());


promoRouter.get('/', (req, res, next) => {
  Promotions.find({}).
  then((promotions) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.post('/', (req, res, next) => {
  Promotions.create(req.body)
    .then((promotion) => {
      console.log('Promotion Created :', promotion);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.put('/', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /promotions');
});

promoRouter.delete('/', (req, res, next) => {
  Promotions.remove({}).
  then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
});
promoRouter.get('/:promoId', (req, res, next) => {
  Promotions.findById(req.params.promoId)
    .then((promotion) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.post('/:promoId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/' + req.params.promoId);
});

promoRouter.put('/:promoId', (req, res, next) => {
  Promotions.findByIdAndUpdate(req.params.promoId, {
      $set: req.body
    }, {
      new: true
    })
    .then((promotion) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.delete('/:promoId', (req, res, next) => {
  Promotions.findByIdAndRemove(req.params.promoId)
    .then((promotion) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports = promoRouter;