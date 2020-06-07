import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import PageBody from './PageBody';
import LoginForm from './LoginForm';
import WelcomePage from './WelcomePage';

configure({adapter: new Adapter()});

describe('Renders the main body', () => {
  it('with the login form if the user is not logged in', () => {
    const wrapper = shallow(<PageBody setCurrentUser={() => "foo"} currentUser={undefined} />);
    expect(wrapper.find(LoginForm)).toHaveLength(1);
    expect(typeof(wrapper.find(LoginForm).props().setCurrentUser)).toEqual("function");
    expect(typeof(wrapper.find(LoginForm).props().currentUser)).toEqual("undefined");
  });

  it('with the welcome page if the user is logged in', () => {
    const wrapper = shallow(<PageBody setCurrentUser={() => "foo"} currentUser={{some: "user"}} />);
    expect(wrapper.find(WelcomePage)).toHaveLength(1);
    expect(wrapper.find(WelcomePage).props().currentUser).toEqual({some: "user"});
  });
 

});
