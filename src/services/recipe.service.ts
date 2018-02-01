import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";

export class RecipeService {

  private recipes: Recipe[] = [];

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
}
