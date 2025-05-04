const express = require('express');
const {
  getUserLinks,
  createLink,
  updateLink,
  deleteLink,
} = require('../controllers/linkController');

const linkRouter = express.Router();

linkRouter.get('/', getUserLinks); 
linkRouter.post('/', createLink);
linkRouter.put('/:id', updateLink);
linkRouter.delete('/:id', deleteLink);

module.exports = linkRouter;
