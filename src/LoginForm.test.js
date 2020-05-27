import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginForm from './LoginForm';
import {login} from './authentication';

jest.mock('./authentication');

configure({adapter: new Adapter()});

describe('The login component', () => {
  beforeEach(() => {
    login.mockImplementation(() => { return {username: "fred", loggedIn: true }});
  });

  afterEach(() => {
    login.mockClear();
  });

  it('Presents the login form', () => {
    const component = shallow(<LoginForm />);
    expect(component.find('FormControl[name="email"]').length).toBe(1);
    expect(component.find('FormControl[name="password"]').length).toBe(1);
    expect(component.find('Button[name="login-button"]').length).toBe(1);
  });

  it.skip('presets the credectials to the correct values', () => {
    const component = shallow(
      <LoginForm
        credentials={{email: 'wilmer@bedrock.com', password: 's3cr3t'}}
      />,
    );
    expect(
      component.find('FormControl[value="wilmer@bedrock.com"]').length,
    ).toEqual(1);
    expect(component.find('FormControl[value="s3cr3t"]').length).toEqual(1);
  });

  it.skip('sets the credentials', () => {
    let credentials = {};
    const setCredentials = e => {
      credentials[e.target.name] = e.target.value;
    };
    const component = shallow(<LoginForm setCredentials={setCredentials} />);
    component.find('FormControl[name="email"]').simulate('change', {
      target: {name: 'email', value: 'fred.flintstone@bedrock.com'},
    });
    component
      .find('FormControl[name="password"]')
      .simulate('change', {target: {name: 'password', value: 'B3dr0ck'}});
    expect(credentials.email).toEqual('fred.flintstone@bedrock.com');
    expect(credentials.password).toEqual('B3dr0ck');
  });

  it('logs the user in when the button is pressed', () => {
    const component = shallow(<LoginForm />);
    component.find('FormControl[name="email"]').simulate('change', {
      target: {name: 'email', value: 'fred.flintstone@bedrock.com'},
    });
    component
      .find('FormControl[name="password"]')
      .simulate('change', {target: {name: 'password', value: 'B3dr0ck'}});
    component.find('form').simulate('submit');
    expect(login.mock.calls.length).toEqual(1);
    expect(login.mock.calls[0][0]).toEqual("fred.flintstone@bedrock.com");
    expect(login.mock.calls[0][1]).toEqual("B3dr0ck");
  });

  it('sets isAuthenticated to true if login is successful', () => {
    let currentUser = null
    const setCurrentUser = s => {
      currentUser =  s
    };
    const component = shallow(<LoginForm setCurrentUser={setCurrentUser} />);
    component.find('form').simulate('submit');
    expect(currentUser.loggedIn).toEqual(true);
  })

  it.skip('calls the login function when the button is pressed', () => {
    let called_login = false;
    const login = e => {
      called_login = true;
    };
    const component = shallow(<LoginForm login={login} />);
    component.find('form').simulate('submit');
    expect(called_login).toEqual(true);
  });
});
