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

//  const handleLogout = async event => {
//    await Auth.signOut();
//    setAuthenticated(false);
//    props.history.push('/login');
//  };


export {login, logout, getCurrentUser}
