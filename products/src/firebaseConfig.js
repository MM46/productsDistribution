import { firebase } from '@firebase/app'
// import store from "./store";

const configOptions = {
    apiKey: "AIzaSyBimWPAhwg2E9pTOLO-uT4n-I87ZrU1aTk",
    authDomain: "productsdistribution.firebaseapp.com",
    projectId: "productsdistribution",
    storageBucket: "productsdistribution.appspot.com",
    messagingSenderId: "394733699795",
    appId: "1:394733699795:web:1aac188447ce1a90880a26",
    measurementId: "G-R9M7H1DC7V"
  };

//   firebase.auth().onAuthStateChanged(user => {
//     store.dispatch("fetchUser", user);
//   });

export default firebase.initializeApp(configOptions);