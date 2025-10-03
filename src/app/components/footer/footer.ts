import { Component, OnInit, signal } from '@angular/core';
import { Menu } from '../../interfaces/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.less'
})
export class Footer implements OnInit {
  public menus = signal<Menu[]>([]);

  ngOnInit(): void {
    fetch('http://localhost:8080/api/menu').then(res => res.json()).then(data => {
      this.menus.set(data);
    });
  }
}
