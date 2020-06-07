import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import App from './App';
import PageBody from './PageBody';
import Navigator from './Navigator';

configure({adapter: new Adapter()});

describe('Rendering the app component', () => {
  it('with the Navbar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Navigator)).toHaveLength(1);
    expect(wrapper.find(Navigator).props().title).toEqual("Feedbackify");
    expect(wrapper.find(Navigator).props().currentUser).toBeUndefined
  });
 
  it('with the page body', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(PageBody)).toHaveLength(1);
    expect(typeof(wrapper.find(PageBody).props().setCurrentUser)).toEqual("function");
    expect(wrapper.find(PageBody).props().currentUser).toBeUndefined()
  });

});
