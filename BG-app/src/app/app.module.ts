import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/Http';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './component/order.component';
//import {OrderComponent } from './component/orderlist.component';

@NgModule({
  declarations: [
    OrderComponent
    //OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [OrderComponent]
})
export class AppModule { }
