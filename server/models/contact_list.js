'use strict';


/**
 * Get Dependencies
 */
var contactListSchema = require('../schemas/contact_list').model();


/**
 * Initialize ContactList Model
 */
var contactListModel = {

	/* list */
	
	list: function (user_id, fn) {
		contactListSchema
			.find({ user: user_id }, '_id name contacts created_at updated_at')
			.populate({path: 'contacts', select: '_id name email'})
			.exec(function (err, contactLists) {
				fn(err, contactLists);
			});
	},

	/* show */

	show: function (user_id, contact_list_id, fn) {
		contactListSchema
			.findOne({ user: user_id, _id: contact_list_id }, '_id name contacts created_at updated_at')
			.populate({path: 'contacts', select: '_id name email'})
			.exec(function (err, contactList) {
				fn(err, contactList);
			});
	},

	/* create */
	
	create: function (user_id, contactList, fn) {
		var newContactList = new contactListSchema();

		newContactList.user = user_id;
		if (contactList.name) newContactList.name = contactList.name;
		if (contactList.contacts) {
			newContactList.contacts = [];
			for (var i = contactList.contacts.length - 1; i >= 0; i--) {
				newContactList.contacts.push(contactList.contacts[i]._id);
			}
		}
		
		newContactList.save(function (err) {
			fn(err, newContactList);
		});
	},

	/* update */

	update: function (user_id, contact_list_id, contactList, fn) {
		contactListSchema.findOne({ user: user_id, _id: contact_list_id },function (err, editContactList) {
			if (err) {
				fn(err, editContactList);
			} else {
				if (contactList.name) editContactList.name = contactList.name;
				if (contactList.contacts) {
					editContactList.contacts = [];
					for (var i = contactList.contacts.length - 1; i >= 0; i--) {
						editContactList.contacts.push(contactList.contacts[i]._id);
					}
				}
				editContactList.updated_at 	= Date.now();

				editContactList.save(function (err) {
					fn(err, editContactList);
				});
			}
		});
	},

	/* delete */

	delete: function (user_id, contact_list_id, fn) {
		contactListSchema.findOne({ user: user_id, _id: contact_list_id },function (err, contactList) {
			if (err) {
				fn(err, contactList);
			} else {
				contactList.remove(function (err) {
					fn(err, contactList);
				});
			}
		});
	}
	
};


module.exports = contactListModel;