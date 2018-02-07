import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController){

    }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  } */

  onSignIn(form: NgForm) {
    console.log('signin ', form.value);
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
      //duration: 3000
    });
    loader.present();
    this.authService.signIn(form.value.email, form.value.password)
      .then(data => {
        // console.log(data);
        // dismis loader
        loader.dismiss();
      })
      .catch(error => {
        // console.log(error);
        // dismis loader
        loader.dismiss();
        this.showAlert(error.message);
      });
  }

  private showAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'SignIn Fail!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
