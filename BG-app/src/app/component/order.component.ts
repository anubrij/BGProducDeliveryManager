//import core component
import { Component } from '@angular/core';

//import the order service connect with server
import {OrderService} from '../service/order.service';

//Component decorator
@Component({
  selector: 'order',
  templateUrl: '../html/orderlist.html',
  providers:[OrderService]
})

//Order component class
export class OrderComponent{
    companies:string[];
    addresses:string[];
    orders:order[];
    selectedCompany : string;
    selectedAddress : string;
    orderCounts:orderCount[];
   
    /**
     * consutructor with  injected order service
     * @param orderService : order service injection
     */
    constructor(private orderService: OrderService){
       this.addresses = [];
       this.companies = [];
       this.selectedAddress = "";
       this.selectedCompany = "";
        this.LoadOrders();
        this.LoadCompany();
        this.LoadAddress();
        this.LoadProductFrequency();
    }
    /**
     * Load order from rest api
      @this.selectedCompany : selected company filter from company dropdown
      @this.selectedAddress: selected address filter from address drop down
     */
    LoadOrders(){
            this.orderService.getOrders(this.selectedCompany , this.selectedAddress).subscribe(orders =>{
                    this.orders = orders;
           });
    };
    /*
     Load distinct list of company from node rest service
    */
    LoadCompany(){
            this.orderService.getCompany().subscribe(companies =>{
                    this.companies = [""].concat(companies);
            }); 
    }
    /*
     Load distinct list of address from node rest service
    */
    LoadAddress(){
            this.orderService.getAddress().subscribe(addresses =>{
                this.addresses = [""].concat(addresses);
            });
    } 
    
    /**
     * Product order frequency loaded from node rest api
     */
    LoadProductFrequency(){
         this.orderService.getProductFrequency().subscribe(orderCounts =>{
            this.orderCounts = JSON.parse(orderCounts);
           
        }); 
    } 

    /**
     * On company change event to filter the data
     */
    onCompanyChange(){
        this.LoadOrders();
    }
    /**
     * On address change event to filter the data
     */ 
    onAddressChange(){
        this.LoadOrders();
    } 
    /**
     * delete the record by passing the ordr id as parameter
     * @param orderId : Order id as defined in sample file
     * @param i 
     */
    deleteOrder(orderId:string , i:any){
        this.orderService.deleteOrder(orderId).subscribe(resText =>{
            this.orders.splice(i , 1);
            this.LoadProductFrequency();
            this.LoadCompany();
            this.LoadAddress();
            alert(resText);
        })
    }
}

/**
 * Order interface
 */
interface order{
		orderId: String,
		companyName: String,
		customerAddress: String,
		orderedItem: String
};

interface orderCount{
    _id:string,
    count: number
}


