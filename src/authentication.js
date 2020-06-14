import { Auth } from 'aws-amplify';

const login = async (email, password) =>  {
  let user = {};
  await Auth.signIn(email,password).then(
    (_user) => { user = _user },
    (error) => { user = {isLoggedIn: false}}
  )
  return user
}

const getCurrentUser = () => {
  return Auth.currentSession();
}

const logout = () => {
  return Auth.signOut();
}

const signup = async(email, name, password) => {
  const username = email;
  let result = [false];
  await Auth.signUp({username, password, attributes: { email, name }}).then(() => {
    result[0] = true;
  })
  .catch((error) => {
    result[0] = false;
    result[1] = error.message;
  })
  return result;
}

export {login, logout, getCurrentUser, signup}
