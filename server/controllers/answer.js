'use strict';


/**
 * Get Dependecies
 */
var answerModel = require('../models/answer');


/**
 * Initialize Answer Controller
 */
var answerController = {

	/* list */
	
	list: function (req, res, next) {
		answerModel.list(req.params.survey_id, function (err, answers) {
			if (err) res.send(404, err);
		    else res.json(answers);
		});
	}
};


module.exports = answerController;