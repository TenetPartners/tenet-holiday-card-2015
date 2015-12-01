/*
  <Intro/>
  Displays intro text and an alternate if the survey is closed
*/

import React from 'react'

class Intro extends React.Component {

  render() {
    return (
      <p className="intro">{this.props.surveyClosed && this.props.surveyClosedText ? this.props.surveyClosedText : this.props.text}</p>
    )
  }
}

Intro.propTypes = {
  text: React.PropTypes.string.isRequired,
  surveyClosed: React.PropTypes.bool,
  surveyClosedText: React.PropTypes.string
}

Intro.defaultProps = {
  surveyClosed: false
}

export default Intro;
