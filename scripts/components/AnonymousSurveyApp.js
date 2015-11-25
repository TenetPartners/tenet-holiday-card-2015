/*
  <AnonymousSurveyApp/>
*/

import React from 'react'
import Intro from './Intro'

class AnonymousSurveyApp extends React.Component {

  constructor() {
    super();
    this.state = {
      surveyClosed: false
    }
  }

  getClassName() {
    var className = "survey";
    if (this.state.surveyClosed)
      className += " closed";
    return className;
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <Intro surveyClosed={this.state.surveyClosed} text="Please answer the questions below and check back later for the full results." surveyClosedText="Thank you for taking our holiday survey. Here's how everyone responded."/>
      </div>
    )
  }
}

export default AnonymousSurveyApp;
