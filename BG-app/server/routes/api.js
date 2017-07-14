var express = require("express");

var router = express.Router();

var BGProduct = require('../dbaccess/Model/BGProductModel');

/* GET api listing. */
router.get('/', (req, res) => {
   res.send("api working!")
});
router.get('/getAllOrder' , (req , res)=>{
    var companyName = req.query.companyName;
    var address = req.query.address;
    var filter = {};
    if(companyName){
        filter.companyName = companyName;
    }
    if(address){
        filter.customerAddress = address;
    }
    console.log(filter);
    BGProduct.find(filter , function(err, order) {
        if(err)
            throw err;
        else
            res.send(order);
    });
});
router.get('/getAllCompany' , (req , res) => {
    BGProduct.distinct('companyName' , function(err , companies){
        if(err)
            throw err;
        else
            res.send(companies);
    })
});
router.get('/getAllAddress' , (req , res) => {
    BGProduct.distinct('customerAddress' , function(err , addresses){
        if(err)
            throw err;
        else
            res.send(addresses);
    });
});
router.get('/getProductFrequency' , (req , res) => {
    BGProduct.aggregate([
        {$match : {} } , 
        { 
            $group :
             {
                 _id : '$orderedItem' , 
                 count : {
                      $sum : 1
                    }
            }
        }

    ], function(err , items){
        if(err)
            throw err;
        else
            res.send(items.sort(function(a,b){
                return b.count -a.count;
            }));
    });
});
router.delete('/order',(req , res)=>{
    var orderId = req.query.id;
    if(orderId)
    {
        BGProduct.remove({orderId : orderId},function(err){
            if(err)
                throw err;
            else
                res.send("deleted successfully!");
        });
    }
    
})

module.exports = router;