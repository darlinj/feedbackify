import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import Navigator from './Navigator';
import {Nav, Navbar} from 'react-bootstrap';
import {logout} from './authentication';

jest.mock('./authentication');

configure({adapter: new Adapter()});

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
      <Navigator title="Some title" currentUser={{some: 'object'}} />,
    );
    expect(wrapper.find('a.login-action').text()).toEqual('log out');
  });

  it('shows the logout link if logged out', () => {
    const wrapper = mount(
      <Navigator title="Some title" currentUser={undefined} />,
    );
    expect(wrapper.find('a.login-action').text()).toEqual('login');
  });

  it('handles logout', () => {
    const wrapper = mount(
      <Navigator title="Some title" currentUser={{some: 'user'}} />,
    );
    wrapper.find('a.login-action').simulate('click');
    expect(logout.mock.calls.length).toEqual(1);
  });
});
