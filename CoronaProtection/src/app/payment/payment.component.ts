import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  street: null
  pincode: null
  state: null
  city: null
  
  constructor(private cartService: CartService) { }

  
  ngOnInit(): void {
  }

  paymentSuccess(){
    if(this.cartService.total !== 0)
    {
    alert('ThankYou for placing this order\nOrder placed Successfully...\nTotal Amount To be paid : '+this.cartService.total)
    }else{
      alert("Order can't be placed since you doesn't selected any of the items")
    }
  }

}
