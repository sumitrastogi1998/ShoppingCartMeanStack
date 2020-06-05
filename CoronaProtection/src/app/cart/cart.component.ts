import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Items } from '../model/items';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  item: number
  display
  constructor(public cartService: CartService, private router: Router) {
    if(this.cartService.items.length > 0){
      this.display = false
    }
    else{
      this.display = true
    }
   }

  ngOnInit(): void {
  }
  incrementItem(valueName, valueCounter){
    this.item = this.cartService.items.findIndex(n=> n.name === valueName)
     this.cartService.items[this.item].counter++
     this.cartService.items[this.item].isDisabled = false;
     this.cartService.calcTotal()
  }

  decrementItem(valueName, valueCounter){
    this.item = this.cartService.items.findIndex(n=> n.name === valueName)
    if(this.cartService.items[this.item].counter === 1){
       this.cartService.items[this.item].isDisabled = true;
       this.cartService.items[this.item].counter--
       this.cartService.calcTotal()
     }
     else
     {
      this.cartService.items[this.item].counter--
      this.cartService.calcTotal()
     }
     
    
  }
  flag: boolean = false
  checkOut(){
    for (let index = 0; index < this.cartService.cartItems.length; index++) {
      if(this.cartService.cartItems[index].counter>0)
      {
        this.flag = true;
      }
    }
    if(this.flag === false){
      alert('Oops... Checkout not possible You seems to have no item in your cart')
    }
    else{
      this.router.navigate(['/payment'])
    }
    
  }



}
