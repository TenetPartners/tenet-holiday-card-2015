import React from 'react'
// import expect, { createSpy, spyOn, isSpy } from 'expect'
import expect from 'expect'
// import {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import {createRenderer} from 'react-addons-test-utils'
// import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import QuestionOption from '../QuestionOption'
import questions from '../../questions'

describe('QuestionOption', () => {

  function loadQuestionOption(questionId, optIndex, optionResponseCount, answers, totalQuestionResponseCount) {
    let question = questions.getSurveyQuestions()[questionId];
    let option = question.options[optIndex];
    option.responseCount = optionResponseCount;
    let renderer = createRenderer();
    renderer.render(<QuestionOption option={option} selectOption={() => {}} questionId={questionId} answers={answers} totalQuestionResponseCount={totalQuestionResponseCount} />);
    return renderer.getRenderOutput();
  }

  describe('state', () => {

    it('should show chart if survey is closed');

    it('should show chart if question has been answered', function() {
      let result = loadQuestionOption('q1', 1, 8, {q1: 'opt1'}, 12);
      let expectedResult = (
        <li className="option result">
          <span className="percentSelected">67%</span>
          <div className="bar" style={{backgroundSize: '67% 100%'}}>opt2</div>
        </li>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('should show 100% if question has been answered and only one total response', function() {
      let result = loadQuestionOption('q1', 1, 1, {q1: 'opt1'}, 1);
      let expectedResult = (
        <li className="option result">
          <span className="percentSelected">100%</span>
          <div className="bar" style={{backgroundSize: '100% 100%'}}>opt2</div>
        </li>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('should show 0% if question has been answered and only one total response', function() {
      let result = loadQuestionOption('q1', 1, 0, {q1: 'opt1'}, 1);
      let expectedResult = (
        <li className="option result">
          <span className="percentSelected">0%</span>
          <div className="bar" style={{backgroundSize: '0% 100%'}}>opt2</div>
        </li>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('should denote that the option has been selected', function() {
      let result = loadQuestionOption('q1', 0, 1, {q1: 'opt1'}, 1);
      let expectedResult = (
        <li className="option result">
          <span className="percentSelected">100%</span>
          <div className="bar" style={{backgroundSize: '100% 100%'}}>opt1<span className="selectedAnswer" title="You selected this option"></span></div>
        </li>
      );
      expect(result).toEqualJSX(expectedResult);
    });
  });

  describe('structure and props', () => {
    it('should allow the option to be selected if the question has not been answered', function() {
      let result = loadQuestionOption('q1', 0, 0, {q2: 'opt1'}, 0);
      let expectedResult = (
        <li className="option" onClick={() => {}}>
          <span>opt1</span>
        </li>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('has option propType that is a required object', function() {
      expect(QuestionOption.propTypes.option).toExist();
      // TODO: fix test for option proptype
      // expect(QuestionOption.propTypes.option).toBe(React.PropTypes.shape({
      //   id: React.PropTypes.number.isRequired,
      //   title: React.PropTypes.string.isRequired,
      //   imageUrl: React.PropTypes.string
      // }).isRequired);
    });

    it('has selectOption propType that is a required function', function() {
      expect(QuestionOption.propTypes.selectOption).toExist();
      expect(QuestionOption.propTypes.selectOption).toBe(React.PropTypes.func.isRequired);
    });

    it('has questionId propType that is a required string', function() {
      expect(QuestionOption.propTypes.questionId).toExist();
      expect(QuestionOption.propTypes.questionId).toBe(React.PropTypes.string.isRequired);
    });

    it('has totalQuestionResponseCount propType that is a required number', function() {
      expect(QuestionOption.propTypes.totalQuestionResponseCount).toExist();
      expect(QuestionOption.propTypes.totalQuestionResponseCount).toBe(React.PropTypes.number.isRequired);
    });

    it('has answers propType that is a required object', function() {
      expect(QuestionOption.propTypes.answers).toExist();
      expect(QuestionOption.propTypes.answers).toBe(React.PropTypes.object.isRequired);
    });
  });
});
