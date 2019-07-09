const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const models = require('../models');


router.post('/register', (req, res) => {
	const inputEmail = req.body.inputEmail;
	const inputPassword = req.body.inputPassword;
	const inputPasswordConfirm = req.body.inputPasswordConfirm;

	if (inputPassword !== inputPasswordConfirm) {
		res.json ({
			ok: false,
			error: "Пароли не совпадают",
			fields: ["inputPassword", "inputPasswordConfirm"]
		});
	} else {

		models.User.findOne({
			inputEmail
		}).then (user =>{
			if (!user){
				bcrypt.hash(inputPassword, null, null, (err,hash) =>  {
					models.User.create ({
						inputEmail,
						inputPassword: hash
			}).then(user => {
				console.log(user);
				res.json({
					ok: true
				});
			}).catch(err => {
				console.log(err);
				
				res.json({
					ok: false,
					error: 'Ошибка, попробуйте снова!'
				});
			});
		});
	  } else {
	  	res.json({
	  		ok: false,
	  		error: "Имя занято!",
	  		fields: ['inputEmail']
	  	});
	  }

			
	});
   }
});
		
router.post('/sign-in', (req, res) => {
	const inputEmaillogin = req.body.inputEmaillogin;
	const inputPasswordlogin = req.body.inputPasswordlogin;

	console.log(req.body);

	models.User.findOne({
		inputEmaillogin
	}).exec().then(user => {
		if(!user){
			res.json({
				ok: false,
				error: 'Логин или пароль неверны!',
				fields: ['inputEmaillogin', 'inputPasswordlogin']
			});
		} else {
			bcrypt.compare(inputPasswordlogin, user.password, function(err, res){
				if(!result) {
					res.json({
						ok: false,
						error: 'Логин и пароль неверны!',
						fields: ['inputEmaillogin', 'inputPasswordlogin']
					});	
				} else {
					res.session.userId = user.id;
					res.session.userLogin = user.login;
					res.json({
						ok: true
					});
				}
			});
		}
	})
	.catch(err => {
		console.log(err);
				
		res.json({
			ok: false,
			error: 'Ошибка, попробуйте снова!'
		});

	});
});


module.exports = router;
