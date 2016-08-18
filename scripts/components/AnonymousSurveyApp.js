/*
  <AnonymousSurveyApp/>
*/

import React from 'react'
import update from 'react-addons-update'
import Rebase from 're-base'
import Question from './Question'
// import questions from '../questions'
import config from '../config'
import firebase from 'firebase'
import firebaseApp from '../firebase'
import request from 'superagent'

// const base = Rebase.createClass(config.firebaseUrl);
// const fbRef = new Firebase(config.firebaseUrl);

class AnonymousSurveyApp extends React.Component {

  constructor() {
    super();
    this.state = {
      surveyClosed: false,
      questions: {},
      answers: {},
      manifest: {}
    };

    this.base = Rebase.createClass(config);
    this.fbRef = firebaseApp.database().ref();
  }

  componentWillMount() {
    var token = localStorage.getItem('token');
    if (!token) {
      this.loginAnonymously();
    }
  }

  componentDidMount() {
    this.loadManifest();
    this.bindWithFirebase();

    var answers = localStorage.getItem('answers');
    if (answers) {
      this.setState({
        answers: JSON.parse(answers)
      });
    }
  }

  loginAnonymously() {
    firebase.auth(firebaseApp).signInAnonymously().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    firebase.auth(firebaseApp).onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var uid = user.uid;
        localStorage.setItem('token', uid);
      }
    });
  }

  bindWithFirebase() {
    this.rebaseRef = this.base.bindToState('questions', {
      context: this,
      state: 'questions'
    });
  }

  loadManifest() {
    let app = this;
    request.get('/rev-manifest.json?t=' + new Date().getTime()).end(function(err, result) {
      if (result && result.statusCode === 200) {
        app.setState({
          manifest: JSON.parse(result.text)
        });
      }
    });

    // this.setState({manifest: {"assets/q1-hover.gif": "assets/q1-hover-791841.gif"}});
  }

  // componentWillUnmount () { // So that we don't get listeners keep adding, we will unmount them
  //   base.removeBinding(this.firebaseRef);
  // }

  getClassName() {
    var className = "survey";
    if (this.state.surveyClosed)
      className += " closed";
    return className;
  }

  updateResponseCount(question, optIndex) {
    // update firebase with new response
    // setState is not required because questions tree is bound to state in componentDidMount
    this.fbRef.child(`questions/${question}/options/${optIndex}/responseCount`).transaction(function(cur_value) {
      return (cur_value || 0) + 1;
    });
  }

  selectOption(question, option) {
    let optIndex = this.state.questions[question].options.findIndex((opt) => opt.id === option);

    this.setState({
      answers: update(this.state.answers, {[question]: {$set: option}})
      // this isn't needed because we are updating the responseCount in Firebase
      // questions: update(this.state.questions, {
      //   [question]: {
      //     options: {
      //       [optIndex]: {
      //         responseCount: { $apply: function(x) { return x + 1 || 1; } }
      //       }
      //     }
      //   }
      // })
    }, function() {
      // set localStorage of answers
      localStorage.setItem('answers', JSON.stringify(this.state.answers));
    });

    this.updateResponseCount(question, optIndex);
  }

  renderQuestion(key) {
    return <Question key={key} index={key} question={this.state.questions[key]} selectOption={this.selectOption.bind(this)} answers={this.state.answers} surveyClosed={this.state.surveyClosed} manifest={this.state.manifest} />
  }

  render() {
    let introH1 = this.state.surveyClosed ? "Thank you for taking our holiday survey. Here's how everyone responded." : "Will brand innovation be disrupting your 2015 holiday season or will you be sticking with tradition?";
    let introH2 = this.state.surveyClosed ? "" : "Let us know and see what others will be doing by answering the following five questions";

    return (
      <div className={this.getClassName()}>
        <header>
          <h1>{introH1}</h1>
          <h2>{introH2}</h2>
        </header>
        <ul className="questions">
          {Object.keys(this.state.questions).map(this.renderQuestion.bind(this))}
        </ul>
        <div className="conclusion">
          <p>However you choose to experience this holiday, we wish you a joyous season with family and friends.</p><p><a href="https://tenetpartners.com">tenetpartners.com</a></p>
        </div>
        <div className="bestMessage">
          <p>On behalf of our clients and friends, Tenet Partners is making a donation to <a href="https://www.nokidhungry.org">No Kid Hungry</a>.</p>
        </div>
      </div>
    )
  }
}

export default AnonymousSurveyApp;
