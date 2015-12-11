import React from 'react'
// import expect, { createSpy, spyOn, isSpy } from 'expect'
import expect from 'expect'
// import {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import {createRenderer, renderIntoDocument} from 'react-addons-test-utils'
// import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import QuestionImage from '../QuestionImage'
import questions from '../../questions'

describe('QuestionImage', () => {

  function loadQuestionImage(questionId, answers, showHover = false) {
    let question = questions.getSurveyQuestions()[questionId];
    let renderer = createRenderer();
    renderer.render(<QuestionImage question={question} questionId={questionId} answers={answers} showHover={showHover} />);
    return renderer.getRenderOutput();
  }

  describe('structure', () => {
    it('works', function() {
      let result = loadQuestionImage('q1', {});
      let expectedResult = (
        <div className="questionImage">
          <img src="/assets/q1.svg" alt="this is alt text"/>
        </div>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('should show hover image if showHover enabled', function() {
      let result = loadQuestionImage('q1', {}, true);
      let expectedResult = (
        <div className="questionImage">
          <img src="/assets/q1-hover.gif" alt="this is alt text"/>
        </div>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('should show selected option image upon answer', function() {
      let result = loadQuestionImage('q1', {q1: 'opt2'});
      let expectedResult = (
        <div className="questionImage">
          <img src="/assets/q1-opt2.svg" alt="this is opt2 alt text"/>
        </div>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('should show selected option image upon answer even on hover', function() {
      let result = loadQuestionImage('q1', {q1: 'opt2'}, true);
      let expectedResult = (
        <div className="questionImage">
          <img src="/assets/q1-opt2.svg" alt="this is opt2 alt text"/>
        </div>
      );
      expect(result).toEqualJSX(expectedResult);
    });
  });

  describe('props', () => {
    it('has question propType that is a required object', function() {
      expect(QuestionImage.propTypes.question).toExist();
      // TODO: fix test for question proptype
      // expect(Question.propTypes.question).toBeA(React.PropTypes.shape);
      // expect(Question.propTypes.question).toEqual(React.PropTypes.shape({
      //   id: React.PropTypes.number.isRequired,
      //   title: React.PropTypes.string.isRequired,
      //   options: React.PropTypes.object.isRequired,
      //   imageUrl: React.PropTypes.string
      // }).isRequired);
    });

    it('has questionId propType that is a required string', function() {
      expect(QuestionImage.propTypes.questionId).toExist();
      expect(QuestionImage.propTypes.questionId).toBe(React.PropTypes.string.isRequired);
    });

    it('has answers propType that is a required object', function() {
      expect(QuestionImage.propTypes.answers).toExist();
      expect(QuestionImage.propTypes.answers).toBe(React.PropTypes.object.isRequired);
    });

    it('has showHover propType that is an optional bool', function() {
      expect(QuestionImage.propTypes.showHover).toExist();
      expect(QuestionImage.propTypes.showHover).toBe(React.PropTypes.bool);
    });

    it('showHover prop should be false by default', function() {
      var res = renderIntoDocument(<QuestionImage questionId="q1" question={{id: 'opt2', options: [], image: {
        defaultUrl: '/assets/q1-opt2.svg',
        title: 'this is opt2 alt text'
      }}} answers={{}} />);
      expect(res.props.showHover).toEqual(false);
    });
  });
});
