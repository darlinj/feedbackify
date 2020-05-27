import { Auth } from 'aws-amplify';

const login = async (email, password) =>  {
  let user = {};
  await Auth.signIn(email,password).then(
    (_user) => { user = _user },
    (error) => { user = {isLoggedIn: false}}
  )
  return user
}

export {login}
