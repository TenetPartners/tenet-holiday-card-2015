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

  describe('state', () => {
    beforeEach(function() {
      let question = questions.getSurveyQuestions().q1;
      let option = question.options[1];
      let answers = {
        q1: "opt1"
      };
      let renderer = createRenderer();
      renderer.render(<QuestionOption option={option} selectOption={() => {}} questionId="q1" answers={answers} totalQuestionResponseCount={12} />);
      this.result = renderer.getRenderOutput();
    });

    it('should show chart if survey is closed');

    it('should show chart if question has been answered', function() {
      let expectedResult = (
        <li className="option result">
          <span className="percentSelected">67%</span>
          <div className="bar" style={{backgroundSize: '67% 100%'}}>opt2</div>
        </li>
      );
      expect(this.result).toEqualJSX(expectedResult);
    });

    it('should show 100% if question has been answered and only one total response', function() {
      let question = questions.getSurveyQuestions().q1;
      let option = question.options[1];
      option.responseCount = 1;
      let answers = {
        q1: "opt1"
      };
      let renderer = createRenderer();
      renderer.render(<QuestionOption option={option} selectOption={() => {}} questionId="q1" answers={answers} totalQuestionResponseCount={1} />);
      this.result = renderer.getRenderOutput();

      let expectedResult = (
        <li className="option result">
          <span className="percentSelected">100%</span>
          <div className="bar" style={{backgroundSize: '100% 100%'}}>opt2</div>
        </li>
      );
      expect(this.result).toEqualJSX(expectedResult);
    });

    it('should show 0% if question has been answered and only one total response', function() {
      let question = questions.getSurveyQuestions().q1;
      let option = question.options[1];
      option.responseCount = 0;
      let answers = {
        q1: "opt1"
      };
      let renderer = createRenderer();
      renderer.render(<QuestionOption option={option} selectOption={() => {}} questionId="q1" answers={answers} totalQuestionResponseCount={1} />);
      this.result = renderer.getRenderOutput();

      let expectedResult = (
        <li className="option result">
          <span className="percentSelected">0%</span>
          <div className="bar" style={{backgroundSize: '0% 100%'}}>opt2</div>
        </li>
      );
      expect(this.result).toEqualJSX(expectedResult);
    });

    it('should denote that the option has been selected');
  });

  describe('structure and props', () => {
    beforeEach(function() {
      let question = questions.getSurveyQuestions().q1;
      let option = question.options[0];
      let answers = {
        q2: "opt1"
      };
      let renderer = createRenderer();
      renderer.render(<QuestionOption option={option} selectOption={() => {}} questionId="q1" answers={answers} totalQuestionResponseCount={0} />);
      this.result = renderer.getRenderOutput();
    });

    it('should allow the option to be selected if the question has not been answered', function() {
      let expectedResult = (
        <li className="option" onClick={() => {}}>
          <span>opt1</span>
        </li>
      );
      expect(this.result).toEqualJSX(expectedResult);
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
