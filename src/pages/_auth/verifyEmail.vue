<template lang="html">
  <div id="verificationMail">
    <h3>Validacion de Cuenta</h3>
    <p>Hola <strong>{{name}}</strong>, necesitamos que valides tu cuenta</p>
    <p>Te hemos enviado un correo a la casilla <strong>{{email}}</strong> con el asunto <strong>{{subject}}</strong></p>
    <p>Este mail contiene el link que te permitirá acceder al sistema.</p>
    <p><button @click='resend'>Reenviar Mail</button></p>
  </div>
</template>

<script>
import { ref } from 'vue';
// import firebase from 'firebase'
import { getAuth } from "firebase/auth";

export default{
  name: 'verificationMail',
  setup () {
    const name = ref('');
    const email = ref('');
    const subject = ref('');

    const auth= getAuth();

    auth.onAuthStateChanged(user => {
      if(user) {
        this.name = user.displayName;
        this.email = user.email;
      }
    });

    const resend = () => {
      auth.onAuthStateChanged(function(user) {
        if ((user) && !user.emailVerified) {
          var actionCodeSettings = {
            url: 'http://..../',
            handleCodeInApp: true,
          };
          user.sendEmailVerification().then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });
        }
      });
    }

    return {
      name,
      email,
      subject,
      resend
    };
  }
};
</script>
