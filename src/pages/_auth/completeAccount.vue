<template>
  <div id="finishVerification">
    <h3>¡Felicitaciones!.{{name}} </h3>
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
    const auth = getAuth();
    const photo = ref('');
    const userId = ref('');
    const name = ref('');
    const email = ref('');
    const logOut = () => {
      auth.signOut();
      this.$router.push('/login');
    }
    // created:
    var actionCode = this.$route.query.oobCode.toString();
    console.log(actionCode);
    auth.applyActionCode(actionCode).then(function(resp) {
      alert("reload");
      auth.currentUser.reload();
      console.log(auth.currentUser.emailVerified);
    }).catch(function(error) {
      alert("error");
      console.log(error);
    });
    auth.onAuthStateChanged(user => {
      if(user) {
        this.name = user.displayName;
        this.email = user.email;
        this.photo = user.photoURL;
        this.userId = user.uid;
      }
    });
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
