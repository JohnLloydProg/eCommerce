import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '../interfaces/category';
import { CartItem } from '../components/cart-item/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.less'
})
export class Cart implements OnInit {
  router = inject(Router);
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
    if (this.orders().length === 0) return;
    for (let order of this.orders()) {
      localStorage.removeItem(order.toString());
    }
    console.log('Thank you for your purchase!');
    this.router.navigate(['/product']);
  }
}
