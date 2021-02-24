import firebase from "./../firebaseConfig"
const db = firebase.firestore()
const fb = firebase.storage()

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
            const data = doc.data()
            data.individualPrice = data.individualPrice.toFixed(2)
            data.boxPrice = data.boxPrice.toFixed(2)
            products.push(data)
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
            id: section.data().sectionId,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      })
      return sections
}
function getAllProducts(){
  const products = []
  db.collection("products")
    .get()
    .then((result) => {
        result.forEach(product => {
          products.push({uid: product.id, products: product.data()})
        });
    })
    .catch((error) => {
      console.log(error);
    });
    return products
}

function updateProduct(succeedTitle, succeedText, errorTitle, errorText, swal, data){
  swal({
    title: '¿Estás seguro?',
    text: "Se modificará la información de este producto.",
    icon: 'warning',
    confirmButtonText: 'Guardar Cambios',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
        return db.collection("products").doc(data.doc).update({
          name: data.name,
          boxPrice: data.boxPrice,
          img: data.img,
          individualPrice: data.individualPrice,
          piecesPerBox: data.piecesPerBox,
          section: data.section,
          stockPieces: data.stockPieces,
          weight: data.weight,
          productId: data.productId,
        })
        .then(function() {
            succesfullyAlert(swal, succeedTitle, succeedText)
        })
        .catch(function(error) {
          errorAlert(swal, errorTitle, errorText)
          console.log(error)
        });
    }
  })
}

function getImages(){
  const images = []
  db.collection("carrousel")
    .get()
    .then((result) => {
      result.docs.forEach(img => {
        images.push({id: img.id, img: img.data().img})
      });
    })
    .catch((error) => {
      console.log(error);
    });
    return images
}

function openNewTab(link){
    window.open(link);
}

function deleteFromDatabase(collection, doc, succeedTitle, succeedText, errorTitle, errorText, swal){
  db.collection(collection).doc(doc).delete().then(function() {
    succesfullyAlert(swal, succeedTitle, succeedText)
  }).catch(function(error) {
    console.log(error)
    errorAlert(swal, errorTitle, errorText)
  });
}
function succesfullyAlert(swal, title, text) {
  swal({
    position: 'center',
    icon: 'success',
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 3000
  })
}
function errorAlert(swal, title, text) {
  swal({
    position: 'center',
    icon: 'warning',
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 3000
  })
}

function areYouSureAlert(swal, text, collection, id, succeedTitle, succeedText, errorTitle, errorText){
  swal({
    title: '¿Estás seguro?',
    text: text,
    icon: 'warning',
    confirmButtonText: 'Eliminar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
        deleteFromDatabase(collection, id, succeedTitle, succeedText, errorTitle, errorText, swal)
    }
  })
}

export default {
  db, 
  fb, 
  createImg, 
  getProductsPerSection, 
  getSections, 
  getSectionId, 
  updateProductId, 
  updateSectionId, 
  openNewTab,
  deleteFromDatabase,
  getAllProducts,
  succesfullyAlert,
  errorAlert,
  areYouSureAlert,
  getImages,
  updateProduct,

}