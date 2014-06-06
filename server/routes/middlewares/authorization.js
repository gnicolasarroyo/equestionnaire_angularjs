'use strict';


/**
 * Get Dependencies
 */
var authenticationModel = require('../../models/authentication');


/**
 * Require Login
 */
module.exports.requireLogin = function(req, res, next) {
    if (!req.session.user) {
        req.session.destroy();
        return res.redirect('/authentication/login');
    }
    next();
};


/**
 * API Require Login
 */
module.exports.apiRequireLogin = function(req, res, next) {
    if (!req.session.user) {
        req.session.destroy();
        return res.send(401, 'User is not authorized');
    }
    next();
};