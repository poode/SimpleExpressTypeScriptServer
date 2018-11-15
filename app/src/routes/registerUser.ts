import * as express from 'express';
import * as expressValidator from 'express-validator';
import { check } from 'express-validator/check';

import connection from './../config/db';
import { ExpressError } from '../interfaces/expressError';

const router = express.Router();

/* POST register listing. */
router.post('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
		const username = req.body.username;
		const password = req.body.password;
		const password2 = req.body.password2;
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password2', 'Confirmation for the Password is required').notEmpty();

		// check the validation object for errors
		let errors = req.validationErrors();


		if (errors) {
			// console.log(db['connection']);
			res.render('register', { flash: { type: 'alert-danger', messages: errors }});
		}
		else {
			connection.connect(function(err) {
				if (err) throw err;
				console.log("Connected!");
				let sqlQuery = `INSERT INTO user (username, email, fullName, gender, age, password)`
				+` VALUES ('${username}', '${password}')`;
				connection.query(sqlQuery, function (err, result) {
					if (err) throw err;
					console.log("1 record inserted");
				});
			});
			res.render('register', { flash: { type: 'alert-success', messages: [ { msg: 'The user Successfuly is created!' }]}});
		}
				
				



});

module.exports = router;
