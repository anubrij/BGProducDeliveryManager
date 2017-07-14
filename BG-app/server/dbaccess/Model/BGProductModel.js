'use strict';

var mongoose = require('mongoose');
/**
 * Proder order schema for monogo db
 * return with BGProduct model
 */
var bgProductModel = function() {
	var productSchema = mongoose.Schema({
		orderId: String,
		companyName: String,
		customerAddress: String,
		orderedItem: String
	});

	return mongoose.model('BGProduct', productSchema);
}


module.exports = new bgProductModel();