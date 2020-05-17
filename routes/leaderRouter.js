const express = require('express');
const bodyparser = require('body-parser');
const leaderRouter = express.Router();
const Leaders = require('../models/leaders');
leaderRouter.use(bodyparser.json());


leaderRouter.get('/', (req, res, next) => {
  Leaders.find({}).
  then((leaders) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.post('/', (req, res, next) => {
  Leaders.create(req.body)
    .then((leader) => {
      console.log('Leader Created :', leader);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.put('/', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /leaders');
});

leaderRouter.delete('/', (req, res, next) => {
  Leaders.remove({}).
  then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
});
leaderRouter.get('/:leaderId', (req, res, next) => {
  Leaders.findById(req.params.leaderId)
    .then((leader) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.post('/:leaderId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaders/' + req.params.leaderId);
});

leaderRouter.put('/:leaderId', (req, res, next) => {
  Leaders.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body
    }, {
      new: true
    })
    .then((leader) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.delete('/:leaderId', (req, res, next) => {
  Leaders.findByIdAndRemove(req.params.leaderId)
    .then((leader) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports = leaderRouter;