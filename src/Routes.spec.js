import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow, configure} from 'enzyme';
import {MemoryRouter} from 'react-router';
import Routes from './Routes';
import LoginForm from './LoginForm';
import WelcomePage from './WelcomePage';
import QuestionsPage from './QuestionsPage';
import FeedbackRequestsPage from './FeedbackRequestsPage';

configure({adapter: new Adapter()});

describe('routing', () => {
  it('shows the page to manage requests when the path is / and the user is logged in', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Routes currentUser={{some: "user"}} />
      </MemoryRouter>,
    );
    expect(wrapper.find(FeedbackRequestsPage)).toHaveLength(1);
  });

  it('shows the welcome page if the use is not logged in', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(wrapper.find(WelcomePage)).toHaveLength(1);
  })

  it('shows the login form when not logged in and trying to access a protected page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/request/123']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  it('shows the page to edit the request when the path is /request/123', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/request/123']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(wrapper.find(QuestionsPage)).toHaveLength(1);
  });
});
