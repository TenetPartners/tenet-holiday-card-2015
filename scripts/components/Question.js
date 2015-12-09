/*
  <Question/>
  Displays question text along with options or responses
*/

import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import QuestionOption from './QuestionOption'

class Question extends React.Component {

  getOptionRank(rankedOptions, option) {
    return rankedOptions.findIndex(opt => opt.responseCount === (option.responseCount || 0));
  }

  renderResponseCount(totalQuestionResponseCount) {
    let questionAnswered = this.props.answers.hasOwnProperty(this.props.index);
    if (questionAnswered || this.props.surveyClosed) {
      return (
        <span className="totalResponses">
          <CSSTransitionGroup
              className="responseCount"
              component="span"
              transitionName="responseCount"
              transitionLeaveTimeout={250}
              transitionEnterTimeout={250}
            >
            <span key={totalQuestionResponseCount}>{totalQuestionResponseCount}</span>
          </CSSTransitionGroup>
          <span>responses</span>
        </span>
      )
    }
  }

  render() {
    let question = this.props.question;
    let totalQuestionResponseCount = question.options.map(opt => opt.responseCount || 0).reduce((prev, cur) => prev + cur);
    let rankedOptions = question.options.map(opt => { return { id: opt.id, responseCount: opt.responseCount || 0 }}).sort((a, b) => {
      return b.responseCount - a.responseCount;
    });

    return (
      <li className="question">
        <h2>{question.question}</h2>
        <ul className="options">
          {Object.keys(question.options).map((opt) =>
            <QuestionOption
              key={opt}
              questionId={this.props.index}
              selectOption={this.props.selectOption.bind(this)}
              option={this.props.question.options[opt]}
              totalQuestionResponseCount={totalQuestionResponseCount}
              answers={this.props.answers}
              surveyClosed={this.props.surveyClosed}
              rank={this.getOptionRank(rankedOptions, this.props.question.options[opt])} />
          )}
        </ul>
        {this.renderResponseCount(totalQuestionResponseCount)}
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
  answers: React.PropTypes.object.isRequired,
  surveyClosed: React.PropTypes.bool
}

Question.defaultProps = {
  surveyClosed: false
}

export default Question;
