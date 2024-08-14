import { Injectable } from '@angular/core';
import { Items } from './model/items';
import { Router } from '../../node_modules/@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { FileUser } from './model/fileuser';

@Injectable({
  providedIn: 'root'
})
export class CartService {



  cartItems: Items[] = []
  unique: boolean[] = []

  total: number = 0;
  items: Items[] = []

  isUniqueSet = false

  itemWiseTotal: number[] = []

  constructor(private router: Router, private http: HttpClient) {
  }

  addProduct(formdata: FormData): Observable<any> {
    return this.http.post<FileUser[]>('http://localhost:3000/api/add-item', formdata);
  }

  addItems() {
    if (this.isUniqueSet == false) {
      for (let index = 0; index < this.items.length; index++) {
        this.unique.push(true)
        this.itemWiseTotal.push(0)
      }
      this.isUniqueSet = true
    }

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].counter > 0 && this.unique[i] === true) {
        this.unique[i] = false;
        this.cartItems.unshift(this.items[i])
      }
    }
    this.calcTotal()
    this.router.navigate(['/cart']);
  }

  calcTotal() {
    this.total = 0;
    for (let index = 0; index < this.itemWiseTotal.length; index++) {
      this.itemWiseTotal[index] = this.items[index].counter * this.items[index].price;
      this.total += this.itemWiseTotal[index]
    }
  }
}
