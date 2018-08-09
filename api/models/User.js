var mongoose = require('mongoose'); 
const validator = require('validator');

var UserSchema = new mongoose.Schema({  
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
},
  email: {
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
            User.find({email: v}, function(err,docs){
                cb(docs.length == 0);
            });
        }, message: '{VALUE} already exists'

    }]
},
  password: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
}
});
 var User = mongoose.model('User', UserSchema);

module.exports = User;