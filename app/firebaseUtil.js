import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyAE8Tony828xzh02nH3dzkH3LDgvGEOTRg',
    authDomain: 'whenimeetu-backend.firebaseapp.com',
    databaseURL: 'https://whenimeetu-backend.firebaseio.com',
    projectId: 'whenimeetu-backend',
    storageBucket: 'whenimeetu-backend.appspot.com',
    messagingSenderId: '29972754626',
    appId: '1:29972754626:web:a489d0bd2a217d33d44b5b',
};

firebase.initializeApp(firebaseConfig);

export const guestRef = firebase.database().ref('guest');

export default firebase;
