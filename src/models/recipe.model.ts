import { Ingredient } from "./ingredient.model";

export class Recipe {

  title: string;
  description: string;
  difficulty: string;
  ingredients: Ingredient[];

  constructor(title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]) {
      this.title = title;
      this.description = description;
      this.difficulty = difficulty;
      this.ingredients = ingredients;
  }
}
