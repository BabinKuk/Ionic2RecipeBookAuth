import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';
import { AuthService } from '../../services/auth.service';
import { DatabaseOptionsPage } from '../db-options/db-options';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private shoppingListService: ShoppingListService,
    private authService: AuthService,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  } */

  // always execute when page is presented
  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    console.log(form);
    this.shoppingListService.addItem(form.value.ingredientName, form.value.ingredientAmount);
    // reset form
    form.reset();
    this.loadItems();
  }

  onRemoveItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getItems();
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
                this.shoppingListService.getList(token)
                  .subscribe(
                    (list: Ingredient[]) => {
                      console.log('Successfulla got shopping list');
                      loader.dismiss();
                      if (list) {
                        this.listItems = list;
                      } else {
                        this.listItems = [];
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
                this.shoppingListService.storeList(token)
                  .subscribe(
                    () => {
                      loader.dismiss();
                      console.log('Successfulla stored shopping list')
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
