import { Injectable } from '@angular/core';
import { Item } from '../item';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(
    []
  );
  items$: Observable<Item[]> = this.itemsSubject.asObservable();
  private storageKey = 'items';
  // The BehaviorSubject is a special type of Subject that keeps hold of the current value and emits it to any new subscribers as soon as they subscribe, while regular Subjects don't store the current value and only emit values that are published after a subscription is created.
  // The $ suffix is a convention that indicates that the variable is an Observable.
  // The asObservable() method returns an Observable that can be subscribed to, but not published to.

  constructor() {
    this.loadItemsFromStorage();
  }

  private loadItemsFromStorage(): void {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.itemsSubject.next(JSON.parse(storedItems));
    }
  }

  private saveItemsToStorage(items: Item[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getItems(): Item[] {
    return this.itemsSubject.getValue();
  }

  setItems(items: Item[]): void {
    this.itemsSubject.next(items);
    this.saveItemsToStorage(items);
  }

  addItem(item: Item): void {
    const currentItems = this.getItems();
    currentItems.push(item);
    this.setItems(currentItems);
  }

  removeItem(item: Item): void {
    const currentItems = this.getItems();
    currentItems.splice(currentItems.indexOf(item), 1);
    this.setItems(currentItems);
  }


  // save items does work but I need to save whether or not the item is done and ensure the filter works
  updateItem(item: Item, changes: Partial<Item>): void {
    const currentItems = this.getItems();
    Object.assign(currentItems[currentItems.indexOf(item)], changes);
    this.setItems(currentItems);
  }
  toggleDone(item: Item): void { 
    this.updateItem(item, { done: !item.done });
  }
}
