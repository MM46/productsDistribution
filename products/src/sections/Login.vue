<template>
  <mdb-container>
    <br><br>
    <div class="row justify-content-center">
      <mdb-col md="8">
        <div class="card">
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
              <form action="#" @submit.prevent="submit">
                <p class="h4 text-center mb-4">Inicio de Sesión</p>
                <div class="text-left" >
                  <mdb-input 
                    label="Your email" 
                    icon="envelope" 
                    type="email"
                    v-model="form.email"
                  />
                  <br>
                  <mdb-input 
                    icon="lock" 
                    label="Your password" 
                    type="password"
                    v-model="form.password"
                  />
                </div>
                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <mdb-btn type="submit">Accesar</mdb-btn>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </mdb-col>
    </div>
    <br><br>
  </mdb-container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
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
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({ name: "dashboard" })
          return data
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
