import { Component, OnInit, signal } from '@angular/core';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.less'
})
export class Products implements OnInit {
  public products = signal<Category[]>([]);

  ngOnInit(): void {
      fetch('http://localhost:8080/api/product').then(res => res.json()).then(data => {
          this.products.set(data);
          console.log(data);
      });
  }
}
