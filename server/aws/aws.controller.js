const express = require('express');
const router = express.Router();
const s3Service = require('./aws.service');

// routes
router.post('/signS3', signS3);

module.exports = router;


function signS3(req, res, next) {
  s3Service.signS3(req)
      .then(data => data.signedRequest ? res.json(data) : res.status(400).json({ message: 'Error signing URL' }))
      .catch(err => next(err));
}