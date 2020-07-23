const express = require('express');
const router = express.Router();
const templateDigitalMemory = require('./templateDigitalMemory.service.js');

router.post('/savetemplate', saveTemplate)
router.get('/gettemplate', getTemplate)
router.get('/getresettemplate', getResetTemplate)

module.exports = router;

function saveTemplate(req, res, next) {
    templateDigitalMemory.saveTemplate(req.body)
        .then((status) => {
            status ? res.json({message: "success"}) : res.json({message: "failed"})})
        .catch(err => next(err));
}

function getTemplate(req, res, next) {
    templateDigitalMemory.getTemplate()
        .then((template) => {res.json(template)})
        .catch(err => next(err));
}

function getResetTemplate(req, res, next) {
    templateDigitalMemory.getResetTemplate()
        .then((template) => {res.json(template)})
        .catch(err => next(err));
}
