import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipePage } from '../recipe/recipe';

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private recipeService: RecipeService) {
  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  } */

  onAddRecipe() {
    console.log('new recipe');
    // pass data to EditRecipePage because
    // the page is used for both edit and add
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(index: number, recipe: Recipe) {
    console.log('onLoadRecipe ' + index);
    // pass data to recipe page
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

}
