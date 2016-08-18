import firebase from 'firebase'
import config from './config'

let fbApp = firebase.initializeApp(config, 'ANONYMOUS_SURVEY');
export default fbApp;