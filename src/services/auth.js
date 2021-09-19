import { getAuth, onAuthStateChanged } from 'firebase/auth'

/**
 * Returns a promise that resolves with an ID token, if available, that can be verified on a server.
 * @return {!Promise<?string>} The promise that resolves with an ID token if
 *     available. Otherwise, the promise resolves with null.
 */
export const getIdToken = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged( auth, (user) => {
      unsubscribe() // unsubscribe the observer that we've just created
      if (user) {
          user.getIdToken().then((idToken) => {
          resolve(idToken)
        }, () => {
          resolve(null)
        })
      } else {
        resolve(null)
      }
    })
  }).catch((error) => {
    console.log(error)
  })
}
