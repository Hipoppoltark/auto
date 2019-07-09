const express        = require('express');

const bodyParser     = require('body-parser');

const app            = express();

const mongoose 		 = require('mongoose');

const path = require('path');

const routes = require('./routes');

const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

const config = require('./config');

app.use(session({
		secret: 'QFcfrnhwmW356DvdsbnDbf3f65',
		resave: true,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: mongoose.connection
		})
	})
);



let ejs = require('ejs');						//
app.set('view engine', 'ejs');					// EJS
app.engine('html', require('ejs').renderFile);	//

app.use(bodyParser.urlencoded({extended: true})); //bodyparser
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views/public'))); // подключение папки public


app.get('/', (req, res) => {
  res.render('index');
});
app.get('/signup.ejs', (req,res) => res.render('signup'));									

app.use('/api/auth', routes.auth);
/*app.get('/create.ejs', (req,res) => res.render('create'));
app.post('/create.ejs', (req,res) => {
	const {title, body} = req.body;
	Post.create({
		title: title,
		body: body
	}).then(post => console.log(post.id));

	res.redirect('/');
});*/


module.exports = app;
