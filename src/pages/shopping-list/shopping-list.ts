import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';

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
    private shoppingListService: ShoppingListService) {
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

}
