/*
  <QuestionOption/>
  Displays question option and stores the answer if clicked
*/

import React from 'react'

class QuestionOption extends React.Component {

  renderChart(option) {
    var percentSelected = this.props.totalQuestionResponseCount > 0 ? ((option.responseCount || 0) / this.props.totalQuestionResponseCount * 100).toFixed(0) : 0;
    var selectedAnswer = this.props.answers[this.props.questionId] === option.id;
    return (
      <li className="option result" data-rank={this.props.rank}>
        {selectedAnswer ? <span className="selectedAnswer" title="You selected this option"></span> : null}
        <span>{option.title}</span>
        <span className="percentSelected">{percentSelected}%</span>
        <div className="meter"><span style={{width: percentSelected + '%'}}></span></div>
      </li>
    )
  }

  render() {
    var option = this.props.option;

    if (this.props.surveyClosed || (this.props.answers && this.props.answers.hasOwnProperty(this.props.questionId))) {
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
    image: React.PropTypes.shape({
      defaultUrl: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  selectOption: React.PropTypes.func.isRequired,
  questionId: React.PropTypes.string.isRequired,
  totalQuestionResponseCount: React.PropTypes.number.isRequired,
  rank: React.PropTypes.number.isRequired,
  answers: React.PropTypes.object.isRequired,
  surveyClosed: React.PropTypes.bool
}

QuestionOption.defaultProps = {
  surveyClosed: false
}

export default QuestionOption;
