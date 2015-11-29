/*
  <Question/>
  Displays question text along with options or responses
*/

import React from 'react'

class Question extends React.Component {

  render() {
    var question = this.props.question;

    return (
      <li className="question">
        <h2>{question.question}</h2>
      </li>
    )
  }
}

Question.propTypes = {
  question: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired,
    imageUrl: React.PropTypes.string
  }).isRequired
  // question: React.PropTypes.object
}

export default Question;
