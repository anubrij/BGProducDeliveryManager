import {Injectable} from '@angular/core';
import {Http} from '@angular/Http';
import 'rxjs/add/operator/map';
@Injectable()
export class OrderService{
    constructor(private http: Http){
        console.log('service initialized!');
    }
    getOrders(companyName:string , address:string){
        return this.http.get('/api/getAllOrder?companyName=' + (companyName ? companyName : '') + '&address=' + (address ? address : ''))
                .map(res=> res.json());
    };

    getCompany(){
        return this.http.get("/api/getAllCompany").map(res=> res.json());
    };
    getAddress(){
        return this.http.get("/api/getAllAddress").map(res=> res.json());
    };
    getProductFrequency(){
         return this.http.get("/api/getProductFrequency").map(res=> res.text());
    }
    deleteOrder(orderId:string){
        return this.http.delete('/api/order?id=' + orderId).map(res => res.text());
    }
}