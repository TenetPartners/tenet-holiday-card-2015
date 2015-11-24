/*
  <AnonymousSurveyApp/>
*/

import React from 'react'

class AnonymousSurveyApp extends React.Component {

  constructor() {
    super();
    this.state = {
      surveyClosed: false
    }
  }

  render() {
    return (
      <div className="survey">
        <h2>Hello world</h2>
      </div>
    )
  }
}

export default AnonymousSurveyApp;
