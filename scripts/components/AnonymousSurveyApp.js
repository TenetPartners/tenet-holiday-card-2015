/*
  <AnonymousSurveyApp/>
*/

import React from 'react'
import Intro from './Intro'
import Question from './Question'
import questions from '../questions'

class AnonymousSurveyApp extends React.Component {

  constructor() {
    super();
    this.state = {
      surveyClosed: false,
      questions: questions.getSurveyQuestions() // TODO: would prefer to simply use require('../questions') but don't know how to mock that in tests
    }
  }

  // componentDidMount() {
  //   this.setState({
  //     questions: require('../questions')
  //   });
  // }

  getClassName() {
    var className = "survey";
    if (this.state.surveyClosed)
      className += " closed";
    return className;
  }

  renderQuestion(key) {
    return <Question key={key} question={this.state.questions[key]} />
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
