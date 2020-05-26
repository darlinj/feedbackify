import {login} from './authentication';
import {Auth} from 'aws-amplify';

jest.mock('aws-amplify');

describe('The login component', () => {
  beforeEach(() => {
    Auth.signIn.mockResolvedValue({user: 'data'});
  });

  afterEach(() => {
    Auth.signIn.mockClear();
  });

  it('parses the credentials to the signIn function', () => {
  
    login('email.address@something.com', 'Pa55w0rd')
    expect(Auth.signIn.mock.calls.length).toEqual(1)
    expect(Auth.signIn.mock.calls[0][0]).toEqual("email.address@something.com")
    expect(Auth.signIn.mock.calls[0][1]).toEqual("Pa55w0rd")
  });

  it('returns the user if login is successful', async () => {
    expect(await login('email.address@something.com', 'Pa55w0rd')).toEqual({
      user: 'data',
    });
  });
});
