/*
  <QuestionOption/>
  Displays question option and stores the answer if clicked
*/

import React from 'react'

class QuestionOption extends React.Component {

  renderChart(option) {
    var percentSelected = ((option.responseCount || 0) / this.props.totalQuestionResponseCount * 100).toFixed(0);
    var selectedAnswer = this.props.answers[this.props.questionId] === option.id;
    return (
      <li className="option result">
        <span className="percentSelected">{percentSelected}%</span>
        <div className="bar" style={{backgroundSize: percentSelected + '% 100%'}}>{option.title}
          {selectedAnswer ? <span className="selectedAnswer" title="You selected this option"></span> : null}
        </div>
      </li>
    )
  }

  render() {
    var option = this.props.option;

    if (this.props.answers && this.props.answers.hasOwnProperty(this.props.questionId)) {
      return this.renderChart(option);
    }
    return (
      <li className="option" onClick={this.props.selectOption.bind(null, this.props.questionId, option.id)}>
        <span>{option.title}</span>
      </li>
    )
  }
}

QuestionOption.propTypes = {
  option: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    responseCount: React.PropTypes.number,
    imageUrl: React.PropTypes.string
  }).isRequired,
  selectOption: React.PropTypes.func.isRequired,
  questionId: React.PropTypes.string.isRequired,
  totalQuestionResponseCount: React.PropTypes.number.isRequired,
  answers: React.PropTypes.object.isRequired
}

export default QuestionOption;
