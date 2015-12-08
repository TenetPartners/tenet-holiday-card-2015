import React from 'react'
import ReactDOM from 'react-dom'
import AnonymousSurveyApp from './components/AnonymousSurveyApp'
import '../lib/picturefill';
import '../lib/polyfills';

ReactDOM.render(<AnonymousSurveyApp/>, document.querySelector('#main'));