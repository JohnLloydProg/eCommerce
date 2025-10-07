import { Component, OnInit, signal } from '@angular/core';
import { Category } from '../interfaces/category';
import { CartItem } from '../components/cart-item/cart-item';

@Component({
  selector: 'app-cart',
  imports: [CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.less'
})
export class Cart implements OnInit {
  products = signal<Category[]>([]);
  orders = signal<number[]>([]);
  total = signal<number>(0);

  ngOnInit(): void {
      fetch('http://localhost:8080/api/product').then(res => res.json()).then(data => {
          for (let category of data) {
              let new_products = [];
              for (let product of category.products) {
                if (localStorage.getItem(product.id.toString()) !== null) {
                  product.quantity = parseInt(localStorage.getItem(product.id.toString()) || '0', 10);
                  product.totalPrice = product.quantity * parseFloat(product.price.replace('P', ''));
                  new_products.push(product);
                }
              }
              category.products = new_products;
          }
          this.products.set(data);
          console.log(data);
      });
  }

  computeTotal() {
    let products = this.products().flatMap(cat => cat.products);
    let sum = 0;
    for (let order of this.orders()) {
      let product = products.find(p => p.id === order);
      if (product) {
        if (product.totalPrice) {
          sum += product.totalPrice;
        }
      }
    }
    this.total.set(sum)
  }

  addToOrder(int:number) {
    this.orders().push(int);
    this.computeTotal();
    ;
    console.log(this.orders);
  }

  removeFromOrder(int:number) {
    const index = this.orders().indexOf(int);
    if (index > -1) {
      delete this.orders()[index];
      this.orders.set(this.orders().filter(item => item !== undefined));
    }
    this.computeTotal();
  }

  checkout():void {
    let firstName:string | null= localStorage.getItem('firstName');
    let middleName:string | null= localStorage.getItem('middleName');
    let lastName:string | null= localStorage.getItem('lastName');
    let customerId:string | null = localStorage.getItem('customerId');
    localStorage.clear();
  }
}
