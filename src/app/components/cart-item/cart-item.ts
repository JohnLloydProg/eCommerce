import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.less'
})
export class CartItem {
  id = input.required<number>();
  name = input.required<string>();
  price = input.required<string>();
  imageFile = input.required<string>();
  unitOfMeasure = input.required<string>();
  quantity = input<string>();
  totalPrice = input<string>();
  @Output() addToOrder = new EventEmitter<number>();
  @Output() removeFromOrder = new EventEmitter<number>();
  isChecked = false;

  onCheckboxChange(event: any) {
    this.isChecked = event.target.checked;
    if (this.isChecked) {
      this.addToOrder.emit(this.id());
    } else {
      this.removeFromOrder.emit(this.id());
    }
  }


}
