//Import the mongoose dependency
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection err'));
db.once('open' ,  ()=> {
   console.log("connected successfully");
});
/**
 * mongodb is connect on port 27017
 * Please change if required
 */
mongoose.connect("mongodb://localhost:27017/bgproducts");

module.export = db;