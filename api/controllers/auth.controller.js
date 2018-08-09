var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

var {ObjectID} = require('mongodb');

var User = require('../models/User');

module.exports.register = (req, res)=>{
	console.log(req.body)
	let hashedPassword = bcrypt.hashSync(req.body.password, 8);



	User.create({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	}, (err, user)=>{
		if (err) return res.status(500).json({ success: false, message: 'Error from the server' });
		let token = jwt.sign({id: user._id}, config.secret, {expiresIn:86400})
		res.status(200).json({
			success: true,
			token: token
		  });
		console.log(user);

	});

};

module.exports.login = (req, res)=>{

	User.findOne({email: req.body.email}, (err, user)=>{
		console.log(req.body);
		if (err) return res.status(500).json({ success: false, message: 'Error from the server' });
		if (!user) return res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });;

		let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

		if (!passwordIsValid) return res.status(404).json({ success: false, message: 'Authentication failed. Wrong password.' });

		var token = jwt.sign({id: user._id}, config.secret, {expiresIn:86400});

		res.status(200).json({
			success: true,
			token: token
		  });
	})
};

module.exports.logout = (req, res)=>{
	res.send(200).status({auth: false, token: null})
};

module.exports.me = (req, res, next)=>{

		User.findById(req.UserId, { password: 0 }, (err, user)=>{
			if (err) return res.status(500).json({ success: false, message: 'Error from the server' });
			if (!user) return res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });;

			res.status(200).send(user);
		})
};

module.exports.users = (req, res, next)=>{

	User.find().then((user) => {
        res.json(user);
    }, (e) => {
        res.status(400).send(e);
    });
}

module.exports.removeUser = (req, res, next)=>{

	let id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	User.findByIdAndRemove(id).then((user) => {
		if(!user) {
			return res.status(404).send();
		}

		res.send(user);
	}).catch((e) => {
		res.status(400).send();
	});
}