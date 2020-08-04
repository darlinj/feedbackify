import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Navigator from './Navigator';
import {Nav, Navbar} from 'react-bootstrap';
import {logout} from './authentication';

jest.mock('./authentication');

describe('Navbar', () => {
  beforeEach(() => {
    logout.mockResolvedValue(true);
  });

  afterEach(() => {
    logout.mockClear();
  });

  it('shows the title', () => {
    const wrapper = mount(<Navigator title="Some title" currentUser={{}} />);
    expect(wrapper.find(Navbar)).toHaveLength(1);
    expect(wrapper.find(Navbar).text()).toContain('Some title');
  });

  it('shows the logout link if logged in', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/rubbish']}>
        <Navigator title="Some title" currentUser={{some: 'object'}} />,
      </MemoryRouter>,
    );
    expect(wrapper.find('a.login-action').text()).toEqual('log out');
  });

  it('shows the logout link if logged out', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/rubbish']}>
        <Navigator title="Some title" currentUser={undefined} />,
      </MemoryRouter>,
    );
    expect(wrapper.find('a.login-action').text()).toEqual('login');
  });

  it('shows the signup link if logged out', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/rubbish']}>
        <Navigator title="Some title" currentUser={undefined} />,
      </MemoryRouter>,
    );
    expect(wrapper.find('a.signup-action').text()).toEqual('signup');
  });

  it('handles logout', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/rubbish']}>
        <Navigator title="Some title" currentUser={{some: 'user'}} />,
      </MemoryRouter>,
    );
    wrapper.find('a.login-action').simulate('click');
    expect(logout.mock.calls.length).toEqual(1);
  });
});
