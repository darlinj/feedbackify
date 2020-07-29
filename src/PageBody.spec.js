import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import PageBody from './PageBody';
import LoginForm from './LoginForm';
import FeedbackRequestsPage from './FeedbackRequestsPage';
import LoadingPage from './LoadingPage';

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
    expect(wrapper.find(FeedbackRequestsPage)).toHaveLength(1);
  });

  it('and shows a loading page when the isLoading is true', () => {
    const wrapper = shallow(<PageBody isLoading={true} />);
    expect(wrapper.find(LoadingPage).length).toEqual(1);
  })
 

});
