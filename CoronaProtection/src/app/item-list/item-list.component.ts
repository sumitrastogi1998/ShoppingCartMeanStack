import { Component, OnInit } from '@angular/core';
import { Items } from '../model/items';
import { CartService } from '../cart.service';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Items[]
  config: any;
  public searchByName
  Users: any = [];
  constructor(public cartService: CartService, private router: Router,public fileUploadService: AuthService) {
    //this.getItemList();
    
   }

  ngOnInit(): void {
    if(!!localStorage.getItem('listofitems') == true){
      this.Users = this.cartService.items
    }
    else{
    this.fileUploadService.getAllItems().subscribe((res) => {
      this.Users = res['users'];
      this.cartService.items = res['users']
      localStorage.setItem('listofitems',res['users'])
    })
  }
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.Users.count
    };
    
  }
    

  pageChanged(event){
    this.config.currentPage = event;
  }

  incrementItem(itemAdded,value){
    this.cartService.items[value].counter++
    //console.log(this.cartService.counter[value])
    //this.cartService.calcTotal(itemAdded,this.cartService.counter[value],value)
    this.cartService.items[value].isDisabled = false;
  }

  decrementItem(itemAdded,value){
    if(this.cartService.items[value].counter === 1){
      this.cartService.items[value].isDisabled = true;
      this.cartService.items[value].counter--
    }
    else
    {
      this.cartService.items[value].counter--
      //this.cartService.calcTotal(itemAdded,this.cartService.counter[value],value)
    }
    
  }

  displayItems(){
    this.cartService.addItems();
  }
}
