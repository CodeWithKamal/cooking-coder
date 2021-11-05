import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCb3tSScmgryVnq382K-w7AbFM2K6riVAA",
    authDomain: "cooking-coder.firebaseapp.com",
    projectId: "cooking-coder",
    storageBucket: "cooking-coder.appspot.com",
    messagingSenderId: "880364496701",
    appId: "1:880364496701:web:1488f90d936dc1959c4754"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }