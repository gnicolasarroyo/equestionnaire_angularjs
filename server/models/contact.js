'use strict';


/**
 * Get Dependencies
 */
var contactSchema 		= require('../schemas/contact').model(),
	contactListSchema 	= require('../schemas/contact_list').model();


/**
 * Initialize Contact Model
 */
var contactModel = {

	/* list */
	
	list: function (user_id, fn) {
		contactSchema
			.find({ user: user_id }, '_id name email created_at updated_at')
			.exec(function (err, contacts) {
				fn(err, contacts);
			});
	},

	/* show */

	show: function (user_id, contact_id, fn) {
		contactSchema
			.findOne({ user: user_id, _id: contact_id }, '_id name email created_at updated_at')
			.exec(function (err, contact) {
				fn(err, contact);
			});
	},

	/* create */
	
	create: function (user_id, contact, fn) {
		var newContact = new contactSchema();

		newContact.user = user_id;
		if (contact.name) 	newContact.name 	= contact.name;
		if (contact.email) 	newContact.email 	= contact.email;

		newContact.save(function (err) {
			fn(err, newContact);
		});
	},

	/* update */

	update: function (user_id, contact_id, contact, fn) {
		contactSchema.findOne({ user: user_id, _id: contact_id },function (err, editContact) {
			if (err) {
				fn(err, editContact);
			} else {
				if (contact.name) 	editContact.name 	= contact.name;
				if (contact.email) 	editContact.email 	= contact.email;
				editContact.updated_at = Date.now();

				editContact.save(function (err) {
					fn(err, editContact);
				});
			}
		});
	},

	/* delete */

	delete: function (user_id, contact_id, fn) {
		function removeContactInContactLists (contact_id) {
			contactListSchema.find({ user: user_id, contacts: contact_id }, function (err, contactLists) {
				contactLists.forEach(function (contactList) {
					contactList.contacts.splice(contactList.contacts.indexOf(contact_id), 1);
					contactList.save();
				});
			});
		}

		contactSchema.findOne({ user: user_id, _id: contact_id },function (err, contact) {
			if (err) {
				fn(err, contact);
			} else {
				removeContactInContactLists(contact._id);
				contact.remove(function (err) {
					fn(err, contact);
				});
			}
		});
	}
	
};


module.exports = contactModel;