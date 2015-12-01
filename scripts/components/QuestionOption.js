/*
  <QuestionOption/>
  Displays question option and stores the answer if clicked
*/

import React from 'react'

class QuestionOption extends React.Component {

  render() {
    var option = this.props.option;
    // console.log(option);
    // return (
    //   <h2>option</h2>
    // )
    return (
      <li className="option" onClick={this.props.selectOption.bind(null, this.props.questionId, option.id)}>
        <span>{option.title}</span>
      </li>
    )
  }
}

QuestionOption.propTypes = {
  option: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    imageUrl: React.PropTypes.string
  }).isRequired,
  selectOption: React.PropTypes.func.isRequired,
  questionId: React.PropTypes.string.isRequired,
  answers: React.PropTypes.object.isRequired
}

export default QuestionOption;
