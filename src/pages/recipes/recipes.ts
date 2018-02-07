import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipePage } from '../recipe/recipe';
import { DatabaseOptionsPage } from '../db-options/db-options';
import { AuthService } from '../../services/auth.service';

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
              private recipeService: RecipeService,
              private authService: AuthService,
              private popoverCtrl: PopoverController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
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

  onShowOptions(event: MouseEvent) {
    // init loader
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // display popover
    let popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event}); // mouse event store coordinates to display
    // listen to data when dismissing popover view (action)
    popover.onDidDismiss(
      data => {
        // handle if user click outside popover
        if (!data) {
          return;
        }
        if (data.action == 'load') {
          console.log('load shopping list');
          loader.present();
          // refactor this code later because it is duplicated
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.recipeService.getList(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      console.log('Successfully got recipe list');
                      loader.dismiss();
                      if (list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
                      }
                    },
                    error => {
                      loader.dismiss();
                      //console.error(error.json().error);
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
        }
        if (data.action == 'save') {
          // console.log('use token from auth service to save shopping list');
          loader.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.recipeService.storeList(token)
                  .subscribe(
                    () => {
                      loader.dismiss();
                      console.log('Successfully stored recipe list')
                    },
                    error => {
                      //console.error(error);
                      loader.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
        }
      }
    );
  }

  private handleError(errorMessage: string) {
    let alert = this.alertCtrl.create({
      title: 'An Error Occurred!',
      subTitle: errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }

}
