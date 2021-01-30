## To create a local development API do the following:

run
./createDevAPI.sh
Copy the relevant outputs from the cloudformation stack into the top of setEnv file
run
./api/tests/createCognitoUser.sh
run
npm test

If everything passes then you are good

## setting a users password in cognito:

aws cognito-idp admin-initiate-auth --user-pool-id %USER POOL ID% --client-id %APP CLIENT ID% --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=%USERS USERNAME%,PASSWORD=%USERS CURRENT PASSWORD%

then

aws cognito-idp admin-respond-to-auth-challenge --user-pool-id %USER POOL ID% --client-id %CLIENT ID% --challenge-name NEW_PASSWORD_REQUIRED --challenge-responses NEW_PASSWORD=%DESIRED PASSWORD%,USERNAME=%USERS USERNAME% --session %SESSION KEY FROM PREVIOUS COMMAND with ""%

If you get an error about Invalid attributes given, XXX is missing pass the missing attributes using the format userAttributes.$FIELD_NAME=$VALUE

Running a node script locally:
npx babel-node ./infra/createCognitoUser.js
