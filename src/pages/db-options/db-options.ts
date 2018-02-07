import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-db-options',
  templateUrl: 'db-options.html',
})
export class DatabaseOptionsPage {

  constructor(private viewCtrl: ViewController) {}

  onAction(action: string) {
    console.log('onAction ' + action);
    // dismis popover and pass data (action)
    this.viewCtrl.dismiss({action: action});
  }
}
