import { Ingredient } from "./ingredient.model";

export class Recipe {

  title: string;
  description: string;
  difficulty: string;
  ingredients: Ingredient[];

  constructor(public title: string,
    public description: string,
    public difficulty: string,
    public ingredients: Ingredient[]) {
      this.title = title;
      this.description = description;
      this.difficulty = difficulty;
      this.ingredients = ingredients;
  }
}
