/*
  <AnonymousSurveyApp/>
*/

import React from 'react'
import update from 'react-addons-update'
import Intro from './Intro'
import Question from './Question'
import questions from '../questions'

class AnonymousSurveyApp extends React.Component {

  constructor() {
    super();
    this.state = {
      surveyClosed: false,
      questions: questions.getSurveyQuestions(), // TODO: would prefer to simply use require('../questions') but don't know how to mock that in tests
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

  // componentDidMount() {
    // this.setState({
    //   questions: require('../questions')
    // });
  // }

  getClassName() {
    var className = "survey";
    if (this.state.surveyClosed)
      className += " closed";
    return className;
  }

  selectOption(question, option) {
    let optIndex = this.state.questions[question].options.findIndex((opt) => opt.id === option);

    this.setState({
      answers: update(this.state.answers, {[question]: {$set: option}}),
      questions: update(this.state.questions, {
        [question]: {
          options: {
            [optIndex]: {
              responseCount: { $apply: function(x) { return x + 1 || 1; } }
            }
          }
        }
      })
    })
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
