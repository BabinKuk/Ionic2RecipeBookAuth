import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  } */

  onSignUp(form: NgForm) {
    console.log('signup ', form.value);
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
      //duration: 3000
    });
    loader.present();
    this.authService.signUp(form.value.email, form.value.password)
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
      title: 'SignUp Fail!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
