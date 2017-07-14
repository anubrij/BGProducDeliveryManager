var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection err'));
db.once('open' ,  ()=> {
   console.log("connected successfully");
});
mongoose.connect("mongodb://localhost:27017/bgproducts");

module.export = db;