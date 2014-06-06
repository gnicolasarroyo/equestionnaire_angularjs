'use strict';


/**
 * Get Dependecies
 */
var contactModel = require('../models/contact');


/**
 * Initialize Contact Controller
 */
var contactController = {
	
	/* list */
	
	list: function (req, res, next) {
		contactModel.list(req.session.user, function (err, contacts) {
			if (err) res.send(404, err);
		    else res.json(contacts);
		});
	},

	/* show */

	show: function (req, res, next) {
		contactModel.show(req.session.user, req.params.contact_id, function (err, contact) {
			if (err) res.send(404, err);
		    else res.json(contact);
		});
	},

	/* create */
	
	create: function (req, res, next) {
		contactModel.create(req.session.user, {
			name: 	req.body.name,
			email: 	req.body.email
		}, function (err, contact) {
			if (err) res.send(404, err);
		    else res.json(contact);
		});
	},

	/* update */

	update: function (req, res, next) {
		contactModel.update(req.session.user, req.params.contact_id, {
			name: 	req.body.name,
			email: 	req.body.email
		}, function (err, contact) {
			if (err) res.send(404, err);
		    else res.json(contact);
		});
	},

	/* delete */

	delete: function (req, res, next) {
		contactModel.delete(req.session.user, req.params.contact_id, function (err, contact) {
			if (err) res.send(404, err);
		    else res.json(contact);
		});
	}
};


module.exports = contactController;