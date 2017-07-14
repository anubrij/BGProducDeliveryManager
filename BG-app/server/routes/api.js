//Import the dependencies
var express = require("express");

var router = express.Router();

//Import the BGProduct schema to communicate with database
var BGProduct = require('../dbaccess/Model/BGProductModel');

/* GET api listing. */
router.get('/', (req, res) => {
   res.send("api working!")
});
/**
 * Get all order in db 
 * @filter : companyName as query string
 * @filter : address as query string
 */
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
/**
 * Get all the distinct company in db
 */
router.get('/getAllCompany' , (req , res) => {
    BGProduct.distinct('companyName' , function(err , companies){
        if(err)
            throw err;
        else
            res.send(companies);
    })
});
/**
 * get all the distict address in db
 */
router.get('/getAllAddress' , (req , res) => {
    BGProduct.distinct('customerAddress' , function(err , addresses){
        if(err)
            throw err;
        else
            res.send(addresses);
    });
});
/**
 * Get the product order frequency
 */
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
/**
 * delete the order from db
 * @param id : order id send as query string
 */
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