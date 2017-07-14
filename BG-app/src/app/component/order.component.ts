import { Component } from '@angular/core';
import {OrderService} from '../service/order.service';
@Component({
  selector: 'order',
  templateUrl: '../html/orderlist.html',
  providers:[OrderService]
})

export class OrderComponent{
    companies:string[];
    addresses:string[];
    orders:order[];
    selectedCompany : string;
    selectedAddress : string;
    orderCounts:orderCount[];
    //LoadOrder: function;
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
    LoadOrders(){
            this.orderService.getOrders(this.selectedCompany , this.selectedAddress).subscribe(orders =>{
                    this.orders = orders;
           });
    };
    LoadCompany(){
            this.orderService.getCompany().subscribe(companies =>{
                    this.companies = [""].concat(companies);
            }); 
    }
    LoadAddress(){
            this.orderService.getAddress().subscribe(addresses =>{
                this.addresses = [""].concat(addresses);
            });
    } 
    LoadProductFrequency(){
         this.orderService.getProductFrequency().subscribe(orderCounts =>{
            this.orderCounts = JSON.parse(orderCounts);
            //console.log(orderCounts);
        }); 
    } 
    onCompanyChange(){
        this.LoadOrders();
    } 
    onAddressChange(){
        this.LoadOrders();
    } 
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


