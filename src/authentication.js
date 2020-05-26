import { Auth } from 'aws-amplify';

const login = async (email, password) =>  {
  try {
    return await Auth.signIn(email,password);
  }
  catch(e)
  {
    console.log("BUGGER", e)
  }
}

export {login}
