import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})

export class Tab3Page {
  filter: 'all' | 'active' | 'done' = 'all';

  constructor(private itemsService: ItemsService) {}

  get items() {
   const allItems = this.itemsService.getItems();
   if (this.filter === 'all') {
     return allItems;
   } 
   return allItems.filter((item) => this.filter === 'done' ? item.done : !item.done);
  }

  newItemValue = '';

  addItem(description: any) {
    if (!description) return;
    this.itemsService.addItem({
      description,
      done: false,
    });
    this.newItemValue = '';
  }
 
  ngOnInit() {
  }

}
