const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	inputEmail: {
		type: String,
		required: true,
		unique: true
	},
	inputPassword: {
		type: String,
		required: true
	}
},
{
	timestamps: true
}
);
schema.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('User', schema);