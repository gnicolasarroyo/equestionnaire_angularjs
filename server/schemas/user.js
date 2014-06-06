'use strict';


/**
 * Get Dependencies
 */
var crypto   = require('crypto'), 
	mongoose = require('mongoose');


/**
 * User Model Schema
 */
var schema = new mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: 	{ type: String, required: true },
	email: 		{ type: String, required: true },
	salt: 		{ type: String, required: true },
	hash: 		{ type: String, required: true },
	created_at: { type: Date, default: Date.now() },
	updated_at: { type: Date, default: Date.now() }
});


/**
 * Virtuals
 */
schema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hash = this.encryptPassword(password);
}).get(function() {
    return this._password;
});


/**
 * Validations
 */
schema.path('email').validate(function(email) {
    return (typeof email === 'string' && email.length > 0);
}, 'Email cannot be blank');


/**
 * Methods
 */
schema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hash;
    },


    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

  
    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 1000, 64).toString('base64');
    }
};


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('User', schema);
};