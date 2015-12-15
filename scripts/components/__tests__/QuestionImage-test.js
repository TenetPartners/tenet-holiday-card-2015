import React from 'react'
// import expect, { createSpy, spyOn, isSpy } from 'expect'
import expect from 'expect'
// import {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import {createRenderer, renderIntoDocument} from 'react-addons-test-utils'
import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import QuestionImage from '../QuestionImage'
import questions from '../../questions'

describe('QuestionImage', () => {

  describe('structure', () => {
    function loadQuestionImage(questionId, answers, manifest, showHover = false) {
      let question = questions.getSurveyQuestions()[questionId];
      let renderer = createRenderer();
      renderer.render(<QuestionImage question={question} questionId={questionId} answers={answers} showHover={showHover} manifest={manifest} />);
      return renderer.getRenderOutput();
    }

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
      let result = loadQuestionImage('q1', {}, {}, true);
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
      let result = loadQuestionImage('q1', {q1: 'opt2'}, {}, true);
      let expectedResult = (
        <div className="questionImage">
          <img src="/assets/q1-opt2.svg" alt="this is opt2 alt text"/>
        </div>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('should display image in manifest if it exists', function() {
      let result = loadQuestionImage('q1', {}, {"assets/q1.svg": "assets/q1-d4a8066b91.svg", "assets/q2.svg": "assets/q2-1510aa15dc.svg"});
      let expectedResult = (
        <div className="questionImage">
          <img src="/assets/q1-d4a8066b91.svg" alt="this is alt text"/>
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
        defaultUrl: '/assets/q1.svg',
        title: 'this is alt text'
      }}} answers={{}} />);
      expect(res.props.showHover).toEqual(false);
    });

    it('has manifest propType that is an optional object', function() {
      expect(QuestionImage.propTypes.manifest).toExist();
      expect(QuestionImage.propTypes.manifest).toBe(React.PropTypes.object);
    });
  });

  describe('state', () => {
    var preloadSpy = null;

    function loadQuestionImageState(questionId, answers, manifest, showHover = false) {
      let question = questions.getSurveyQuestions()[questionId];
      preloadSpy = sinon.spy(QuestionImage.prototype, 'preloadImage');
      return renderIntoDocument(<QuestionImage question={question} questionId={questionId} answers={answers} showHover={showHover} manifest={manifest} />);
    }

    afterEach(function() {
      QuestionImage.prototype.preloadImage.restore();
    });

    it('stores the state of a preloaded image', function() {
      let result = loadQuestionImageState('q1', {});
      expect(result.preloaded).toBeA('array');
    });

    it('should preload the hover image', function() {
      let result = loadQuestionImageState('q1', {});
      expect(preloadSpy.getCall(0).args[0]).toEqual('/assets/q1-hover.gif');
      expect(result.preloaded).toEqual(['/assets/q1-hover.gif']);
    });

    it('should not preload the hover image again', function() {
      let result = loadQuestionImageState('q1', {});
      result.setState({test: 'test'});
      expect(preloadSpy.calledOnce).toEqual(true);
      expect(result.preloaded).toEqual(['/assets/q1-hover.gif']);
    });

    it('should not preload the hover image if we are showing the hover image', function() {
      let result = loadQuestionImageState('q1', {}, {}, true);
      expect(preloadSpy.called).toEqual(false);
      expect(result.preloaded).toEqual([]);
    });

    it('should not preload the hover image if the question has been answered', function() {
      let result = loadQuestionImageState('q1', {'q1': 'opt1'}, {});
      expect(preloadSpy.called).toEqual(false);
      expect(result.preloaded).toEqual([]);
    });

    it('should preload images from manifest if provided', function() {
      let result = loadQuestionImageState('q1', {}, {"assets/q1-hover.gif": "assets/q1-hover-791841.gif"});
      expect(preloadSpy.getCall(0).args[0]).toEqual('/assets/q1-hover-791841.gif');
      expect(result.preloaded).toEqual(['/assets/q1-hover.gif']);
    });
  });
});
