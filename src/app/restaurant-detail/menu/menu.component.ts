import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/restaurants/restaurants.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  menu: Observable<MenuItem[]>
  

  ngOnInit() {
    this.menu = this.restaurantsService
      .menuOfRestaurant(this.route.parent.snapshot.params['id'])
  }

  addMenuItem(item: MenuItem) {
    console.log(item)
  }

}
