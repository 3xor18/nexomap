import firebase from 'firebase/app'


const firebaseConfig = {
    apiKey: "AIzaSyDBNgqQGkv1LckuFxab0G5BmDIj13O8few",
    authDomain: "nexo-cc600.firebaseapp.com",
    databaseURL: "https://nexo-cc600.firebaseio.com",
    projectId: "nexo-cc600",
    storageBucket: "nexo-cc600.appspot.com",
    messagingSenderId: "339605314164",
    appId: "1:339605314164:web:30a23fe3368f19e74b0f21",
    measurementId: "G-XCL2VWGQS6"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);