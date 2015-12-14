/*
 <QuestionImage/>
 An image that is associated with a question with an optional hover image. Image will change based on selected option.
*/

import React from 'react'

class QuestionImage extends React.Component {

  getImageUrlFromManifest(imageUrl) {
    let manifest = this.props.manifest;
    while (imageUrl.charAt(0) === '/') {
      imageUrl = imageUrl.substr(1);
    }
    let newUrl = (manifest && manifest[imageUrl]) ? manifest[imageUrl] : imageUrl;
    return '/' + newUrl;
  }

  renderImage() {
    let question = this.props.question;
    let selectedAnswer = this.props.answers[this.props.questionId];

    if (selectedAnswer) {
      let optIndex = question.options.findIndex((opt) => opt.id === selectedAnswer);
      if (optIndex > -1) {
        let optionImage = question.options[optIndex].image;
        if (optionImage) {
          return <img src={this.getImageUrlFromManifest(optionImage.defaultUrl)} alt={optionImage.title}/>
        }
      }
    }
    return <img src={this.props.showHover ? this.getImageUrlFromManifest(question.image.hoverUrl) : this.getImageUrlFromManifest(question.image.defaultUrl)} alt={question.image.title}/>
  }

  render() {
    return (
      <div className="questionImage">
        {this.renderImage()}
      </div>
    )
  }
}

QuestionImage.propTypes = {
  question: React.PropTypes.shape({
    options: React.PropTypes.array.isRequired,
    image: React.PropTypes.shape({
      defaultUrl: React.PropTypes.string.isRequired,
      hoverUrl: React.PropTypes.string,
      title: React.PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  questionId: React.PropTypes.string.isRequired,
  answers: React.PropTypes.object.isRequired,
  showHover: React.PropTypes.bool,
  manifest: React.PropTypes.object
}

QuestionImage.defaultProps = {
  showHover: false
}

export default QuestionImage;
