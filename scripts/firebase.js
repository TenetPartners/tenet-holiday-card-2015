import firebase from 'firebase'
import config from './config'

let fbApp = firebase.initializeApp(config);
module.exports = fbApp.database();