const mongoose = require('mongoose');
const validator = require('validator');

var Schema = mongoose.Schema;

// Staff Schema
var StaffSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    address:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email:  {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        validate: [{
            // Check if email has a valid regular expression
            isAsync: true,
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }, {
            // Check if specified email exists in the database
            isAsync: true,
            validator: function(v, cb) {
                Staff.find({email: v}, function(err,docs){
                    cb(docs.length == 0);
                });
            }, message: '{VALUE} already exists'

        }]
    },
    phone: {
        type: Number,
        required: true,
        minlength: 1
    },
    startDate: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    department: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    position: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    type: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
});

// Staff model
var Staff = mongoose.model('Staff', StaffSchema );

module.exports = {Staff};