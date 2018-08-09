const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.verifyToken = (req, res, next)=>{
	var token = req.headers['x-access-token'];
	if(!token) return res.status(403).send({auth:false, message: 'No token provided'})

	jwt.verify(token, config.secret, (err, decoded)=>{
		if(err) return res.status(500).send({auth:false, message: 'Failed to authenticate your fucking token'})

		req.userID = decoded.id;
		next();
	});
}