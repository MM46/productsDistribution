import firebase from "./../firebaseConfig"

async function loggedIn(router) {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        firebase.auth().onAuthStateChanged(userAuth => {
          if(userAuth){
            firebase.firestore().collection("users").doc(userAuth.uid)
              .get()
              .then(
              doc => {
                  if (doc.exists && doc.data().role == "admin") {
                    next()
                  } else {
                    next({
                      path: '/',
                      query: { redirect: to.fullPath }
                    })
                  }
                })
          } else {
            next({
              path: '/',
              query: { redirect: to.fullPath }
            })
          }
        })
      } else {
        next()
      }
    })
}


export default {loggedIn}