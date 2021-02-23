<template>
  <container>
    <div class="row justify-content-center">
      <b-col md="8">
        <div class="card">
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
              <form action="#" @submit.prevent="submit">
                <p class="h4 text-center mb-4">Crear Usuario</p>
                <div class="grey-text text-left" >
                  <mdb-input 
                    label="Nombre" 
                    icon="user" 
                    type="name"
                    v-model="form.name"
                  />
                  <br>
                  <mdb-input 
                    label="Correo Electrónico" 
                    icon="envelope" 
                    type="email"
                    v-model="form.email"
                  />
                  <br>
                  <mdb-input 
                    icon="lock" 
                    label="Contraseña" 
                    type="password"
                    v-model="form.password"
                  />
                </div>
                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <mdb-btn type="submit">Registrate</mdb-btn>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </b-col>
    </div>
  </container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
    created() {
        firebase.auth().onAuthStateChanged(userAuth => {
            if (userAuth) {
              this.$router.replace({ name: "home" })
            }
        });
    },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          firebase.firestore().collection("users").doc(data.user.uid).set({
          name: this.form.name,
          email: this.form.email,
          role: "user"
          })
          data.user
            .updateProfile({
              displayName: this.form.name
            })
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
