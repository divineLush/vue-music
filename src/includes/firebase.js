// import only what's needed with /app
import firebase from 'firebase/app';
// not assigning the module a name
// it's not necessary as firebase is smart enough to extend the core
// so it wont export another object
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCvdABlIh_X-B5xqfDNRiM-E-mzyT4sTt0',
  authDomain: 'vue-music-53198.firebaseapp.com',
  projectId: 'vue-music-53198',
  // bucket is a location where files are stored
  storageBucket: 'vue-music-53198.appspot.com',
  messagingSenderId: '794617682788',
  appId: '1:794617682788:web:be4807aba54482cddef871',
};

// intialize firebase
export default firebase.initializeApp(firebaseConfig);
