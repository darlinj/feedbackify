import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import App from './App';
import LoginForm from './LoginForm';
import Navigator from './Navigator';

configure({adapter: new Adapter()});

describe('Rendering the app component', () => {
  it('renders the login form', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(LoginForm)).toHaveLength(1);
    expect(typeof(wrapper.find(LoginForm).props().setCurrentUser)).toEqual("function");
  });

  it('renders the Navbar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Navigator)).toHaveLength(1);
    expect(wrapper.find(Navigator).props().title).toEqual("Feedbackify");
  });
 

});
