

const app = require('./app');
const database = require('./database');
const config = require('./config');

database().then(info => {
	console.log(`Example app listening on ports ${config.PORT}!`);
	app.listen(config.PORT, () => console.log(`We are live on port ${config.PORT}!`));

})




