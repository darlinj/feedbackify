import React from 'react';
import {shallow} from 'enzyme';
import Signup from './Signup';
import {signup} from './authentication';
import {act} from 'react-dom/test-utils';

jest.mock('./authentication');

describe('The signup component', () => {
  beforeEach(() => {
    signup.mockResolvedValue([true]);
  });

  afterEach(() => {
    signup.mockClear();
  });

  it('Presents the signup form', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find('FormControl[name="email"]').length).toBe(1);
    expect(wrapper.find('FormControl[name="name"]').length).toBe(1);
    expect(wrapper.find('FormControl[name="password"]').length).toBe(1);
    expect(wrapper.find('FormControl[name="confirmPassword"]').length).toBe(1);
    expect(wrapper.find('Button[name="signup-button"]').length).toBe(1);
  });

  it('signs the user up when the button is pressed', async () => {
    const wrapper = shallow(<Signup />);
    await act(async () => {
      wrapper.find('FormControl[name="email"]').simulate('change', {
        target: {name: 'email', value: 'fred.flintstone@bedrock.com'},
      });
      wrapper.find('FormControl[name="name"]').simulate('change', {
        target: {name: 'name', value: 'Fred Flintstone'},
      });
      wrapper.find('FormControl[name="password"]').simulate('change', {
        target: {name: 'password', value: 'password'},
      });
      wrapper.find('FormControl[name="confirmPassword"]').simulate('change', {
        target: {name: 'confirmPassword', value: 'password'},
      });
      wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    });
    expect(signup.mock.calls.length).toEqual(1);
    expect(signup.mock.calls[0][0]).toEqual('fred.flintstone@bedrock.com');
    expect(signup.mock.calls[0][1]).toEqual('Fred Flintstone');
    expect(signup.mock.calls[0][2]).toEqual('password');
    expect(wrapper.find('div.signup-message').text()).toContain(
      'Please check your email and confirm your account',
    );
  });

  it('fails to sign up the user if there is a failure', async () => {
    signup.mockRejectedValue([false, "some error message"]);
    const wrapper = shallow(<Signup />);
    await act(async () => {
      wrapper.find('FormControl[name="email"]').simulate('change', {
        target: {name: 'email', value: 'fred.flintstone@bedrock.com'},
      });
      wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    });
    expect(wrapper.find('div.signup-message').text()).toContain(
      'Registration failed',
    );
    expect(wrapper.find('div.signup-message').text()).toContain(
      'some error message',
    );
  });

  it("doesn't sent the call to signup if the passwords don't match", async() => {
    const wrapper = shallow(<Signup />);
    await act(async () => {
      wrapper.find('FormControl[name="email"]').simulate('change', {
        target: {name: 'email', value: 'fred.flintstone@bedrock.com'},
      });
      wrapper.find('FormControl[name="password"]').simulate('change', {
        target: {name: 'password', value: 'password'},
      });
      wrapper.find('FormControl[name="confirmPassword"]').simulate('change', {
        target: {name: 'confirmPassword', value: 'wordpass'},
      });
      wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    });
    expect(wrapper.find('div.signup-message').text()).toContain(
      "Those passwords don't match,  Please try again",
    );
  })
});
