import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/database"
import "firebase/compat/storage"
import "firebase/compat/analytics"

let config = {
  apiKey: "AIzaSyCXbI7iK1dFX_GN9IcIQ5I4GeP2DoKW3SM",
  authDomain: "fin-fleet.firebaseapp.com",
  databaseURL: "https://fin-fleet-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fin-fleet",
  storageBucket: "fin-fleet.appspot.com",
  messagingSenderId: "938154909148",
  appId: "1:938154909148:web:442da702d3c08b95f64319",
  measurementId: "G-8DZH734J68"
}


firebase.initializeApp(config)
firebase.analytics();

export default firebase
