<template>
  <div>
    <h3>Alta de Usuario. ¡Bienvenido {{name}}!.</h3>
    <p><button @click='logOut'>Log out</button></p>
    <p>FOTO:<img :src='photo' style='height: 120px'> </p>
    <p>Nombre: {{name}}</p>
    <p>Email: {{email}}</p>
    <p>ID: {{userId}}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
// import firebase from 'firebase';
import { getAuth } from "firebase/auth";


export default {
  setup () {
    const photo = ref('');
    const userId = ref('');
    const name = ref('');
    const email = ref('');

    const auth = getAuth();
    auth.onAuthStateChanged(user => {
      if(user) {
        this.name = user.displayName;
        this.email = user.email;
        this.photo = user.photoURL;
        this.userId = user.uid;
      }
    });

    const logOut= () => {
      auth.signOut();
      this.$router.push('/login');
    }

    return {
      photo,
      userId,
      name,
      email,
      logOut
    }
  }
};
</script>
