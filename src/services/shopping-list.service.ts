import { Ingredient } from "../models/ingredient.model";

export class ShoppingListService {

  private ingredients: Ingredient[] = [];

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
}
