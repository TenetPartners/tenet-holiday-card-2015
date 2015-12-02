/*
  <Question/>
  Displays question text along with options or responses
*/

import React from 'react'
import QuestionOption from './QuestionOption'

class Question extends React.Component {

  renderQuestionOption(index) {
    let totalQuestionResponseCount = this.props.question.options.map(opt => opt.responseCount || 0).reduce((prev, cur) => prev + cur);
    return (
      <QuestionOption
        key={index}
        questionId={this.props.index}
        selectOption={this.props.selectOption.bind(this)}
        option={this.props.question.options[index]}
        totalQuestionResponseCount={totalQuestionResponseCount}
        answers={this.props.answers} />
    )

    // var option = this.props.question.options[index];
    // return (
    //   <li className="option" onClick={this.props.selectOption.bind(null, this.props.index, option.id)}>
    //     <span>{option.title}</span>
    //   </li>
    // )
  }

  render() {
    var question = this.props.question;

    return (
      <li className="question">
        <h2>{question.question}</h2>
        <ul className="options">
          {Object.keys(question.options).map(this.renderQuestionOption.bind(this))}
        </ul>
      </li>
    )
  }
}

Question.propTypes = {
  question: React.PropTypes.shape({
    question: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    imageUrl: React.PropTypes.string
  }).isRequired,
  index: React.PropTypes.string.isRequired,
  selectOption: React.PropTypes.func.isRequired,
  answers: React.PropTypes.object.isRequired
}

export default Question;
