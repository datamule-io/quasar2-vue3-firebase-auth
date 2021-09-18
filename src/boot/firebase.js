import { boot } from 'quasar/wrappers'
// import firebase from 'firebase'
import { initializeApp, getCurrentUser } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCs4mrNWBdZntj8N1UKPqI5hWcfjbQ5bAQ",
  authDomain: "datamule-io.firebaseapp.com",
  projectId: "datamule-io",
  storageBucket: "datamule-io.appspot.com",
  messagingSenderId: "518806260193",
  appId: "1:518806260193:web:ad8e32a1300705bac9eaa0",
  measurementId: "G-3EC2BNZL7E"
};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router, app }) => {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  router.beforeEach((to, from, next) => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(function (user) {
        unsubscribe();
        if (!user && to.path != "/auth/login") {
          next("/auth/login");
        } else if (user) {
          // if (!user.emailVerified && to.path != "/auth/verifyEmail" && to.path != "/auth/completeAccount") {
          //   next("/auth/verifyEmail");
          // } else
          if (to.path == '/auth/login' || to.path == "/auth/verifyEmail" || to.path == "/auth/completeAccount") {
            next("/");
          } else {
            next()
          }
        } else {
          next();
        }
        resolve(user);
      }, reject)
    });
  })
})

