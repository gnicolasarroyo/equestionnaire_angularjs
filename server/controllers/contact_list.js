'use strict';


/**
 * Get Dependecies
 */
var contactListModel = require('../models/contact_list');


/**
 * Initialize Contact List Controller
 */
var contactListController = {
	
	/* list */
	
	list: function (req, res, next) {
		contactListModel.list(req.session.user, function (err, contactLists) {
			if (err) res.send(404, err);
		    else res.json(contactLists);
		});
	},

	/* show */

	show: function (req, res, next) {
		contactListModel.show(req.session.user, req.params.contact_list_id, function (err, contactList) {
			if (err) res.send(404, err);
		    else res.json(contactList);
		});
	},

	/* create */
	
	create: function (req, res, next) {
		contactListModel.create(req.session.user, {
			name: 		req.body.name,
			contacts: 	req.body.contacts
		}, function (err, contactList) {
			if (err) res.send(404, err);
		    else res.json(contactList);
		});
	},

	/* update */

	update: function (req, res, next) {
		contactListModel.update(req.session.user, req.params.contact_list_id, {
			name: 		req.body.name,
			contacts: 	req.body.contacts
		}, function (err, contactList) {
			if (err) res.send(404, err);
		    else res.json(contactList);
		});
	},

	/* delete */

	delete: function (req, res, next) {
		contactListModel.delete(req.session.user, req.params.contact_list_id, function (err, contactList) {
			if (err) res.send(404, err);
		    else res.json(contactList);
		    // Borrar en las lista de contactListos donde aparezca
		    //ContactListListModel.find({ contactLists: "516741e4b8ac79000000000a" }, function (err, markets) {
		});
	}
};


module.exports = contactListController;