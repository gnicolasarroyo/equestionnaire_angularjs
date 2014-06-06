'use strict';


/**
 * Get Dependencies
 */
var collaboratorSchema = require('../schemas/collaborator').model();


/**
 * Initialize Collaborator Model
 */
var collaboratorModel = {

	/* list */
	
	list: function (questionnaire_id, fn) {
		collaboratorSchema
			.find({ questionnaire: questionnaire_id }, '_id user created_at updated_at')
			.populate({path: 'user', select: 'first_name last_name'})
			.exec(function (err, collaborators) {
				fn(err, collaborators);
			});
	},

	/* show */

	show: function (questionnaire_id, collaborator_id, fn) {
		collaboratorSchema
			.findOne({ questionnaire: questionnaire_id, _id: collaborator_id }, '_id user created_at updated_at')
			.populate({path: 'user', select: 'first_name last_name'})
			.exec(function (err, collaborator) {
				fn(err, collaborator);
			});
	},

	/* create */
	
	create: function (questionnaire_id, collaborator, fn) {
		var newCollaborator = new collaboratorSchema();

		newCollaborator.questionnaire = questionnaire_id;
		if (collaborator.user) newCollaborator.user = collaborator.user;

		newCollaborator.save(function (err) {
			fn(err, newCollaborator);
		});
	},

	/* delete */

	delete: function (questionnaire_id, collaborator_id, fn) {
		collaboratorSchema.findOne({ questionnaire: questionnaire_id, _id: collaborator_id }, function (err, collaborator) {
			if (err) {
				fn(err, collaborator);
			} else {
				collaborator.remove(function (err) {
					fn(err, collaborator);
				});
			}
		});
	}
	
};


module.exports = collaboratorModel;