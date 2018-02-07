import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import 'rxjs/Rx';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  addRecipe(title: string,
            desc: string,
            difficulty: string,
            ingredients: Ingredient[]) {
    console.log('adding recipe ' + title, ingredients);
    this.recipes.push(new Recipe(title, desc, difficulty, ingredients));
    console.log('recipes', this.recipes);
  }

  getRecipes() {
    console.log('getting recipes');
    return this.recipes.slice(); // return copy
  }

  editRecipe(index: number,
             title: string,
             desc: string,
             difficulty: string,
             ingredients: Ingredient[]) {
    console.log('edit recipe ' + index + ', ' + title);
    // overwrite existing item
    this.recipes[index] = new Recipe(title, desc, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    console.log('remove recipe ' + index);
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    //console.log('store list ' + token);
    const userId = this.authService.getActiveUser().uid;
    let query = 'https://ionic2-recipebook-69dd9.firebaseio.com/';
          query += userId;
          query += '/recipes.json?auth=';
          query += token;

    return this.http.put(query, this.recipes)
      .map((response: Response) => {
        return response.json();
      });
  }

  getList(token: string) {
    //console.log('get list ' + token);
    const userId = this.authService.getActiveUser().uid;
    let query = 'https://ionic2-recipebook-69dd9.firebaseio.com/';
          query += userId;
          query += '/recipes.json?auth=';
          query += token;

    return this.http.get(query)
      .map((response: Response) => {
        // check recipes, if not exist set to []
        const recipes: Recipe[] = response.json() ? response.json() : [];
        // check ingredients inside recipes
        for (let item of recipes) {
          // if there are no ingredients, set to []
          if (!item.hasOwnProperty('ingredients')) {
            item.ingredients = [];
          }
        }
        return recipes;
      })
      .do((recipes: Recipe[]) => { // use response data if someone else subscribes
        // overwrite recipes with data from server
        if (recipes) {
          this.recipes = recipes;
        } else {
          this.recipes = [];
        }
      });
  }

}
