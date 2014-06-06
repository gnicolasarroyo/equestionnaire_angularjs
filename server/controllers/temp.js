'use strict';


/**
 * Get Dependecies
 */
var campaingModel = require('../models/campaing');


/**
 * Initialize Campaing Controller
 */
var campaingController = {
	
	/* list */
	
	list: function (req, res, next) {
		campaingModel.list(req.session.user, function (err, campaings) {
			if (err) res.send(404, {});
		    else res.json(campaings);
		});
	},

	/* show */

	show: function (req, res, next) {
		campaingModel.show(req.session.user, req.params.campaing_id, function (err, campaing) {
			if (err) res.send(404, {});
		    else res.json(campaing);
		});
	},

	/* create */
	
	create: function (req, res, next) {
		campaingModel.create(req.session.user, {
			crop: req.body.crop ? req.body.crop : '',
			name: req.body.name ? req.body.name : ''
		}, function (err, campaing) {
			if (err) res.send(404, {});
		    else res.json(campaing);
		});
	},

	/* update */

	update: function (req, res, next) {
		campaingModel.update(req.session.user, req.params.campaing_id, {
			crop: req.body.crop ? req.body.crop : '',
			name: req.body.name ? req.body.name : ''
		}, function (err, campaing) {
			if (err) res.send(404, {});
		    else res.json(campaing);
		});
	},

	/* delete */

	delete: function (req, res, next) {
		campaingModel.delete(req.session.user, req.params.campaing_id, function (err, campaing) {
			if (err) res.send(404, {});
		    else res.json(campaing);
		});
	}
};


module.exports = campaingController;