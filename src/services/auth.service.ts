import firebase from 'firebase';

export class AuthService {

  signUp(email: string, password: string): Promise<any> {
    console.log('signup service ', email, password);
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string): Promise<any> {
    console.log('signin service ', email, password);
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logOut() {
    console.log('logout service');
    firebase.auth().signOut();
  }

  getActiveUser() {
    // authenticated user data
    return firebase.auth().currentUser;
  }
}
