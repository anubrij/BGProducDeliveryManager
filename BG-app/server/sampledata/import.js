var db = require('../dbaccess/db');
var BGProduct = require('../dbaccess/Model/BGProductModel');

var fs = require("fs");

fs.readFile('sample.txt','utf8',function(err , data) {
    if(err)
        return console.log(err);
    var data = data.split("\n");
    data.forEach(function(element) {
       element = element.trim().split(",");
       var find = BGProduct.find({orderId  : element[0]},function(err , p){
                if(p.length == 0){
                    var product = new BGProduct({
                        orderId: element[0].trim(),
                        companyName: element[1].trim(),
                        customerAddress: element[2].trim(),
                        orderedItem: element[3].trim()
                    });
                    product.save(function(err, p){
                            if(err)
                                connsole.log(err);
                            else
                                console.log(p);

                    });
                }
       });
    }, this);
    return console.log("Imported Successfully!")
})