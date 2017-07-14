'use strict';

var mongoose = require('mongoose');

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