import firebase from "./../firebaseConfig"
const db = firebase.firestore()
const fb = firebase.storage()
// const sectionId = getSectionId()
// const productId = 6

function createImg(img) {
    const post = { photo: img}
    firebase.database().ref().push(post)
    .then((response) => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })
}

function getSectionId(){
  db.collection("utils").doc("utils")
    .get()
    .then((result) => {
      result.data().sectionId
    })
    .catch((error) => {
      console.log(error);
    });
}
    
function updateProductId(){
  const docReference = db.collection("utils").doc("utils")

  return db.runTransaction(function(transaction) {
      return transaction.get(docReference).then(function(doc) {
          const newProductId = doc.data().productId + 1;
          transaction.update(docReference, { productId: newProductId });
      });
  })
}

function updateSectionId(){
  const docReference = db.collection("utils").doc("utils")

  return db.runTransaction(function(transaction) {
      return transaction.get(docReference).then(function(doc) {
          const newSectionId = doc.data().sectionId + 1;
          transaction.update(docReference, { sectionId: newSectionId });
      });
  })
}

function getProductsPerSection(selectedSection){
    const products = []
    db.collection("products")
      .get()
      .then((result) => {
        result.forEach(doc => {
          if(doc.data().section == selectedSection){
            products.push(doc.data())
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
      return products
  }

function getSections() {
    const sections = []
      db.collection("sections")
        .get()
        .then((result) => {
          result.forEach((section) => {
           sections.push({
              name: section.data().name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        })
        return sections
}

export default {db, fb, createImg, getProductsPerSection, getSections, getSectionId, updateProductId, updateSectionId}