import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { Item } from '../item';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  editable = false;
  editedItemValue: string = '';
  @Input() item!: Item;
  // @Output() remove: EventEmitter<Item> = new EventEmitter<Item>();
  // An @Input() serves as a doorway for data to come into the component, and an @Output() acts as a doorway for data to go out of the component. An @Output() has to be of type EventEmitter, so that a component can raise an event when there's data ready to share with another component.
  // The ! in the class's property declaration is called a definite assignment assertion. This operator tells Typescript that the item field is always initialized and not undefined, even when TypeScript cannot tell from the constructor's definition.
  
  constructor(private itemsService: ItemsService) {}

  saveItem(description: string) {
    if (!description) return;
    this.editable = false;
    this.item.description = description;
  }

  removeItem(item: Item) {
    this.itemsService.removeItem(item);
  }

  updateItem(item: Item, changes: Partial<Item>) {
    this.itemsService.updateItem(item, changes);
  }
  toggleDone(item: Item) {
    this.updateItem(item, { done: !item.done });
  }

  ngOnInit() {}
}
