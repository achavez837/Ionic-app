import { Component } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-item',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})

export class Tab3Page {
  filter: 'all' | 'active' | 'done' = 'all';

  allItems = [
    { description: 'Drink Coffee', done: true },
    { description: 'Sleep', done: false },
    { description: 'Play Minecraft', done: false },
    { description: 'Feed the Cats', done: false },
  ];

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === 'done' ? item.done : !item.done
    );
  }

  addItem(description: string) {
    if (description.length > 0) {
      this.allItems.push({
        description,
        done: false,
      });
    }
  }

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

  constructor() {}
}
