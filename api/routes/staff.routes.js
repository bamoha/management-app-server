var express = require('express');
var router = express.Router();
var staffController = require('../controllers/staff.controller')


router.post('/', staffController.addStaff);

router.put('/:id', staffController.editStaff);

router.get('/', staffController.getStaff);

router.get('/:id', staffController.getSingleStaff);

router.delete('/:id', staffController.removeStaff);



module.exports = router;