'use strict';


/**
 * Get Dependencies
 */
var mongoose = require('mongoose'),
	questionSchema 	= require('./question').schema();


/**
 * Survey Model Schema
 */
var schema = new mongoose.Schema({
	user: 					{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	start_date:   	 		{ type: Date, required: true},
	effective_days:  		{ type: Number, required: true },
	state: 					{ type: Number, required: true },
	title: 					{ type: String, required: true },
	introduction: 			{ type: String, required: true },
	questions: 				[questionSchema],
	mail_account_setting: 	{ type: mongoose.Schema.Types.ObjectId, ref: 'MailAccountSetting' },
	contacts: 				[{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
	contact_lists: 			[{ type: mongoose.Schema.Types.ObjectId, ref: 'ContactList' }],
	created_at: 			{ type: Date, default: Date.now() },
	updated_at: 			{ type: Date, default: Date.now() }
});

exports.state_code = { NEWLY_CREATED: 1, UPDATED: 2, ONLINE: 3, FINISH: 4 };

/**
 * Validations
 */
schema.path('title').validate(function(title) {
    return (typeof title === 'string'); 
}, 'Invalid type Title');

schema.path('title').validate(function(title) {
    return (title.length > 4 && title.length < 36);
}, 'Invalid length Title');

schema.path('introduction').validate(function(introduction) {
    return (typeof introduction === 'string'); 
}, 'Invalid type Introduction');

schema.path('introduction').validate(function(introduction) {
    return (introduction.length > 4 && introduction.length < 251);
}, 'Invalid length Introduction');

schema.path('questions').validate(function(questions) {
    return (typeof questions === 'object'); 
}, 'Invalid type Questions');

schema.path('questions').validate(function(questions) {
    return (questions.length > 0 && questions.length < 11);
}, 'Invalid lengte Questions');

schema.path('contacts').validate(function(contacts) {
    return (typeof contacts === 'object'); 
}, 'Invalid type Contacts');

schema.path('contacts').validate(function(contacts) {
    return (contacts.length > 0);
}, 'Invalid length Contacts');

schema.path('contact_lists').validate(function(contact_lists) {
    return (typeof contact_lists === 'object'); 
}, 'Invalid type Contact Lists');

schema.path('contact_lists').validate(function(contact_lists) {
    return (contact_lists.length > 0);
}, 'Invalid length Contact Lists');




/**
 * Methods
 */
schema.methods = {
	
	/**
	 * Get Distribution List - returns a unified contact list
	 * 
	 * @return {Array}
	 */
	getDistributionList: function () {
		var temp_list = [];

		for (var i = this.contacts.length - 1; i >= 0; i--) {
			temp_list.push(this.contacts[i]._id.toString());
		}	

		for (var i = this.contact_lists.length - 1; i >= 0; i--) {
			for (var z = this.contact_lists[i].contacts.length - 1; z >= 0; z--) {
				if (temp_list.indexOf(this.contact_lists[i].contacts[z]) === -1) {
					temp_list.push(this.contact_lists[i].contacts[z].toString());
				} else {
					continue;
				}
			}
		}

		return temp_list;
	}, 

	existsContact: function (contact_id) {
		var temp_list = this.getDistributionList();
		return temp_list.indexOf(contact_id) >= 0 ? true : false;
	},

	/**
	 * Get End Date - estimated completion date based in start date and effective days
	 * 
	 * @return {Date}
	 */
	getEndDate: function () {
		if (!this.start_date && !this.effective_days) return new Date();
		return new Date(this.start_date.getTime() + (this.effective_days * 24 * 3600 * 1000));
		//console.log(new Date(this.start_date.getTime() + (this.effective_days * 24 * 3600 * 1000)));
	},

	convertDate: function (d) {
		function pad(s) { return (s < 10) ? '0' + s : s; }
		return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
	}
};


exports.schema = function () {
	return schema;
};


exports.model = function () {
	return mongoose.model('Survey', schema);
};