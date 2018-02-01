import { Ingredient } from "./ingredient.model";

export class Recipe {

  private title: string;
  private description: string;
  private difficulty: string;
  private ingredients: Ingredient[];

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
