import apiKeys from '../apiKeys';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: apiKeys.firebase.apiKey,
    authDomain: apiKeys.firebase.authDomain,
    databaseURL: apiKeys.firebase.databaseURL,
    projectId: apiKeys.firebase.projectId,
    storageBucket: apiKeys.firebase.storageBucket,
    messagingSenderId: apiKeys.firebase.messagingSenderId

};
const fire = firebase.initializeApp(firebaseConfig);

fire.firestore().settings({timestampsInSnapshots: true});

export default fire;