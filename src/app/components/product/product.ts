import { Component, input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.less'
})
export class Product implements OnInit {
  id = input.required<number>();
  name = input<string>("No Name");
  description = input<string>("No Description");
  price = input<string>("P0.00");
  imageFile = input<string>("");
  unitOfMeasure = input<string>("unit");
  addedToCart:number = 0;

  ngOnInit(): void {
    let data:string | null = localStorage.getItem(this.id().toString());
    this.addedToCart = data ? parseInt(data) : 0;
  }

  addToCart() {
    let data:string | null = localStorage.getItem(this.id().toString());
    this.addedToCart = data ? parseInt(data) : 0;
    this.addedToCart++;
    localStorage.setItem(this.id().toString(), this.addedToCart.toString());
  }
  
  removeFromCart() {
    let data:string | null = localStorage.getItem(this.id().toString());
    this.addedToCart = data ? parseInt(data) : 0;
    if (this.addedToCart > 0) {
      this.addedToCart--;
    }
    localStorage.setItem(this.id().toString(), this.addedToCart.toString());
  }
}
