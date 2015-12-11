import React from 'react'
import update from 'react-addons-update'
// import expect, { createSpy, spyOn, isSpy } from 'expect'
import expect from 'expect'
// import TestUtils, {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import TestUtils, {renderIntoDocument} from 'react-addons-test-utils'
import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import AnonymousSurveyApp from '../AnonymousSurveyApp'
// import Intro from '../Intro'
// import Question from '../Question'
import questions from '../../questions'
import localStorage from 'localStorage'

sinon.stub(questions, 'getSurveyQuestions', function() {
  return {
    q1: {
      question: 'What day is it?',
      image: {
        defaultUrl: '/assets/q1.svg',
        hoverUrl: '/assets/q1-hover.gif',
        title: 'this is alt text'
      },
      options: [
        {id: 'opt1', title: 'opt1', image: {
          defaultUrl: '/assets/q1-opt1.svg',
          title: 'this is opt1 alt text'
        }},
        {id: 'opt2', title: 'opt2', image: {
          defaultUrl: '/assets/q1-opt2.svg',
          title: 'this is opt2 alt text'
        }, responseCount: 8},
        {id: 'opt3', title: 'opt3', image: {
          defaultUrl: '/assets/q1-opt3.svg',
          title: 'this is opt3 alt text'
        }, responseCount: 4}
      ]
    },
    q2: {
      question: 'What time is it?',
      image: {
        defaultUrl: '/assets/q2.svg',
        hoverUrl: '/assets/q2-hover.gif',
        title: 'this is alt text 2'
      },
      options: [
        {id: 'opt1', title: 'opt1', image: {
          defaultUrl: '/assets/q2-opt1.svg',
          title: 'this is q2 opt1 alt text'
        }},
        {id: 'opt2', title: 'opt2', image: {
          defaultUrl: '/assets/q2-opt2.svg',
          title: 'this is q2 opt2 alt text'
        }}
      ]
    }
  }
});

sinon.stub(AnonymousSurveyApp.prototype, 'bindWithFirebase', function() {
  // this.state.questions = questions.getSurveyQuestions();
  this.setState({ questions: questions.getSurveyQuestions() });
});

sinon.stub(AnonymousSurveyApp.prototype, 'loginAnonymously', function() {});

sinon.stub(AnonymousSurveyApp.prototype, 'updateResponseCount', function(question, optIndex) {
  this.setState({
    questions: update(this.state.questions, {
      [question]: {
        options: {
          [optIndex]: {
            responseCount: { $apply: function(x) { return x + 1 || 1; } }
          }
        }
      }
    })
  });
});


describe('AnonymousSurveyApp', () => {

  describe('structure', () => {
    beforeEach(function() {
      // let renderer = createRenderer();
      // renderer.render(<AnonymousSurveyApp />);
      // this.result = renderer.getRenderOutput();
      localStorage.setItem('answers', '');
      // this.spy = expect.spyOn(AnonymousSurveyApp.prototype, 'preloadQuestionHoverImages');
      this.spy = sinon.spy(AnonymousSurveyApp.prototype, 'preloadQuestionHoverImages');
      this.result = renderIntoDocument(<AnonymousSurveyApp />);
    });
    afterEach(function() {
      AnonymousSurveyApp.prototype.preloadQuestionHoverImages.restore();
    });

    it('works', function() {
      // let expectedResult = (
      //   <div className="survey">
      //     <Intro surveyClosed={false} text="Please answer the questions below and check back later for the full results." surveyClosedText="Thank you for taking our holiday survey. Here's how everyone responded."/>
      //     <ul className="questions">
      //       <Question index="q1" question={{imageUrl: 'http://i.istockimg.com/sample-question1.jpg', options: [{id: 'opt1', imageUrl: '', title: 'opt1'}, {id: 'opt2', imageUrl: '', title: 'opt2'}, {id: 'opt3', imageUrl: '', title: 'opt3'}], question: 'What day is it?'}} selectOption={() => {}} />
      //       <Question index="q2" question={{imageUrl: 'http://i.istockimg.com/sample-question2.jpg', options: [{id: 'opt1', imageUrl: '', title: 'opt1'}, {id: 'opt2', imageUrl: '', title: 'opt2'}], question: 'What time is it?'}} selectOption={() => {}} />
      //     </ul>
      //   </div>
      // );
      // expect(this.result).toEqualJSX(expectedResult);

      let rootElement = React.findDOMNode(this.result);
      expect(rootElement.tagName).toEqual('DIV');
      expect(rootElement.classList.length).toEqual(1);
      expect(rootElement.classList[0]).toEqual('survey');

      let component = TestUtils.findRenderedDOMComponentWithClass(this.result, "questions");
      expect(component.tagName).toEqual("UL");
    });

    it('should preload question hover images', function() {
      // the spy gets called twice, one with a blank array and one with the correct arguments (because of the setState in the bindWithFirebase stub above, so it needs to render again)
      expect(this.spy.getCall(1).args[0]).toEqual(['/assets/q1-hover.gif', '/assets/q2-hover.gif']);
    });
  });

  describe('state', () => {
    beforeEach(function() {
      localStorage.setItem('answers', '');
      this.result = renderIntoDocument(<AnonymousSurveyApp />);
    });
    // afterEach(function() {
    //   React.unmountComponentAtNode(document.body);
    //   this.result = null;
    // });

    it('stores the state of the app', function() {
      expect(this.result.state).toExist();
    });

    it('stores the state of surveyClosed', function() {
      expect(this.result.state.surveyClosed).toBeA('boolean');
    });

    it('should output closed class when survey is closed', function() {
      this.result.setState({surveyClosed: true});
      var component = TestUtils.findRenderedDOMComponentWithClass(this.result, "survey");
      expect(component.className).toEqual("survey closed");
    });

    it('stores questions', function() {
      expect(this.result.state.questions).toBeA('object');
    });

    it('should load questions when component loads', function() {
      expect(Object.keys(this.result.state.questions).length).toBeGreaterThan(0);
    });

    it('stores answers', function() {
      expect(this.result.state.answers).toBeA('object');
    })

    it('answers should be empty on first load', function() {
      expect(this.result.state.answers).toEqual({});
    });

    it('should load answers from localStorage', function() {
      let answers = { q1: 'opt1' };
      localStorage.setItem('answers', JSON.stringify(answers));
      let result = renderIntoDocument(<AnonymousSurveyApp />);
      expect(result.state.answers).toEqual({ q1: 'opt1' });
    });

    it('should have a selectOption function', function() {
      expect(this.result.selectOption).toExist();
    });

    it('selecting an option should change the state of answers and store in localStorage', function() {
      this.result.selectOption('q1', 'opt1');
      this.result.selectOption('q2', 'opt2');
      expect(this.result.state.answers.q1).toBe('opt1');
      expect(this.result.state.answers.q2).toBe('opt2');
      this.result.selectOption('q1', 'opt2');
      expect(this.result.state.answers.q1).toBe('opt2');
      expect(this.result.state.answers.q2).toBe('opt2');

      expect(localStorage.getItem('answers')).toEqual(JSON.stringify({ q1: 'opt2', q2: 'opt2' }));
    });

    it('selecting an option should increment the option responseCount', function() {
      this.result.selectOption('q1', 'opt1');
      this.result.selectOption('q2', 'opt2');
      expect(this.result.state.questions.q1.options[0].responseCount).toEqual(1);
      expect(this.result.state.questions.q2.options[1].responseCount).toEqual(1);
      this.result.selectOption('q1', 'opt1');
      expect(this.result.state.questions.q1.options[0].responseCount).toEqual(2);
    });
  });
});
