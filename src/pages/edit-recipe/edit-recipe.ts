import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

/**
 * Generated class for the EditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{

  mode = 'New';
  difficultyOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipeService) {
  }

  ngOnInit() {
    // retrieve mode
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      // get data
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initForm();
  }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  } */

  private initForm() {
    // init variables/default values
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      // formArray expects formControl object
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required), // default value medium
      'ingredients': new FormArray(ingredients) // form array holding ingredients, form controls
    });
  }

  onSubmit() {
    console.log('submit form ', this.recipeForm.value);
    // init recipe
    const value = this.recipeForm.value;

    // init ingredients and map it into array of objects
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1}; // ingredient object, default amount 1
      });
    }

    // call service
    if (this.mode == 'Edit') {
      this.recipeService.editRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    } else {
      this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    // reset page and go to root page
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    //console.log('Manage Ingredients');
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          //role: 'destructive',
          handler: () => {
            //console.log('Adding ingredient');
            this.createNewIngredient().present();
          }
        },{
          text: 'Remove All',
          role: 'destructive',
          handler: () => {
            console.log('Remove all clicked');
            this.removeAllIngredients();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredient() {
    // console.log('New Ingredient');
    let prompt = this.alertCtrl.create({
      title: 'New Ingredient',
      message: "Enter a name for new ingredient you're so keen on adding",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log('Add clicked');
            if (data.name.trim() == '' || data.name == null) {
              this.presentToast('Please enter valid ingredient name');
              return;
            }
            // add new item into ingredients array
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));

            // show message
            this.presentToast('New ingredient added successfully');
          }
        }
      ]
    });
    //prompt.present();
    return prompt;
  }

  removeAllIngredients() {
    console.log('Remove All Ingredients');
    const frmArray = <FormArray>this.recipeForm.get('ingredients');
    //console.log(frmArray);
    const frmLen = frmArray.length;
    // loop if length>0
    if (frmLen > 0) {
      for (let i = frmLen - 1; i >= 0; i--) { //backwards
        console.log('remove i ' + i + ' ' + frmArray.value[i]);
        frmArray.removeAt(i);

        // show message
        this.presentToast('All ingredients deleted successfully');
      }
    }
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
