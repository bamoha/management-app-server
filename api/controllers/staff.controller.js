var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
var {Staff} = require('../models/staff');

module.exports.addStaff = (req, res, next) => {
    let staff = new Staff({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        startDate: req.body.startDate,
        description: req.body.description,
        department: req.body.department,
        position: req.body.position,
        type: req.body.type

    });


    staff.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
};


module.exports.editStaff = (req, res, next) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name','image', 'address', 'email', 'phone', 'startDate', 'description', 'position', 'type']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Staff.findOneAndUpdate({_id: id},
        {$set: body},
        {new: true}
    ).then((staff) => {
        if(!staff){
            return res.status(404).send();
        }
        res.send(staff);
    }).catch((e) => {
        res.status(400).send();
    });
};

module.exports.getStaff = (req, res, next) => {
    console.log(req.body)
    Staff.find().then((staff) => {
        res.send(staff);
    }, (e) => {
        res.status(400).send(e);
    });
};


module.exports.getSingleStaff = (req, res, next) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Staff.findById(id).then((staff) => {
        if (!staff) {
            return res.status(404).send();
        }

        res.send(staff);

    }).catch((e) => {
        res.send(400).send();
    });

};

module.exports.removeStaff = (req, res, next) => {
        let id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        Staff.findByIdAndRemove(id).then((staff) => {
            if(!staff) {
                return res.status(404).send();
            }

            res.send(staff);
        }).catch((e) => {
            res.status(400).send();
        });
};
