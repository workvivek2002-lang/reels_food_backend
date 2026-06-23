const express = require('express');
const publicRouter = express.Router();

const publicController = require('../controller/public.controller');

publicRouter.get(
  '/:id',
  publicController.getPublicProfile
);

module.exports = publicRouter;