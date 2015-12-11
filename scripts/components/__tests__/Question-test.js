import React from 'react'
// import expect, { createSpy, spyOn, isSpy } from 'expect'
import expect from 'expect'
import {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
// import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Question from '../Question'
import QuestionOption from '../QuestionOption'
import QuestionImage from '../QuestionImage'
import questions from '../../questions'

describe('Question', () => {

  function loadQuestion(questionId, answers, surveyClosed = false) {
    let question = questions.getSurveyQuestions()[questionId];
    let renderer = createRenderer();
    renderer.render(<Question index={questionId} question={question} selectOption={() => {}} answers={answers} surveyClosed={surveyClosed} />);
    return renderer.getRenderOutput();
  }

  describe('structure', () => {
    it('works', function() {
      let result = loadQuestion('q1', {});
      let expectedResult = (
        <li className="question" ref="question" onMouseOver={() => {}} onMouseOut={() => {}}>
          <QuestionImage question={{image: {defaultUrl: '/assets/q1.svg', hoverUrl: '/assets/q1-hover.gif', title: 'this is alt text'}, options: [{id: 'opt1', image: {defaultUrl: '/assets/q1-opt1.svg', title: 'this is opt1 alt text'}, title: 'opt1'}, {id: 'opt2', image: {defaultUrl: '/assets/q1-opt2.svg', title: 'this is opt2 alt text'}, responseCount: 8, title: 'opt2'}, {id: 'opt3', image: {defaultUrl: '/assets/q1-opt3.svg', title: 'this is opt3 alt text'}, responseCount: 4, title: 'opt3'}], question: 'What day is it?'}} questionId="q1" answers={{}}/>
          <h2>What day is it?</h2>
          <ul className="options">
            <QuestionOption answers={{}} questionId="q1" selectOption={() => {}} option={{id: 'opt1', image: {
              defaultUrl: '/assets/q1-opt1.svg',
              title: 'this is opt1 alt text'
            }, title: 'opt1'}} totalQuestionResponseCount={12} surveyClosed={false} rank={2} />
            <QuestionOption answers={{}} questionId="q1" selectOption={() => {}} option={{id: 'opt2', image: {
              defaultUrl: '/assets/q1-opt2.svg',
              title: 'this is opt2 alt text'
            }, responseCount: 8, title: 'opt2'}} totalQuestionResponseCount={12} surveyClosed={false} rank={0} />
            <QuestionOption answers={{}} questionId="q1" selectOption={() => {}} option={{id: 'opt3', image: {
              defaultUrl: '/assets/q1-opt3.svg',
              title: 'this is opt3 alt text'
            }, responseCount: 4, title: 'opt3'}} totalQuestionResponseCount={12} surveyClosed={false} rank={1} />
          </ul>
        </li>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('should pass zero totalQuestionResponseCount if no responses', function() {
      let result = loadQuestion('q2', {});
      let expectedResult = (
        <li className="question" ref="question" onMouseOver={() => {}} onMouseOut={() => {}}>
          <QuestionImage question={{image: {defaultUrl: '/assets/q2.svg', hoverUrl: '/assets/q2-hover.gif', title: 'this is alt text 2'}, options: [{id: 'opt1', image: {defaultUrl: '/assets/q2-opt1.svg', title: 'this is q2 opt1 alt text'}, title: 'opt1'}, {id: 'opt2', image: {defaultUrl: '/assets/q2-opt2.svg', title: 'this is q2 opt2 alt text'}, title: 'opt2'}], question: 'What time is it?'}} questionId="q2" answers={{}}/>
          <h2>What time is it?</h2>
          <ul className="options">
            <QuestionOption answers={{}} questionId="q2" selectOption={() => {}} option={{id: 'opt1', image: {
              defaultUrl: '/assets/q2-opt1.svg',
              title: 'this is q2 opt1 alt text'
            }, title: 'opt1'}} totalQuestionResponseCount={0} surveyClosed={false} rank={0} />
            <QuestionOption answers={{}} questionId="q2" selectOption={() => {}} option={{id: 'opt2', image: {
              defaultUrl: '/assets/q2-opt2.svg',
              title: 'this is q2 opt2 alt text'
            }, title: 'opt2'}} totalQuestionResponseCount={0} surveyClosed={false} rank={0} />
          </ul>
        </li>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('should show total question responses if question has been answered', function() {
      let result = loadQuestion('q1', { q1: 'opt1' });
      let expectedResult = (
        <li className="question" ref="question" onMouseOver={() => {}} onMouseOut={() => {}}>
          <QuestionImage question={{image: {defaultUrl: '/assets/q1.svg', hoverUrl: '/assets/q1-hover.gif', title: 'this is alt text'}, options: [{id: 'opt1', image: {defaultUrl: '/assets/q1-opt1.svg', title: 'this is opt1 alt text'}, title: 'opt1'}, {id: 'opt2', image: {defaultUrl: '/assets/q1-opt2.svg', title: 'this is opt2 alt text'}, responseCount: 8, title: 'opt2'}, {id: 'opt3', image: {defaultUrl: '/assets/q1-opt3.svg', title: 'this is opt3 alt text'}, responseCount: 4, title: 'opt3'}], question: 'What day is it?'}} questionId="q1" answers={{ q1: 'opt1' }}/>
          <h2>What day is it?</h2>
          <ul className="options">
            <QuestionOption answers={{ q1: 'opt1' }} questionId="q1" selectOption={() => {}} option={{id: 'opt1', image: {
              defaultUrl: '/assets/q1-opt1.svg',
              title: 'this is opt1 alt text'
            }, title: 'opt1'}} totalQuestionResponseCount={12} surveyClosed={false} rank={2} />
            <QuestionOption answers={{ q1: 'opt1' }} questionId="q1" selectOption={() => {}} option={{id: 'opt2', image: {
              defaultUrl: '/assets/q1-opt2.svg',
              title: 'this is opt2 alt text'
            }, responseCount: 8, title: 'opt2'}} totalQuestionResponseCount={12} surveyClosed={false} rank={0} />
            <QuestionOption answers={{ q1: 'opt1' }} questionId="q1" selectOption={() => {}} option={{id: 'opt3', image: {
              defaultUrl: '/assets/q1-opt3.svg',
              title: 'this is opt3 alt text'
            }, responseCount: 4, title: 'opt3'}} totalQuestionResponseCount={12} surveyClosed={false} rank={1} />
          </ul>
          <span className="totalResponses">
            <ReactCSSTransitionGroup
              className="responseCount"
              component="span"
              transitionAppear={false}
              transitionEnter={true}
              transitionEnterTimeout={250}
              transitionLeave={true}
              transitionLeaveTimeout={250}
              transitionName="responseCount"
            >
              <span>
                12
              </span>
            </ReactCSSTransitionGroup>
            <span>
              responses
            </span>
          </span>
        </li>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('should show total question responses if survey is closed', function() {
      let result = loadQuestion('q1', {}, true);
      let expectedResult = (
        <li className="question" ref="question" onMouseOver={() => {}} onMouseOut={() => {}}>
          <QuestionImage question={{image: {defaultUrl: '/assets/q1.svg', hoverUrl: '/assets/q1-hover.gif', title: 'this is alt text'}, options: [{id: 'opt1', image: {defaultUrl: '/assets/q1-opt1.svg', title: 'this is opt1 alt text'}, title: 'opt1'}, {id: 'opt2', image: {defaultUrl: '/assets/q1-opt2.svg', title: 'this is opt2 alt text'}, responseCount: 8, title: 'opt2'}, {id: 'opt3', image: {defaultUrl: '/assets/q1-opt3.svg', title: 'this is opt3 alt text'}, responseCount: 4, title: 'opt3'}], question: 'What day is it?'}} questionId="q1" answers={{}}/>
          <h2>What day is it?</h2>
          <ul className="options">
            <QuestionOption answers={{}} questionId="q1" selectOption={() => {}} option={{id: 'opt1', image: {
              defaultUrl: '/assets/q1-opt1.svg',
              title: 'this is opt1 alt text'
            }, title: 'opt1'}} totalQuestionResponseCount={12} surveyClosed={true} rank={2} />
            <QuestionOption answers={{}} questionId="q1" selectOption={() => {}} option={{id: 'opt2', image: {
              defaultUrl: '/assets/q1-opt2.svg',
              title: 'this is opt2 alt text'
            }, responseCount: 8, title: 'opt2'}} totalQuestionResponseCount={12} surveyClosed={true} rank={0} />
            <QuestionOption answers={{}} questionId="q1" selectOption={() => {}} option={{id: 'opt3', image: {
              defaultUrl: '/assets/q1-opt3.svg',
              title: 'this is opt3 alt text'
            }, responseCount: 4, title: 'opt3'}} totalQuestionResponseCount={12} surveyClosed={true} rank={1} />
          </ul>
          <span className="totalResponses">
            <ReactCSSTransitionGroup
              className="responseCount"
              component="span"
              transitionAppear={false}
              transitionEnter={true}
              transitionEnterTimeout={250}
              transitionLeave={true}
              transitionLeaveTimeout={250}
              transitionName="responseCount"
            >
              <span>
                12
              </span>
            </ReactCSSTransitionGroup>
            <span>
              responses
            </span>
          </span>
        </li>
      );
      expect(result).toEqualJSX(expectedResult);
    });
  });

  describe('state', () => {
    beforeEach(function() {
      this.result = renderIntoDocument(<Question index={"q1"} question={{image: {defaultUrl: '/assets/q1.svg', hoverUrl: '/assets/q1-hover.gif', title: 'this is alt text'}, options: [{id: 'opt1', imageUrl: '', title: 'opt1'}, {id: 'opt2', imageUrl: '', title: 'opt2'}, {id: 'opt3', imageUrl: '', title: 'opt3'}], question: 'What day is it?'}} selectOption={() => {}} answers={{}} />);
    });

    it('surveyClosed prop should be false by default', function() {
      expect(this.result.props.surveyClosed).toEqual(false);
    });

    it('stores the state of the question', function() {
      expect(this.result.state).toExist();
    });

    it('stores the state of hover', function() {
      expect(this.result.state.hover).toBeA('boolean');
    });

    it('hover should be false by default', function() {
      expect(this.result.state.hover).toEqual(false);
    });

    it('should change hover state when hovering', function() {
      Simulate.mouseOver(this.result.refs.question);
      expect(this.result.state.hover).toEqual(true);

      Simulate.mouseOut(this.result.refs.question);
      expect(this.result.state.hover).toEqual(false);
    });
  });

  describe('props', () => {
    it('has question propType that is a required object', function() {
      expect(Question.propTypes.question).toExist();
      // TODO: fix test for question proptype
      // expect(Question.propTypes.question).toBeA(React.PropTypes.shape);
      // expect(Question.propTypes.question).toEqual(React.PropTypes.shape({
      //   id: React.PropTypes.number.isRequired,
      //   title: React.PropTypes.string.isRequired,
      //   options: React.PropTypes.object.isRequired,
      //   imageUrl: React.PropTypes.string
      // }).isRequired);
    });

    it('has index propType that is a required object', function() {
      expect(Question.propTypes.index).toExist();
      expect(Question.propTypes.index).toBe(React.PropTypes.string.isRequired);
    });

    it('has selectOption propType that is a required function', function() {
      expect(Question.propTypes.selectOption).toExist();
      expect(Question.propTypes.selectOption).toBe(React.PropTypes.func.isRequired);
    });

    it('has answers propType that is a required object', function() {
      expect(Question.propTypes.answers).toExist();
      expect(Question.propTypes.answers).toBe(React.PropTypes.object.isRequired);
    });

    it('has surveyClosed propType that is an optional bool', function() {
      expect(Question.propTypes.surveyClosed).toExist();
      expect(Question.propTypes.surveyClosed).toBe(React.PropTypes.bool);
    });
  });
});
