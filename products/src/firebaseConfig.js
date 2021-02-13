import { firebase } from '@firebase/app'
// import functions from 'firebase-functions'
// import admin from 'firebase-admin'

const configOptions = {
    apiKey: "AIzaSyBimWPAhwg2E9pTOLO-uT4n-I87ZrU1aTk",
    authDomain: "productsdistribution.firebaseapp.com",
    databaseURL: "productsdistribution-default-rtdb.firebaseio.com",
    projectId: "productsdistribution",
    storageBucket: "productsdistribution.appspot.com",
    messagingSenderId: "394733699795",
    appId: "1:394733699795:web:1aac188447ce1a90880a26",
    measurementId: "G-R9M7H1DC7V"
  };

  // admin.initializeApp()
  // const db = firebase.firestore()
  
  // exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
  
  //   if (authUser.email) {
  //     const customClaims = {
  //       admin: true,
  //     };
  //     try {
  //       await admin.auth().setCustomUserClaims(authUser.uid, customClaims)
  
  //       return db.collection("roles").doc(authUser.uid).set({
  //         email: authUser.email,
  //         role: customClaims
  //       })
  
  //     } catch (error) {
  //       console.log(error)
  //     }
  
  //   }
  
  // });  

export default firebase.initializeApp(configOptions);