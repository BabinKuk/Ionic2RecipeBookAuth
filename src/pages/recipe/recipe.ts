import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Recipe } from '../../models/recipe.model';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipeService } from '../../services/recipe.service';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shoppingListService: ShoppingListService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private recipeService: RecipeService) {
  }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  } */

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
    console.log(this.recipe, this.index);
  }

  onEditRecipe() {
    console.log('edit recipe ');
    // call edit page and pass data
    this.navCtrl.push(EditRecipePage, {
      mode: 'Edit',
      recipe: this.recipe,
      index: this.index
    });
  }

  onDeleteRecipe() {
    console.log('on Delete Recipe');
    let confirm = this.alertCtrl.create({
      title: 'Delete Recipe?',
      message: 'Do you really want to delete this recipe?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            // console.log('Agree clicked');
            this.recipeService.removeRecipe(this.index);

            // show message
            this.presentToast('Recipe Deleted successfully');

            // navigate to root page
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    confirm.present();
  }

  addIngredients() {
    console.log('add ingredients', this.recipe.ingredients);
    this.shoppingListService.addItems(this.recipe.ingredients);

    // show message
    this.presentToast('Ingredients added to Shopping List');
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
