import { Ingredient } from "../models/ingredient.model";
import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  addItem(name: string, amount: number) {
    console.log('add item ' + name + ', ' + amount);
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItems(items: Ingredient[]) {
    // deconstruct items array and add its individual elements
    // into existing ingredients array using spread operator
    console.log('add items ', items);
    this.ingredients.push(...items);
  }

  getItems(): Ingredient[] {
    console.log('get items');
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    console.log('remove item ' + index);
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    //console.log('store list ' + token);
    const userId = this.authService.getActiveUser().uid;
    let query = 'https://ionic2-recipebook-69dd9.firebaseio.com/';
          query += userId;
          query += '/shopping-list.json?auth=';
          query += token;

    return this.http.put(query, this.ingredients)
      .map((response: Response) => {
        return response.json();
      });
  }

  getList(token: string) {
    //console.log('get list ' + token);
    const userId = this.authService.getActiveUser().uid;
    let query = 'https://ionic2-recipebook-69dd9.firebaseio.com/';
          query += userId;
          query += '/shopping-list.json?auth=';
          query += token;

    return this.http.get(query)
      .map((response: Response) => {
        return response.json();
      })
      .do((ingredients: Ingredient[]) => { // use response data if someone else subscribes
        // overwrite ingredients with data from server
        if (ingredients) {
          this.ingredients = ingredients;
        } else {
          this.ingredients = [];
        }
      });
  }
}
