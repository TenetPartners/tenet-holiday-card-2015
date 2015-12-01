/*
  <AnonymousSurveyApp/>
*/

import React from 'react'
import update from 'react-addons-update'
import Rebase from 're-base'
import Intro from './Intro'
import Question from './Question'
// import questions from '../questions'
import config from '../config'
import Firebase from 'firebase'

const base = Rebase.createClass(config.firebaseUrl);
const fbRef = new Firebase(config.firebaseUrl);

class AnonymousSurveyApp extends React.Component {

  constructor() {
    super();
    this.state = {
      surveyClosed: false,
      questions: {},
      // questions: questions.getSurveyQuestions(), // TODO: would prefer to simply use require('../questions') but don't know how to mock that in tests
      answers: {}
    }

    // TODO: figure out how to test localStorage with jsdom
    // var answers = localStorage.getItem('answers');
    // if (answers) {
    //   this.setState({
    //     answers: JSON.parse(answers)
    //   });
    // }
  }

  componentDidMount() {
    this.rebaseRef = base.bindToState('questions', {
      context: this,
      state: 'questions'
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
    fbRef.child(`questions/${question}/options/${optIndex}/responseCount`).transaction(function(cur_value) {
      return (cur_value || 0) + 1;
    });
  }

  selectOption(question, option) {
    let optIndex = this.state.questions[question].options.findIndex((opt) => opt.id === option);

    this.setState({
      answers: update(this.state.answers, {[question]: {$set: option}})
      // questions: update(this.state.questions, {
      //   [question]: {
      //     options: {
      //       [optIndex]: {
      //         responseCount: { $apply: function(x) { return x + 1 || 1; } }
      //       }
      //     }
      //   }
      // })
    });

    this.updateResponseCount(question, optIndex);

    // set localStorage of answers
  }

  renderQuestion(key) {
    return <Question key={key} index={key} question={this.state.questions[key]} selectOption={this.selectOption.bind(this)} />
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <Intro surveyClosed={this.state.surveyClosed} text="Please answer the questions below and check back later for the full results." surveyClosedText="Thank you for taking our holiday survey. Here's how everyone responded."/>
        <ul className="questions">
          {Object.keys(this.state.questions).map(this.renderQuestion.bind(this))}
        </ul>
      </div>
    )
  }
}

export default AnonymousSurveyApp;
