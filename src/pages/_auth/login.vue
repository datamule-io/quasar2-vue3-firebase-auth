<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<style>
button.firebaseui-idp-button.mdl-button.mdl-js-button.mdl-button--raised.firebaseui-idp-phone.firebaseui-id-idp-button {
  background: rgb(78, 194, 76)!important;
}
</style>
<script>
import { onMounted } from 'vue'
// import firebase from 'firebase';
import { getAuth,
  onAuthStateChanged,
  PhoneAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider,
  GoogleAuthProvider } from "firebase/auth";


import * as firebaseui from 'firebaseui'

export default {
  name: 'login',
  setup () {
    const auth = getAuth();
    onMounted (() => {
      var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          // {
          //   provider: PhoneAuthProvider.PROVIDER_ID,
          //   recaptchaParameters: {
          //     size: 'invisible',
          //     badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
          //   },
          //   defaultCountry: 'US'
          // },
          //TwitterAuthProvider.PROVIDER_ID, // Twitter does not support scopes.
          EmailAuthProvider.PROVIDER_ID, // Other providers don't need to be given as object.
          GoogleAuthProvider.PROVIDER_ID
        ],
        'credentialHelper': firebaseui.auth.CredentialHelper.NONE // todo: change to allow one-tap login
      };
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(auth);
      }
      ui.start('#firebaseui-auth-container', uiConfig);
      onAuthStateChanged(auth, function(user) {
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
    });
  }
}
</script>
