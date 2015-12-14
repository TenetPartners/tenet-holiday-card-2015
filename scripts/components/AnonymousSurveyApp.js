/*
  <AnonymousSurveyApp/>
*/

import React from 'react'
import update from 'react-addons-update'
import Rebase from 're-base'
import Question from './Question'
// import questions from '../questions'
import config from '../config'
import Firebase from 'firebase'
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

    this.base = Rebase.createClass(config.firebaseUrl);
    this.fbRef = new Firebase(config.firebaseUrl);
  }

  componentWillMount() {
    var token = localStorage.getItem('token');
    if (token) {
      this.fbRef.authWithCustomToken(token, this.authHandler.bind(this));
    }
    else {
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

  authHandler(err, authData) {
    if (err) {
      // console.err(err);
      return;
    }

    // console.log("Authenticated successfully with payload:", authData);
    // save the login token in the browser
    localStorage.setItem('token', authData.token);
  }

  loginAnonymously() {
    this.fbRef.authAnonymously(this.authHandler.bind(this));
  }

  bindWithFirebase() {
    this.rebaseRef = this.base.bindToState('questions', {
      context: this,
      state: 'questions'
    });
  }

  loadManifest() {
    let app = this;
    request.get('/rev-manifest.json').end(function(err, result) {
      if (result && result.statusCode === 200) {
        app.setState({
          manifest: JSON.parse(result.text)
        });
        // console.log(result.text);
      }
      // console.log(result);
    });
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

  preloadQuestionHoverImages(hoverImages) {
    for (var i = 0; i < hoverImages.length; i++) {
      let img = document.createElement('img');
      img.src = hoverImages[i];
    }
  }

  render() {
    let introH1 = this.state.surveyClosed ? "Thank you for taking our holiday survey. Here's how everyone responded." : "Will brand innovation impact your 2015 holiday season or will you be sticking with tradition?";
    let introH2 = this.state.surveyClosed ? "" : "Please answer the questions below and check back later for the full results.";

    let hoverImages = Object.keys(this.state.questions).map(questionId => this.state.questions[questionId].image.hoverUrl);
    this.preloadQuestionHoverImages(hoverImages);

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
          <h2>And most importantly, how will <span className="redText">you</span> help brighten<br/> the holidays for those less fortunate?</h2>
          <p>This season, Tenet Partners is making a donation<br/> to No Child Hungry on behalf of our clients and partners.</p>
        </div>
        <div className="bestMessage">
          <p>We hope you have a joyous season with family and friends.<br/> All the best from Tenet Partners. </p>
        </div>
      </div>
    )
  }
}

export default AnonymousSurveyApp;
