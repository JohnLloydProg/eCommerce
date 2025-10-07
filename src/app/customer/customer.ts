import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-customer',
  imports: [FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.less'
})
export class Customer implements OnInit{
  firstName:string | null= localStorage.getItem('firstName');
  middleName:string | null= localStorage.getItem('middleName');
  lastName:string | null= localStorage.getItem('lastName');
  customerId = signal<number>(0);

  ngOnInit(): void {

    if (localStorage.getItem('customerId') !== null) {
      this.customerId.set(parseInt(localStorage.getItem('customerId') || '0', 10));
    }
  }

  submitForm() {
    fetch(`http://localhost:8080/api/customer/${this.firstName?.replace(" ", "_")}/${this.middleName?.replace(" ", "_")}/${this.lastName?.replace(" ", "_")}`)
    .then(res => res.json()).then(data => {
      this.customerId.set(data);
      localStorage.setItem('customerId', this.customerId().toString());
      if (this.firstName) localStorage.setItem('firstName', this.firstName);
      if (this.middleName) localStorage.setItem('middleName', this.middleName);
      if (this.lastName) localStorage.setItem('lastName', this.lastName);
    });
    
  }
}
